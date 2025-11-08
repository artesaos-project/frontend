import { NewArtisanCardProps } from '@/types/artisan';
import { ApiProduct } from '@/types/product';
import { apiRequest } from '../api-service';

export interface HomeApiResponse {
  newArtisans: NewArtisanCardProps[];
  popularProducts: ApiProduct[];
  recentProducts: ApiProduct[];
  followedArtisansProducts?: ApiProduct[];
}

export const homeApi = {
  getHome: () => apiRequest<{ data: HomeApiResponse }>('/home'),
};
