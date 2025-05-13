import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
  ApiExtraModels,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../../users/entities/user.entity';

@ApiTags('auth')
@ApiExtraModels(User)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autentificare utilizator' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilizatorul a fost autentificat cu succes.',
    schema: {
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            fullName: { type: 'string' },
            role: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credențiale invalide.',
  })
  async login(@Body() loginDto: LoginDto): Promise<{
    access_token: string;
    user: {
      id: string;
      username: string;
      email: string;
      fullName?: string;
      role: string;
    };
  }> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Înregistrare utilizator nou' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Utilizatorul a fost înregistrat cu succes.',
    schema: {
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            fullName: { type: 'string' },
            role: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un utilizator cu același nume sau adresă de email.',
  })
  async register(@Body() registerDto: RegisterDto): Promise<{
    access_token: string;
    user: {
      id: string;
      username: string;
      email: string;
      fullName?: string;
      role: string;
    };
  }> {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obținere profil utilizator autentificat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profilul utilizatorului a fost obținut cu succes.',
    schema: {
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        fullName: { type: 'string' },
        role: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Utilizatorul nu este autentificat.',
  })
  getProfile(@Request() req: { user: { id: string } }): Promise<{
    id: string;
    username: string;
    email: string;
    fullName?: string;
    role: string;
  }> {
    return this.authService.getProfile(req.user.id);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitare resetare parolă' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email-ul de resetare a parolei a fost trimis cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilizatorul nu a fost găsit.',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    await this.authService.forgotPassword(forgotPasswordDto);
    return { message: 'Email-ul de resetare a parolei a fost trimis cu succes.' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resetare parolă' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Parola a fost resetată cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Token-ul de resetare a parolei este invalid sau a expirat.',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    await this.authService.resetPassword(resetPasswordDto);
    return { message: 'Parola a fost resetată cu succes.' };
  }

  @Get('validate-reset-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validare token de resetare parolă' })
  @ApiQuery({ name: 'token', description: 'Token-ul de resetare a parolei' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token-ul de resetare a parolei este valid.',
  })
  async validateResetToken(@Query('token') token: string): Promise<{ valid: boolean }> {
    const isValid = await this.authService.validateResetToken(token);
    return { valid: isValid };
  }
}
