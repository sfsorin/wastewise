import api from '../api';
import {
  User,
  UserProfile,
  CreateUserDto,
  UpdateUserDto,
  UpdateUserProfileDto,
  ChangePasswordDto,
  UserListResponse,
  UserFilters,
} from '../../types/user.types';

const BASE_URL = '/users';

/**
 * Serviciu pentru gestionarea utilizatorilor
 */
export const userService = {
  /**
   * Obține lista de utilizatori cu filtrare și paginare
   * @param filters Filtre pentru listă
   */
  getUsers: (filters?: UserFilters): Promise<UserListResponse> => {
    return api.get(BASE_URL, filters);
  },

  /**
   * Obține un utilizator după ID
   * @param id ID-ul utilizatorului
   */
  getUserById: (id: number): Promise<User> => {
    return api.get(`${BASE_URL}/${id}`);
  },

  /**
   * Obține profilul utilizatorului curent
   */
  getCurrentUserProfile: (): Promise<UserProfile> => {
    return api.get(`${BASE_URL}/profile`);
  },

  /**
   * Creează un utilizator nou
   * @param userData Date pentru utilizatorul nou
   */
  createUser: (userData: CreateUserDto): Promise<User> => {
    return api.post(BASE_URL, userData);
  },

  /**
   * Actualizează un utilizator existent
   * @param id ID-ul utilizatorului
   * @param userData Date pentru actualizare
   */
  updateUser: (id: number, userData: UpdateUserDto): Promise<User> => {
    return api.put(`${BASE_URL}/${id}`, userData);
  },

  /**
   * Actualizează profilul utilizatorului curent
   * @param profileData Date pentru actualizare profil
   */
  updateProfile: (profileData: UpdateUserProfileDto): Promise<UserProfile> => {
    return api.put(`${BASE_URL}/profile`, profileData);
  },

  /**
   * Schimbă parola utilizatorului curent
   * @param passwordData Date pentru schimbare parolă
   */
  changePassword: (passwordData: ChangePasswordDto): Promise<void> => {
    return api.post(`${BASE_URL}/change-password`, passwordData);
  },

  /**
   * Activează un utilizator
   * @param id ID-ul utilizatorului
   */
  activateUser: (id: number): Promise<User> => {
    return api.patch(`${BASE_URL}/${id}/activate`);
  },

  /**
   * Dezactivează un utilizator
   * @param id ID-ul utilizatorului
   */
  deactivateUser: (id: number): Promise<User> => {
    return api.patch(`${BASE_URL}/${id}/deactivate`);
  },

  /**
   * Șterge un utilizator
   * @param id ID-ul utilizatorului
   */
  deleteUser: (id: number): Promise<void> => {
    return api.del(`${BASE_URL}/${id}`);
  },

  /**
   * Asignează roluri unui utilizator
   * @param userId ID-ul utilizatorului
   * @param roleIds ID-urile rolurilor
   */
  assignRoles: (userId: number, roleIds: number[]): Promise<User> => {
    return api.post(`${BASE_URL}/${userId}/roles`, { roleIds });
  },

  /**
   * Revocă roluri de la un utilizator
   * @param userId ID-ul utilizatorului
   * @param roleIds ID-urile rolurilor
   */
  revokeRoles: (userId: number, roleIds: number[]): Promise<User> => {
    return api.del(`${BASE_URL}/${userId}/roles`, { data: { roleIds } });
  },
};

export default userService;
