import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { API, AUTH_TOKEN_KEY } from '../constants';

// Interfețe pentru erori personalizate
interface ErrorWithStatus extends Error {
  status: number;
}

interface ErrorWithData extends Error {
  data: Record<string, unknown>;
}

/**
 * Configurare client Axios pentru API
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API.BASE_URL}/${API.VERSION}`,
  timeout: API.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Interceptor pentru adăugarea token-ului de autentificare la request-uri
 */
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

/**
 * Interceptor pentru gestionarea răspunsurilor
 */
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Verificăm dacă eroarea este 401 (Unauthorized) și nu am încercat deja să reînnoim token-ul
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Încercăm să reînnoim token-ul
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API.BASE_URL}/${API.VERSION}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem(AUTH_TOKEN_KEY, accessToken);

        // Reluăm request-ul original cu noul token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Dacă nu putem reînnoi token-ul, delogăm utilizatorul
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('auth_user');

        // Redirecționăm către pagina de login
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Funcție pentru efectuarea unui request GET
 * @param url URL-ul pentru request
 * @param params Parametri pentru query string
 * @param config Configurație suplimentară pentru request
 */
export const get = async <T>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, {
      ...config,
      params,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Funcție pentru efectuarea unui request POST
 * @param url URL-ul pentru request
 * @param data Date pentru request body
 * @param config Configurație suplimentară pentru request
 */
export const post = async <T>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Funcție pentru efectuarea unui request PUT
 * @param url URL-ul pentru request
 * @param data Date pentru request body
 * @param config Configurație suplimentară pentru request
 */
export const put = async <T>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Funcție pentru efectuarea unui request PATCH
 * @param url URL-ul pentru request
 * @param data Date pentru request body
 * @param config Configurație suplimentară pentru request
 */
export const patch = async <T>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.patch(url, data, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Funcție pentru efectuarea unui request DELETE
 * @param url URL-ul pentru request
 * @param config Configurație suplimentară pentru request
 */
export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Funcție pentru gestionarea erorilor API
 * @param error Eroarea de la Axios
 */
const handleApiError = (error: AxiosError): Error => {
  if (error.response) {
    // Eroare de la server (status code în afara intervalului 2xx)
    const status = error.response.status;
    const data = error.response.data as Record<string, unknown>;

    // Creăm un mesaj de eroare mai descriptiv
    let message = (data.message as string) || 'A apărut o eroare în comunicarea cu serverul';

    if (Array.isArray(data.errors)) {
      message += `: ${(data.errors as string[]).join(', ')}`;
    }

    const customError = new Error(message);
    (customError as ErrorWithStatus).status = status;
    (customError as ErrorWithData).data = data;

    return customError;
  } else if (error.request) {
    // Request-ul a fost făcut dar nu s-a primit niciun răspuns
    return new Error(
      'Nu s-a primit niciun răspuns de la server. Verificați conexiunea la internet.',
    );
  } else {
    // Eroare la configurarea request-ului
    return new Error(`Eroare la configurarea cererii: ${error.message}`);
  }
};

export default {
  get,
  post,
  put,
  patch,
  del,
  client: apiClient,
};
