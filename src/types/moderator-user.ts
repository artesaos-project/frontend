export interface ModeratorUser {
  id: string;
  name: string;
  email: string;
  userType: 'USER' | 'ARTISAN';
  phone?: string;
  avatar?: string | null;
  zipCode?: string;
  address?: string;
  addressNumber?: string;
  addressComplement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export interface UsersListResponse {
  users: ModeratorUser[];
  pagination?: {
    page: number;
    totalPages: number;
    limit: number;
    total: number;
  };
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  userType?: 'USER' | 'ARTISAN';
}
