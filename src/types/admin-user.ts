export interface AdminListedUser {
  id: string;
  email: string;
  roles: string[];
  name: string | null;
  phone: string | null;
  socialName: string | null;
  avatar: string | null;
  isDisabled: boolean;
  createdAt: string;
  updatedAt: string;
  mustChangePassword: boolean;
  profile: {
    cpf: string;
    phone: string | null;
  } | null;
  ArtisanProfile: {
    artisanUserName: string;
    comercialName: string | null;
    followersCount: number;
    productsCount: number;
  } | null;
}

export interface ListAdminUsersInput {
  page: number;
  limit: number;
}

export interface ListAdminUsersOutput {
  users: AdminListedUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ChangeUserPasswordInput {
  userId: string;
  newPassword: string;
}
