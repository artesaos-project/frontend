export interface Review {
  reviewer: string;
  rating: number;
  reviewText: string;
  reviewImages?: string[];
  reviewerImage?: string;
}

export interface Product {
  id?: number;
  title: string;
  price: number;
  author: string;
  description: string;
  img: string;
  reviews?: Review[];
}

export interface FormattedReview {
  reviewerImage?: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  reviewImages?: string[];
}

export interface ApiProduct {
  id: string;
  authorName: string;
  authorId: string;
  title: string;
  description: string;
  priceInCents: number;
  categoryId: number;
  stock: number;
  likesCount: number;
  averageRating: number;
  photos: string[];
  coverPhoto: string;
}
