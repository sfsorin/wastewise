import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { MailService } from './mail.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByUsernameOrEmail(username);

      if (user && (await user.validatePassword(password))) {
        const { password, ...result } = user;
        return result;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credențiale invalide');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedException('Contul este inactiv');
    }

    // Actualizare data ultimei autentificări
    await this.usersService.updateLastLogin(user.id);

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async getProfile(userId: string) {
    return this.usersService.findOne(userId);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { token, user } = await this.usersService.createPasswordResetToken(
      forgotPasswordDto.email,
    );

    const resetLink = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${token}`;

    await this.mailService.sendPasswordResetEmail(user.email, resetLink, user.username);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    if (resetPasswordDto.password !== resetPasswordDto.passwordConfirmation) {
      throw new BadRequestException('Parola și confirmarea parolei nu coincid');
    }

    const isValidToken = await this.usersService.validatePasswordResetToken(resetPasswordDto.token);
    if (!isValidToken) {
      throw new BadRequestException('Token-ul de resetare a parolei este invalid sau a expirat');
    }

    await this.usersService.resetPassword(resetPasswordDto.token, resetPasswordDto.password);
  }

  async validateResetToken(token: string): Promise<boolean> {
    return this.usersService.validatePasswordResetToken(token);
  }
}
