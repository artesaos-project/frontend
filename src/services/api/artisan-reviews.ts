import { Review } from '@/types/review';
import { apiRequest } from '../api-service';

export interface ArtisanReviewsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ArtisanReviewsResponse {
  data: Review[];
  pagination: ArtisanReviewsPagination;
}

export const artisanReviewsApi = {
  getByArtisan: (
    artisanId: string,
    params?: { page?: number; limit?: number },
  ) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    const queryString = queryParams.toString();
    const url = `/artisans/${artisanId}/reviews${queryString ? `?${queryString}` : ''}`;
    return apiRequest<ArtisanReviewsResponse>(url);
  },
};
