import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { PasswordResetToken } from '../src/modules/auth/entities/password-reset-token.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let passwordResetTokenRepository: Repository<PasswordResetToken>;
  let jwtToken: string;
  let userId: string;
  let resetToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userRepository = moduleFixture.get(getRepositoryToken(User));
    passwordResetTokenRepository = moduleFixture.get(getRepositoryToken(PasswordResetToken));

    // Clean up database before tests
    await passwordResetTokenRepository.delete({});
    await userRepository.delete({});
  });

  afterAll(async () => {
    // Clean up database after tests
    await passwordResetTokenRepository.delete({});
    await userRepository.delete({});
    await app.close();
  });

  describe('Authentication', () => {
    it('/auth/register (POST) - should register a new user', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        fullName: 'Test User',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.username).toBe(registerDto.username);
      expect(response.body.user.email).toBe(registerDto.email);
      expect(response.body.user.fullName).toBe(registerDto.fullName);
      expect(response.body.user).not.toHaveProperty('password');

      // Save user ID and JWT token for later tests
      userId = response.body.user.id;
      jwtToken = response.body.access_token;
    });

    it('/auth/register (POST) - should return 409 if username already exists', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'another@example.com',
        password: 'Password123!',
        fullName: 'Another User',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(409);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Există deja un utilizator cu numele testuser');
    });

    it('/auth/register (POST) - should return 409 if email already exists', async () => {
      const registerDto = {
        username: 'anotheruser',
        email: 'test@example.com',
        password: 'Password123!',
        fullName: 'Another User',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(409);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Există deja un utilizator cu adresa de email test@example.com');
    });

    it('/auth/login (POST) - should login with valid credentials', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'Password123!',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe(loginDto.username);
    });

    it('/auth/login (POST) - should return 401 with invalid credentials', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'WrongPassword123!',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Credențiale invalide');
    });

    it('/auth/profile (GET) - should return user profile with valid token', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(userId);
      expect(response.body.username).toBe('testuser');
      expect(response.body.email).toBe('test@example.com');
      expect(response.body).not.toHaveProperty('password');
    });

    it('/auth/profile (GET) - should return 401 without token', async () => {
      await request(app.getHttpServer())
        .get('/auth/profile')
        .expect(401);
    });
  });

  describe('Password Reset', () => {
    it('/auth/forgot-password (POST) - should create reset token for valid email', async () => {
      const forgotPasswordDto = {
        email: 'test@example.com',
      };

      await request(app.getHttpServer())
        .post('/auth/forgot-password')
        .send(forgotPasswordDto)
        .expect(200);

      // Check if token was created in database
      const tokens = await passwordResetTokenRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' },
      });

      expect(tokens.length).toBeGreaterThan(0);
      resetToken = tokens[0].token;
    });

    it('/auth/forgot-password (POST) - should return 200 even for non-existent email', async () => {
      const forgotPasswordDto = {
        email: 'nonexistent@example.com',
      };

      await request(app.getHttpServer())
        .post('/auth/forgot-password')
        .send(forgotPasswordDto)
        .expect(200);
    });

    it('/auth/validate-reset-token (GET) - should validate valid token', async () => {
      const response = await request(app.getHttpServer())
        .get(`/auth/validate-reset-token?token=${resetToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('valid');
      expect(response.body.valid).toBe(true);
    });

    it('/auth/validate-reset-token (GET) - should invalidate non-existent token', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/validate-reset-token?token=nonexistent-token')
        .expect(200);

      expect(response.body).toHaveProperty('valid');
      expect(response.body.valid).toBe(false);
    });

    it('/auth/reset-password (POST) - should reset password with valid token', async () => {
      const resetPasswordDto = {
        token: resetToken,
        password: 'NewPassword123!',
        passwordConfirmation: 'NewPassword123!',
      };

      await request(app.getHttpServer())
        .post('/auth/reset-password')
        .send(resetPasswordDto)
        .expect(200);

      // Check if token was marked as used
      const token = await passwordResetTokenRepository.findOne({
        where: { token: resetToken },
      });

      expect(token.used).toBe(true);

      // Check if password was updated
      const user = await userRepository.findOne({
        where: { id: userId },
      });

      // Verify new password works
      const loginDto = {
        username: 'testuser',
        password: 'NewPassword123!',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200);
    });

    it('/auth/reset-password (POST) - should return 400 if passwords do not match', async () => {
      // Create a new token
      const user = await userRepository.findOne({
        where: { id: userId },
      });

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      const newToken = await passwordResetTokenRepository.save({
        userId,
        token: 'new-reset-token',
        expiresAt,
        used: false,
      });

      const resetPasswordDto = {
        token: newToken.token,
        password: 'AnotherPassword123!',
        passwordConfirmation: 'DifferentPassword123!',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/reset-password')
        .send(resetPasswordDto)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Parola și confirmarea parolei nu coincid');
    });

    it('/auth/reset-password (POST) - should return 400 for invalid token', async () => {
      const resetPasswordDto = {
        token: 'invalid-token',
        password: 'NewPassword123!',
        passwordConfirmation: 'NewPassword123!',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/reset-password')
        .send(resetPasswordDto)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Token-ul de resetare a parolei este invalid sau a expirat');
    });
  });
});
