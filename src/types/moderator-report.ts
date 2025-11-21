export type ReportReason =
  | 'COPYRIGHT_VIOLATION'
  | 'INAPPROPRIATE_LANGUAGE'
  | 'OTHER'
  | 'FALSE_OR_MISLEADING_INFORMATION'
  | 'OFF_TOPIC_OR_IRRELEVANT'
  | 'PROHIBITED_ITEM_SALE_OR_DISCLOSURE'
  | 'INAPPROPRIATE_CONTENT';

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

export interface Report {
  id: string;
  reporterId: string;
  reason: ReportReason;
  description: string;
  createdAt: Date | { _seconds: number; _nanoseconds: number };
  isSolved: boolean;
  product: ReportedProduct | null;
}

export type ReportFilterType = 'all' | 'product' | 'resolved';
