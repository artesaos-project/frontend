import { ReviewsResponse } from '@/types/review';
import { apiRequest } from '../api-service';

export type CreateReviewPayload = {
  productId: string;
  rating: number;
  comment: string | null;
  imageIds: string[] | null;
  isAnonymous?: boolean;
};

export const reviewsApi = {
  getByProductId: (productId: string) =>
    apiRequest<ReviewsResponse>(`/products/${productId}/reviews`, {
      withCredentials: true,
    }),

  createReview: (productId: string, data: CreateReviewPayload) =>
    apiRequest(`/products/${productId}/reviews`, {
      method: 'POST',
      body: data,
      withCredentials: true,
    }),
};
