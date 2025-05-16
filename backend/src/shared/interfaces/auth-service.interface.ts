import { User } from '../../modules/users/entities/user.entity';
import { LoginDto } from '../../modules/auth/dto/login.dto';
import { RegisterDto } from '../../modules/auth/dto/register.dto';
import { JwtPayload } from '../../modules/auth/interfaces/jwt-payload.interface';

/**
 * Interfață pentru serviciul de autentificare
 * Definește metodele comune pentru autentificare și autorizare
 */
export interface IAuthService {
  /**
   * Autentifică un utilizator
   * @param loginDto DTO cu credențialele de autentificare
   * @returns Token-uri de acces și refresh, și informații despre utilizator
   */
  login(loginDto: LoginDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: Partial<User>;
  }>;

  /**
   * Înregistrează un utilizator nou
   * @param registerDto DTO cu informațiile de înregistrare
   * @returns Utilizatorul creat
   */
  register(registerDto: RegisterDto): Promise<User>;

  /**
   * Validează un token JWT
   * @param token Token-ul JWT de validat
   * @returns Payload-ul token-ului dacă este valid
   */
  validateToken(token: string): Promise<JwtPayload>;

  /**
   * Reînnoiește un token de acces folosind un token de refresh
   * @param refreshToken Token-ul de refresh
   * @returns Noul token de acces și informații despre utilizator
   */
  refreshToken(refreshToken: string): Promise<{
    access_token: string;
    user: Partial<User>;
  }>;

  /**
   * Invalidează toate token-urile de refresh ale unui utilizator
   * @param userId ID-ul utilizatorului
   */
  invalidateRefreshTokens(userId: string): Promise<void>;
}
