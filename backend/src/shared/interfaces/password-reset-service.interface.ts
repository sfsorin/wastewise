import { User } from '../../modules/users/entities/user.entity';

/**
 * Interfață pentru serviciul de resetare a parolei
 * Definește metodele comune pentru gestionarea resetării parolei
 */
export interface IPasswordResetService {
  /**
   * Creează un token de resetare a parolei pentru un utilizator
   * @param email Email-ul utilizatorului
   * @returns Token-ul de resetare și informații despre utilizator
   */
  createPasswordResetToken(email: string): Promise<{ token: string; user: User }>;

  /**
   * Validează un token de resetare a parolei
   * @param token Token-ul de resetare
   * @returns true dacă token-ul este valid, false altfel
   */
  validatePasswordResetToken(token: string): Promise<boolean>;

  /**
   * Resetează parola unui utilizator folosind un token de resetare
   * @param token Token-ul de resetare
   * @param newPassword Noua parolă
   */
  resetPassword(token: string, newPassword: string): Promise<void>;
}
