import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

/**
 * Interfață pentru datele de autentificare
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Interfață pentru datele de înregistrare
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

/**
 * Interfață pentru datele de resetare parolă
 */
export interface ForgotPasswordData {
  email: string;
}

/**
 * Interfață pentru datele de resetare parolă
 */
export interface ResetPasswordData {
  token: string;
  password: string;
  passwordConfirmation: string;
}

/**
 * Interfață pentru datele utilizatorului
 */
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  role: string;
}

/**
 * Interfață pentru răspunsul de autentificare
 */
export interface AuthResponse {
  access_token: string;
  user: User;
}

/**
 * Serviciu pentru autentificare
 */
const authService = {
  /**
   * Autentificare utilizator
   * @param credentials Credențialele de autentificare
   * @returns Răspunsul de autentificare
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Înregistrare utilizator
   * @param data Datele de înregistrare
   * @returns Răspunsul de autentificare
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Deconectare utilizator
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Verificare dacă utilizatorul este autentificat
   * @returns True dacă utilizatorul este autentificat, false în caz contrar
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  },

  /**
   * Obținere utilizator curent
   * @returns Utilizatorul curent sau null dacă nu este autentificat
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  },

  /**
   * Obținere token de autentificare
   * @returns Token-ul de autentificare sau null dacă nu este autentificat
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  /**
   * Solicitare resetare parolă
   * @param data Datele pentru resetarea parolei
   * @returns Mesajul de confirmare
   */
  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const response = await axios.post<{ message: string }>(`${API_URL}/auth/forgot-password`, data);
    return response.data;
  },

  /**
   * Validare token de resetare parolă
   * @param token Token-ul de resetare parolă
   * @returns True dacă token-ul este valid, false în caz contrar
   */
  async validateResetToken(token: string): Promise<boolean> {
    const response = await axios.get<{ valid: boolean }>(
      `${API_URL}/auth/validate-reset-token?token=${token}`,
    );
    return response.data.valid;
  },

  /**
   * Resetare parolă
   * @param data Datele pentru resetarea parolei
   * @returns Mesajul de confirmare
   */
  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await axios.post<{ message: string }>(`${API_URL}/auth/reset-password`, data);
    return response.data;
  },

  /**
   * Obținere profil utilizator
   * @returns Profilul utilizatorului
   */
  async getProfile(): Promise<User> {
    const token = this.getToken();
    const response = await axios.get<User>(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default authService;
