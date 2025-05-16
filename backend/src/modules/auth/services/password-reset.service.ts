import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, UserStatus } from '../../users/entities/user.entity';
import { PasswordResetToken } from '../entities/password-reset-token.entity';
import { IPasswordResetService } from '../../../shared/interfaces/password-reset-service.interface';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordResetService implements IPasswordResetService {
  private readonly logger = new Logger(PasswordResetService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private passwordResetTokenRepository: Repository<PasswordResetToken>,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async createPasswordResetToken(email: string): Promise<{ token: string; user: User }> {
    const user = await this.usersRepository.findOne({
      where: { email, status: UserStatus.ACTIVE },
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

    // Trimitere email cu link de resetare
    const resetLink = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${token}`;
    await this.mailService.sendPasswordResetEmail(user.email, resetLink, user.username);

    return { token, user };
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

  async resetPassword(token: string, newPassword: string): Promise<void> {
    this.logger.debug(`Resetare parolă pentru token: ${token}`);

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
}
