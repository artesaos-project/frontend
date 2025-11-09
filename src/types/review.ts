type reviews = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
  images: Array<{ attachmentId: string }>;
};
export type Review = reviews;

export interface ReviewsResponse {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  reviews: Review[];
}
