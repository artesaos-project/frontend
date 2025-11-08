import { ReviewsResponse } from '@/types/review';
import { apiRequest } from '../api-service';

export type CreateReviewPayload = {
  productId: string;
  rating: number;
  comment: string | null;
  imageIds: string[] | null;
};

export const reviewsApi = {
  getByProductId: (productId: string) =>
    apiRequest<ReviewsResponse>(`/products/${productId}/reviews`),

  createReview: (productId: string, data: CreateReviewPayload) =>
    apiRequest(`/products/${productId}/reviews`, {
      method: 'POST',
      body: data,
      isFormData: true,
    }),
};
