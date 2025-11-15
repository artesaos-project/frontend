export type ReportReason =
  | 'COPYRIGHT_VIOLATION'
  | 'INAPPROPRIATE_LANGUAGE'
  | 'OTHER'
  | 'FALSE_OR_MISLEADING_INFORMATION'
  | 'OFF_TOPIC_OR_IRRELEVANT'
  | 'PROHIBITED_ITEM_SALE_OR_DISCLOSURE'
  | 'INAPPROPRIATE_CONTENT';

export interface ProductRating {
  reportId: string;
  productRatingId: string;
  reporterId: string;
  ProductRatingEntity?: {
    user?: {
      name?: string;
      id?: string;
    };
  };
}

export interface ReportedProduct {
  productId: string;
  reportId: string;
  reporterId: string;
  ProductEntity?: {
    name?: string;
    artisan?: {
      user?: {
        name?: string;
      };
    };
  };
}

export interface ReportedUser {
  reportId: string;
  reportedUserId: string;
  reporterId: string;
  ReportedUserEntity?: {
    name?: string;
    id?: string;
  };
}

export interface Report {
  id: string;
  reporterId: string;
  reason: ReportReason;
  description: string;
  createdAt: Date | { _seconds: number; _nanoseconds: number };
  isDeleted: boolean;
  isSolved: boolean;
  product: ReportedProduct | null;
  productRating: ProductRating | null;
  ReportUser: ReportedUser[];
}

export type ReportFilterType =
  | 'all'
  | 'user'
  | 'product'
  | 'review'
  | 'resolved'
  | 'deleted';
