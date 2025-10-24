export interface Artisan {
  id: string;
  name: string;
  avatar: string | null;
  artisanUserName: string;
  bio: string;
  followersCount: number;
  productsCount: number;
}

export interface FollowingItem {
  id: string;
  createdAt: string;
  artisan: Artisan;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalpages: number;
}

export interface FollowResponse {
  data: {
    following: FollowingItem[];
    pagination: Pagination;
  };
}
