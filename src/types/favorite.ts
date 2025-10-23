interface User {
  id: string;
  name: string;
}

interface Artisan {
  id: string;
  userId: string;
  userName: string;
  bio: string;
  user: User;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  priceInCents: number;
  stock: number;
  coverImage: string;
  slug: string;
  viewsCount: number;
  likesCount: number;
  averageRating: number | null;
  artisan: Artisan;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FavoritesApiResponse {
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
}
