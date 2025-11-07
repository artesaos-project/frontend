import {
  ArtisanProfile,
  GetMyProfile,
  NewArtisanCardProps,
} from '@/types/artisan';
import { ArtisanDetails } from '@/types/artisan-details';
import { CategoryProps } from '@/types/category';
import { FavoritesApiResponse } from '@/types/favorite';
import { FollowResponse } from '@/types/follow';
import { ApiProduct } from '@/types/product';
import { Review } from '@/types/review';
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
  comercialName?: string;
  address?: string;
  zipCode?: string;
  addressNumber?: string;
  addressComplement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

interface UserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    artisanUsername?: string;
    roles: string[];
    postnedApplication: boolean;
  };
  session: {
    id: string;
    expiresAt: string;
  };
  error?: boolean;
  message?: string;
  statusCode?: number;
}

type ArtisanApplicationPayload = {
  rawMaterial: string[];
  technique: string[];
  finalityClassification: string;
  sicab: string;
  sicabRegistrationDate: string;
  sicabValidUntil: string;
};

export const reviewsApi = {
  getByProductId: (productId: string) =>
    apiRequest<Review[]>(`/products/${productId}/reviews`),
};

export const artisanApi = {
  getProfile: (userName: string) =>
    apiRequest<ArtisanProfile>(`/artisan-profiles/${userName}`),

  getApplications: (params?: {
    type?: 'BE_ARTISAN';
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    formStatus?: 'SUBMITTED' | 'POSTPONED';
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();

    if (params?.type) queryParams.append('type', params.type);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.formStatus) queryParams.append('formStatus', params.formStatus);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const url = `/artisan-applications${queryString ? `?${queryString}` : ''}`;

    return apiRequest<{
      artisanApplications: Array<{
        id: string;
        artisanName: string;
        email: string;
        status: 'PENDING' | 'APPROVED' | 'REJECTED';
        formStatus?: 'SUBMITTED' | 'POSTPONED';
      }>;
      pagination?: {
        page: number;
        totalPages: number;
        limit: number;
        total: number;
      };
    }>(url);
  },

  getApplication: (artisanId: string) =>
    apiRequest<ArtisanDetails>(`/artisan-applications/${artisanId}`),

  createApplication: (data: ArtisanApplicationPayload) =>
    apiRequest(`/artisan-applications`, {
      method: 'POST',
      body: data,
    }),

  approve: (artisanId: string) =>
    apiRequest(`/artisan-applications/${artisanId}/moderate`, {
      method: 'PATCH',
      body: { status: 'APPROVED' },
    }),

  reject: (artisanId: string, rejectionReason?: string) =>
    apiRequest(`/artisan-applications/${artisanId}/moderate`, {
      method: 'PATCH',
      body: { status: 'REJECTED', rejectionReason },
    }),
};

export const productApi = {
  getByArtisan: (artisanId: string) =>
    apiRequest<ApiProduct[]>(`/products/?artisanId=${artisanId}`),

  getById: (id: string) => apiRequest<ApiProduct>(`/products/${id}`),

  getAll: () => apiRequest<ApiProduct[]>(`/products`),

  create: (productData: unknown) =>
    apiRequest<{ message?: string }>(`/products`, {
      method: 'POST',
      body: productData,
    }),
  update: (id: string, productData: unknown) =>
    apiRequest<{ message?: string }>(`/products/${id}`, {
      method: 'PUT',
      body: productData,
    }),
  delete: (id: string) =>
    apiRequest<{ message?: string }>(`/products/${id}`, {
      method: 'DELETE',
    }),
  getCatalogs: () =>
    apiRequest<{ items: CategoryProps[] }>('/catalog/categories'),
  search: (query: string) => apiRequest<ApiProduct[]>(`/products?${query}`),
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
  createUser: (userData: CreateUserPayload): Promise<UserResponse> =>
    apiRequest<UserResponse>('/users', {
      method: 'POST',
      body: userData,
    }),

  login: (credentials: { email: string; password: string }) =>
    apiRequest<UserResponse>('/auth/login', {
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
  getMe: () => apiRequest<{ user: GetMyProfile }>('/users/me'),
  updateMe: (profileData: Partial<GetMyProfile>) =>
    apiRequest('/users/me/profile', {
      method: 'PUT',
      body: profileData,
    }),
};

export const favoritesApi = {
  getAll: () => apiRequest<FavoritesApiResponse>('/users/my-favorites'),
  like: (productId: string) =>
    apiRequest(`/products/${productId}/like`, { method: 'POST' }),
};

export const followersApi = {
  getAll: () => apiRequest<FollowResponse>(`/artisans/following`),
  toggleFollow: (artisanId: string) =>
    apiRequest(`/artisans/${artisanId}/follow`, {
      method: 'POST',
    }),
};

export const userApi = {
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> =>
    apiRequest<void>('/users/me/password', {
      method: 'PATCH',
      body: data,
    }),
  deleteAccount: (): Promise<{ message: string }> =>
    apiRequest<{ message: string }>('/users/me', {
      method: 'DELETE',
    }),
};

export interface HomeApiResponse {
  newArtisans: NewArtisanCardProps[];
  popularProducts: ApiProduct[];
  recentProducts: ApiProduct[];
  followedArtisansProducts?: ApiProduct[];
}

export const homeApi = {
  getHome: () => apiRequest<{ data: HomeApiResponse }>('/home'),
};

export const reportApi = {
  reportProduct: (data: {
    productId: string;
    reason: string;
    details: string;
  }) =>
    apiRequest<{ message: string }>('/reports/products', {
      method: 'POST',
      body: data,
    }),
};
