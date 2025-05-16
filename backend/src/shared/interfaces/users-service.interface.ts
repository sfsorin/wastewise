import { User } from '../../modules/users/entities/user.entity';

/**
 * Interfață pentru serviciul de utilizatori
 * Definește metodele comune pentru gestionarea utilizatorilor
 */
export interface IUsersService {
  /**
   * Găsește un utilizator după ID
   * @param id ID-ul utilizatorului
   * @returns Utilizatorul găsit sau aruncă NotFoundException
   */
  findOne(id: string): Promise<User>;

  /**
   * Găsește un utilizator după email
   * @param email Email-ul utilizatorului
   * @returns Utilizatorul găsit sau null dacă nu există
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Găsește un utilizator după username
   * @param username Username-ul utilizatorului
   * @returns Utilizatorul găsit sau null dacă nu există
   */
  findByUsername(username: string): Promise<User | null>;

  /**
   * Găsește un utilizator după username sau email
   * @param usernameOrEmail Username-ul sau email-ul utilizatorului
   * @returns Utilizatorul găsit sau null dacă nu există
   */
  findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null>;

  /**
   * Găsește un utilizator după ID și încarcă relațiile pentru roluri și permisiuni
   * @param id ID-ul utilizatorului
   * @returns Utilizatorul cu rolurile și permisiunile încărcate
   */
  findOneWithRoles(id: string): Promise<User>;

  /**
   * Actualizează data ultimei autentificări a unui utilizator
   * @param id ID-ul utilizatorului
   */
  updateLastLogin(id: string): Promise<void>;
}
