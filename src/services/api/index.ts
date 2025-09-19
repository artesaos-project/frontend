import { ArtisanProfile } from '@/types/artisan';
import { artisanDetails } from '@/types/artisan-details';
import { ApiProduct } from '@/types/product';
import { apiRequest } from '../api-service';

type CreateUserPayload = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  socialName?: string;
};

type Artisan = {
  id: string;
  artisanName: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE';
};

type ArtisanApplicationPayload = {
  rawMaterial: string[];
  technique: string[];
  finalityClassification: string;
  sicab: string;
  sicabRegistrationDate: string;
  sicabValidUntil: string;
};

export const artisanApi = {
  getProfile: (userName: string) =>
    apiRequest<ArtisanProfile>(`/artisan-profile/${userName}`),

  getApplications: () =>
    apiRequest<{ artisanApplications: Artisan[] }>(`/artisan-applications`),

  getApplication: (artisanId: string) =>
    apiRequest<{ artisanApplication: artisanDetails }>(
      `/artisan-applications/${artisanId}`,
    ),

  createApplication: (data: ArtisanApplicationPayload) =>
    apiRequest(`/artisan-applications`, {
      method: 'POST',
      body: data,
    }),

  approve: (artisanId: string) =>
    apiRequest(`/artisan-applications/${artisanId}/moderate`, {
      method: 'POST',
      body: { status: 'APPROVED' },
    }),

  reject: (artisanId: string) =>
    apiRequest(`/artisan-applications/${artisanId}/moderate`, {
      method: 'POST',
      body: { status: 'REJECTED' },
    }),
};

export const productApi = {
  getByArtisan: (artisanId: string) =>
    apiRequest<ApiProduct[]>(`/products/?artisanId=${artisanId}`),

  getById: (id: string) => apiRequest<ApiProduct>(`/products/${id}`),

  getAll: () => apiRequest<ApiProduct[]>(`/products`),

  create: (productData: unknown) =>
    apiRequest(`/products`, {
      method: 'POST',
      body: productData,
    }),
};

export const uploadApi = {
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiRequest<{ attachmentId: string; url?: string }>('/attachments', {
      method: 'POST',
      body: formData,
      isFormData: true,
    });
  },
};

export const authApi = {
  createUser: (userData: CreateUserPayload) =>
    apiRequest<{
      userId: string;
      name: string;
      artisanUserName?: string;
      avatar: string;
      roles: string[];
    }>('/users', {
      method: 'POST',
      body: userData,
    }),

  signIn: (credentials: { email: string; password: string }) =>
    apiRequest<{
      userId: string;
      name: string;
      artisanUserName?: string;
      avatar: string;
      roles: string[];
    }>('/sessions', {
      method: 'POST',
      body: credentials,
    }),
};
