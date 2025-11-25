import {
  AdminListedUser,
  ChangeUserPasswordInput,
  ListAdminUsersInput,
} from '@/types/admin-user';
import { apiRequest } from '../api-service';

export const adminUsersApi = {
  getUsers: async (params: ListAdminUsersInput) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page.toString());
    queryParams.append('limit', params.limit.toString());

    const url = `/admin/users?${queryParams.toString()}`;
    const response = await apiRequest<{
      data: AdminListedUser[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(url);

    return {
      users: response.data,
      pagination: response.pagination,
    };
  },

  changeUserPassword: (data: ChangeUserPasswordInput) => {
    return apiRequest<{ message: string }>(
      `/admin/users/${data.userId}/reset-password`,
      {
        method: 'PUT',
        body: { password: data.newPassword },
      },
    );
  },
};
