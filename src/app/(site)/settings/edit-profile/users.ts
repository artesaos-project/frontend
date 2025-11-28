import { apiRequest } from '@/services/api-service';
import { GetMyProfile, updateMyProfilePayload } from '@/types/artisan';

export const userApi = {
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> =>
    apiRequest<void>('/users/me/password', { method: 'PATCH', body: data }),

  deleteAccount: (): Promise<{ message: string }> =>
    apiRequest<{ message: string }>('/users/me', { method: 'DELETE' }),

  getMe: () => apiRequest<{ user: GetMyProfile }>('/users/me'),

  updateMe: (profileData: Partial<updateMyProfilePayload>) =>
    apiRequest('/users/me/profile', { method: 'PUT', body: profileData }),
};
