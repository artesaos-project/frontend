import axios, { AxiosRequestConfig } from 'axios';

type FetchOptions = {
  body?: unknown;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  method?: AxiosRequestConfig['method'];
  isFormData?: boolean;
};

function adaptMockRoute(endpoint: string): string {
  if (endpoint.startsWith('/auth/login')) return '/sessions';
  if (endpoint.startsWith('/users/me')) return '/users/1';
  if (endpoint.startsWith('/users')) return '/users';
  if (endpoint.startsWith('/artisan-applications'))
    return '/artisan_applications';
  if (endpoint.startsWith('/artisan-profiles')) return '/artisan_profiles';
  if (endpoint.startsWith('/products')) return '/products';
  if (endpoint.startsWith('/catalog/materials')) return '/raw_materials';
  return endpoint;
}

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
  const useMock = process.env.NEXT_PUBLIC_MOCK_API === 'true';

  const baseUrl = useMock
    ? process.env.NEXT_PUBLIC_MOCK_API_URL || 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      'API_BASE_URL (ou MOCK_API_URL) não definida nas variáveis de ambiente',
    );
  }

  const finalEndpoint = useMock ? adaptMockRoute(endpoint) : endpoint;
  const url = `${baseUrl}${finalEndpoint}`;
  // console.log(`API Request: ${method || (body ? 'POST' : 'GET')} ${url}`);

  try {
    const response = await axios<T>({
      url,
      method: method || (body ? 'POST' : 'GET'),
      data: body,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      withCredentials: !useMock && (withCredentials ?? true),
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `API Request Error (${method || 'GET'} ${url}):`,
        error.response?.data || error.message,
      );
    } else {
      console.error('Erro inesperado:', error);
    }
    throw error;
  }
};
