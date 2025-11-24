import { GetMyProfile, updateMyProfilePayload } from '@/types/artisan';
import { apiRequest } from '../api-service';

export const userApi = {
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> =>
    apiRequest<void>('/users/me/password', { method: 'PATCH', body: data }),

  updateProvisionalPassword: (data: { newPassword: string }): Promise<{ success: boolean }> =>
    apiRequest<{ success: boolean }>('/users/me/provisional-password', {
      method: 'PUT',
      body: data,
    }),

  deleteAccount: (): Promise<{ message: string }> =>
    apiRequest<{ message: string }>('/users/me', { method: 'DELETE' }),

  getMe: () => apiRequest<{ user: GetMyProfile }>('/users/me'),

  updateMe: (profileData: Partial<updateMyProfilePayload>) =>
    apiRequest('/users/me/profile', { method: 'PUT', body: profileData }),
};
