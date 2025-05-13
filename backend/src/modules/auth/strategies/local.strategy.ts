import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: any;
    status: any;
    isActive: boolean;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    roles: any[];
  }> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Credențiale invalide');
    }
    return user;
  }
}
