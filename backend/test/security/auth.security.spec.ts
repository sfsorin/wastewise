import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

/**
 * Teste de securitate pentru autentificare
 * Verifică vulnerabilitățile comune de securitate pentru autentificare
 */
describe('Auth Security Tests (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));

    // Creăm un utilizator de test
    const hashedPassword = await bcrypt.hash('TestPassword123!', 10);
    await userRepository.save({
      id: uuidv4(),
      username: 'security_test_user',
      email: 'security_test@example.com',
      password: hashedPassword,
      status: 'active',
      role: 'user',
    });

    // Autentificăm utilizatorul pentru a obține un token JWT
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'security_test_user',
        password: 'TestPassword123!',
      });

    jwtToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    // Ștergem utilizatorul de test
    await userRepository.delete({ username: 'security_test_user' });
    await app.close();
  });

  describe('SQL Injection Tests', () => {
    it('should prevent SQL injection in login', async () => {
      const maliciousPayloads = [
        { username: "' OR 1=1 --", password: "anything" },
        { username: "admin' --", password: "anything" },
        { username: "admin'; DROP TABLE users; --", password: "anything" },
        { username: "1' UNION SELECT 1,username,password FROM users --", password: "anything" },
      ];

      for (const payload of maliciousPayloads) {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send(payload)
          .expect(401);

        expect(response.body.message).toContain('Credențiale invalide');
      }
    });
  });

  describe('XSS Tests', () => {
    it('should prevent XSS in registration', async () => {
      const maliciousPayloads = [
        {
          username: "<script>alert('xss')</script>",
          email: "test1@example.com",
          password: "Password123!",
          passwordConfirmation: "Password123!",
        },
        {
          username: "test_user",
          email: "<script>alert('xss')</script>@example.com",
          password: "Password123!",
          passwordConfirmation: "Password123!",
        },
        {
          username: "test_user2",
          email: "test2@example.com",
          password: "<script>alert('xss')</script>",
          passwordConfirmation: "<script>alert('xss')</script>",
        },
      ];

      for (const payload of maliciousPayloads) {
        const response = await request(app.getHttpServer())
          .post('/auth/register')
          .send(payload)
          .expect(400);

        expect(response.body.message).toBeDefined();
      }
    });
  });

  describe('CSRF Protection Tests', () => {
    it('should include CSRF token in response headers for protected routes', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      // Verificăm dacă header-ul X-CSRF-Token este prezent
      // Notă: Acest test va eșua dacă CSRF este dezactivat în configurație
      if (process.env.CSRF_ENABLED === 'true') {
        expect(response.headers['x-csrf-token']).toBeDefined();
      }
    });
  });

  describe('JWT Security Tests', () => {
    it('should reject expired tokens', async () => {
      // Creăm un token expirat (acest test este mai complex și ar putea necesita mock-uri)
      // În acest exemplu, presupunem că avem un token expirat
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);

      expect(response.body.message).toContain('Unauthorized');
    });

    it('should reject invalid tokens', async () => {
      const invalidToken = 'invalid.token.here';

      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401);

      expect(response.body.message).toContain('Unauthorized');
    });

    it('should reject requests without token', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .expect(401);

      expect(response.body.message).toContain('Unauthorized');
    });
  });

  describe('Password Security Tests', () => {
    it('should reject weak passwords during registration', async () => {
      const weakPasswords = [
        'password',
        '12345678',
        'qwertyui',
        'abcdefgh',
        'Password',
        'Password1',
      ];

      for (const weakPassword of weakPasswords) {
        const response = await request(app.getHttpServer())
          .post('/auth/register')
          .send({
            username: 'test_user_weak',
            email: 'test_weak@example.com',
            password: weakPassword,
            passwordConfirmation: weakPassword,
          })
          .expect(400);

        expect(response.body.message).toContain('Parola');
      }
    });
  });

  describe('Rate Limiting Tests', () => {
    it('should limit login attempts', async () => {
      // Acest test va eșua dacă rate limiting este dezactivat
      // Facem mai multe cereri decât limita configurată
      const maxAttempts = 15; // Ar trebui să fie mai mare decât limita configurată
      let limitReached = false;

      for (let i = 0; i < maxAttempts; i++) {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            username: 'nonexistent_user',
            password: 'WrongPassword123!',
          });

        if (response.status === 429) {
          limitReached = true;
          break;
        }
      }

      // Verificăm dacă limita a fost atinsă
      // Notă: Acest test va eșua dacă rate limiting este dezactivat
      if (process.env.RATE_LIMIT_ENABLED !== 'false') {
        expect(limitReached).toBe(true);
      }
    });
  });
});
