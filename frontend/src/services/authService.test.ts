import axios from 'axios';
import authService from './authService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('authService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('login', () => {
    it('should make a POST request to login endpoint and store token and user in localStorage', async () => {
      const credentials = { username: 'testuser', password: 'password' };
      const mockResponse = {
        data: {
          access_token: 'jwt-token',
          user: {
            id: '123',
            username: 'testuser',
            email: 'test@example.com',
            fullName: 'Test User',
            role: 'user',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.login(credentials);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        credentials
      );
      expect(localStorage.getItem('token')).toBe('jwt-token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.data.user));
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error if login fails', async () => {
      const credentials = { username: 'testuser', password: 'wrongpassword' };
      const errorResponse = {
        response: {
          data: {
            message: 'Credențiale invalide',
          },
          status: 401,
        },
      };

      mockedAxios.post.mockRejectedValueOnce(errorResponse);

      await expect(authService.login(credentials)).rejects.toEqual(errorResponse);
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('register', () => {
    it('should make a POST request to register endpoint and store token and user in localStorage', async () => {
      const registerData = {
        username: 'newuser',
        email: 'new@example.com',
        password: 'Password123!',
        fullName: 'New User',
      };
      const mockResponse = {
        data: {
          access_token: 'jwt-token',
          user: {
            id: '456',
            username: 'newuser',
            email: 'new@example.com',
            fullName: 'New User',
            role: 'user',
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.register(registerData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        registerData
      );
      expect(localStorage.getItem('token')).toBe('jwt-token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.data.user));
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('logout', () => {
    it('should remove token and user from localStorage', () => {
      // Set up localStorage with token and user
      localStorage.setItem('token', 'jwt-token');
      localStorage.setItem('user', JSON.stringify({ id: '123', username: 'testuser' }));

      authService.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token exists in localStorage', () => {
      localStorage.setItem('token', 'jwt-token');

      const result = authService.isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false if token does not exist in localStorage', () => {
      const result = authService.isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('should return user from localStorage if it exists', () => {
      const user = { id: '123', username: 'testuser' };
      localStorage.setItem('user', JSON.stringify(user));

      const result = authService.getCurrentUser();

      expect(result).toEqual(user);
    });

    it('should return null if user does not exist in localStorage', () => {
      const result = authService.getCurrentUser();

      expect(result).toBeNull();
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage if it exists', () => {
      localStorage.setItem('token', 'jwt-token');

      const result = authService.getToken();

      expect(result).toBe('jwt-token');
    });

    it('should return null if token does not exist in localStorage', () => {
      const result = authService.getToken();

      expect(result).toBeNull();
    });
  });

  describe('forgotPassword', () => {
    it('should make a POST request to forgot-password endpoint', async () => {
      const data = { email: 'test@example.com' };
      const mockResponse = {
        data: {
          message: 'Email-ul de resetare a parolei a fost trimis cu succes.',
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.forgotPassword(data);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/forgot-password'),
        data
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('validateResetToken', () => {
    it('should make a GET request to validate-reset-token endpoint', async () => {
      const token = 'reset-token';
      const mockResponse = {
        data: {
          valid: true,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await authService.validateResetToken(token);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/auth/validate-reset-token?token=${token}`)
      );
      expect(result).toBe(true);
    });
  });

  describe('resetPassword', () => {
    it('should make a POST request to reset-password endpoint', async () => {
      const data = {
        token: 'reset-token',
        password: 'NewPassword123!',
        passwordConfirmation: 'NewPassword123!',
      };
      const mockResponse = {
        data: {
          message: 'Parola a fost resetată cu succes.',
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.resetPassword(data);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/reset-password'),
        data
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getProfile', () => {
    it('should make a GET request to profile endpoint with authorization header', async () => {
      localStorage.setItem('token', 'jwt-token');
      
      const mockUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'user',
      };
      
      const mockResponse = {
        data: mockUser,
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await authService.getProfile();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/auth/profile'),
        {
          headers: {
            Authorization: 'Bearer jwt-token',
          },
        }
      );
      expect(result).toEqual(mockUser);
    });
  });
});
