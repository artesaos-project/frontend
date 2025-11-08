import useStoreUser from '@/hooks/use-store-user';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseUrl) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

export const apiClient = axios.create({
  baseURL: baseUrl,
});

type FetchOptions = {
  body?: unknown;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  method?: AxiosRequestConfig['method'];
  isFormData?: boolean;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      toast.error('Sua sessão expirou. Por favor, faça login novamente.');

      const { resetStore } = useStoreUser.getState();
      resetStore();

      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 5000);
    } else if (error.response && error.response.status === 403) {
      console.warn(
        'Interceptador: Acesso proibido (403). O usuário está logado, mas não tem permissão.',
      );
    }
    return Promise.reject(error);
  },
);

export const apiRequest = async <T>(
  endpoint: string,
  {
    body,
    withCredentials,
    headers,
    method,
    isFormData = false,
  }: FetchOptions = {},
): Promise<T> => {
  const devMode = process.env.NEXT_PUBLIC_DEVELOPMENT === 'true';

  try {
    const response = await apiClient<T>({
      url: endpoint,
      method: method || (body ? 'POST' : 'GET'),
      data: body,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      withCredentials: devMode ? false : (withCredentials ?? true),
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Erro Inesperado', error);
    }

    throw error;
  }
};
