import { FollowResponse } from '@/types/follow';
import { apiRequest } from '../api-service';

export const followersApi = {
  getAll: () => apiRequest<FollowResponse>(`/artisans/following`),
  toggleFollow: (artisanId: string) =>
    apiRequest(`/artisans/${artisanId}/follow`, { method: 'POST' }),
};
