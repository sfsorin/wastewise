import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { PasswordResetToken } from '../entities/password-reset-token.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private passwordResetTokenRepository: Repository<PasswordResetToken>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    // Verificare dacă există deja un utilizator cu același username sau email
    const existingByUsername = await this.usersRepository.findOne({
      where: { username: registerDto.username },
    });
    if (existingByUsername) {
      throw new ConflictException(`Există deja un utilizator cu numele ${registerDto.username}`);
    }

    const existingByEmail = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingByEmail) {
      throw new ConflictException(
        `Există deja un utilizator cu adresa de email ${registerDto.email}`,
      );
    }

    const user = this.usersRepository.create(registerDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'id',
        'username',
        'email',
        'fullName',
        'role',
        'status',
        'lastLogin',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'email',
        'fullName',
        'role',
        'status',
        'lastLogin',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) {
      throw new NotFoundException(`Utilizatorul cu ID-ul ${id} nu a fost găsit`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`Utilizatorul cu numele ${username} nu a fost găsit`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`Utilizatorul cu adresa de email ${email} nu a fost găsit`);
    }

    return user;
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      throw new NotFoundException(
        `Utilizatorul cu numele sau adresa de email ${usernameOrEmail} nu a fost găsit`,
      );
    }

    return user;
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, {
      lastLogin: new Date(),
    });
  }

  async createPasswordResetToken(email: string): Promise<{ token: string; user: User }> {
    const user = await this.usersRepository.findOne({
      where: { email, status: 'active' },
    });

    if (!user) {
      throw new NotFoundException(
        `Utilizatorul cu adresa de email ${email} nu a fost găsit sau este inactiv`,
      );
    }

    // Generare token aleatoriu
    const token = crypto.randomBytes(32).toString('hex');

    // Setare dată de expirare (1 oră)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Invalidare token-uri anterioare pentru acest utilizator
    await this.passwordResetTokenRepository.update(
      { userId: user.id, used: false },
      { used: true },
    );

    // Creare token nou
    const passwordResetToken = this.passwordResetTokenRepository.create({
      userId: user.id,
      token,
      expiresAt,
      used: false,
    });

    await this.passwordResetTokenRepository.save(passwordResetToken);

    return { token, user };
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const passwordResetToken = await this.passwordResetTokenRepository.findOne({
      where: { token, used: false },
      relations: ['user'],
    });

    if (!passwordResetToken) {
      throw new BadRequestException(
        'Token-ul de resetare a parolei este invalid sau a fost deja utilizat',
      );
    }

    const now = new Date();
    if (passwordResetToken.expiresAt < now) {
      throw new BadRequestException('Token-ul de resetare a parolei a expirat');
    }

    // Hash-uire parolă nouă
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizare parolă utilizator
    await this.usersRepository.update(passwordResetToken.userId, {
      password: hashedPassword,
    });

    // Marcare token ca utilizat
    await this.passwordResetTokenRepository.update(passwordResetToken.id, {
      used: true,
    });
  }

  async validatePasswordResetToken(token: string): Promise<boolean> {
    const passwordResetToken = await this.passwordResetTokenRepository.findOne({
      where: { token, used: false },
    });

    if (!passwordResetToken) {
      return false;
    }

    const now = new Date();
    if (passwordResetToken.expiresAt < now) {
      return false;
    }

    return true;
  }
}
