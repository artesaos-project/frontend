import { apiRequest } from '../api-service';
import { CreateArtisanPayload, CreateUserPayload, UserResponse } from './types';

export const authApi = {
  createUser: (userData: CreateUserPayload): Promise<UserResponse> =>
    apiRequest<UserResponse>('/users', { method: 'POST', body: userData }),

  login: (credentials: { email: string; password: string }) =>
    apiRequest<UserResponse>('/auth/login', {
      method: 'POST',
      body: credentials,
    }),

  initiate: (wantsToCompleteNow: boolean) =>
    apiRequest<{ applicationId: string; message: string }>(
      '/artisan-applications/initiate',
      { method: 'POST', body: { wantsToCompleteNow } },
    ),

  complete: (profileData: CreateArtisanPayload) =>
    apiRequest(`/artisan-applications/${profileData.applicationId}/complete`, {
      method: 'POST',
      body: profileData,
    }),
};
