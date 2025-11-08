import { FavoritesApiResponse } from '@/types/favorite';
import { apiRequest } from '../api-service';

export const favoritesApi = {
  getAll: () => apiRequest<FavoritesApiResponse>('/users/my-favorites'),
  like: (productId: string) =>
    apiRequest(`/products/${productId}/like`, { method: 'POST' }),
};
