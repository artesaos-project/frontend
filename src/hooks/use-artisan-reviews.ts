import {
  artisanReviewsApi,
  ArtisanReviewsResponse,
} from '@/services/api/artisan-reviews';
import { useQuery } from '@tanstack/react-query';

interface UseArtisanReviewsParams {
  artisanId: string | undefined;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export const useArtisanReviews = ({
  artisanId,
  page = 1,
  limit = 10,
  enabled = true,
}: UseArtisanReviewsParams) => {
  return useQuery<ArtisanReviewsResponse>({
    queryKey: ['artisan-reviews', artisanId, page, limit],
    queryFn: () => {
      if (!artisanId) {
        throw new Error('Artisan ID is required');
      }
      return artisanReviewsApi.getByArtisan(artisanId, { page, limit });
    },
    enabled: !!artisanId && enabled,
    staleTime: 1000 * 60 * 3,
  });
};
