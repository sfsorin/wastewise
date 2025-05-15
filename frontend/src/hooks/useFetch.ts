import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '../stores/authStore';

interface UseFetchOptions<T> extends Omit<AxiosRequestConfig, 'url' | 'method'> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error | AxiosError) => void;
}

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | AxiosError | null;
}

/**
 * Hook personalizat pentru efectuarea request-urilor HTTP
 * @param url URL-ul pentru request
 * @param method Metoda HTTP (GET, POST, PUT, DELETE, etc.)
 * @param options Opțiuni suplimentare pentru request
 */
export const useFetch = <T = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  options: UseFetchOptions<T> = {},
) => {
  const { immediate = false, onSuccess, onError, ...axiosOptions } = options;
  const { token } = useAuthStore();
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (data?: Record<string, unknown>, customConfig: Partial<AxiosRequestConfig> = {}) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const config: AxiosRequestConfig = {
          ...axiosOptions,
          ...customConfig,
          url,
          method,
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...axiosOptions.headers,
            ...customConfig.headers,
          },
        };

        if (data) {
          if (method === 'GET') {
            config.params = { ...config.params, ...data };
          } else {
            config.data = data;
          }
        }

        const response: AxiosResponse<T> = await axios(config);
        setState({ data: response.data, isLoading: false, error: null });
        onSuccess?.(response.data);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        setState({ data: null, isLoading: false, error: axiosError });
        onError?.(axiosError);
        throw axiosError;
      }
    },
    [url, method, axiosOptions, token, onSuccess, onError],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset: () => setState({ data: null, isLoading: false, error: null }),
  };
};

export default useFetch;
