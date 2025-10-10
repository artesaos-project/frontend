import { ArtisanProfile } from '@/types/artisan';
import { artisanDetails } from '@/types/artisan-details';
import { ApiProduct } from '@/types/product';
import { apiRequest } from '../api-service';

type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  socialName?: string;
};
export interface CreateArtisanPayload {
  applicationId?: string;
  rawMaterial: string[];
  technique: string[];
  finalityClassification: string[];
  bio?: string;
  photosIds?: string[];
  sicab?: string;
  sicabRegistrationDate?: string;
  sicabValidUntil?: string;
}

interface CreateUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    artisanUserName?: string;
    roles: string[];
  };
  session: {
    id: string;
    expiresAt: string;
  };
  error?: boolean;
  message?: string;
  statusCode?: number;
}

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
  createUser: (userData: CreateUserPayload): Promise<CreateUserResponse> =>
    apiRequest<CreateUserResponse>('/users', {
      method: 'POST',
      body: userData,
    }),

  login: (credentials: { email: string; password: string }) =>
    apiRequest<{
      user: {
        id: string;
        name: string;
        email: string;
        roles: string[];
      };
    }>('/auth/login', {
      method: 'POST',
      body: credentials,
    }),

  initiate: (wantsToCompleteNow: boolean) =>
    apiRequest<{ applicationId: string; message: string }>(
      '/artisan-applications/initiate',
      {
        method: 'POST',
        body: { wantsToCompleteNow },
      },
    ),
  complete: (profileData: CreateArtisanPayload) =>
    apiRequest(`/artisan-applications/${profileData.applicationId}/complete`, {
      method: 'POST',
      body: profileData,
    }),
};
