import { ArtisanProfile } from '@/types/artisan';
import { ArtisanDetails } from '@/types/artisan-details';
import { apiRequest } from '../api-service';
import { ArtisanApplicationPayload } from './types';

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
    apiRequest(`/artisan-applications`, { method: 'POST', body: data }),

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
