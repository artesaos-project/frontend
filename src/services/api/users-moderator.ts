import {
  GetUsersParams,
  ModeratorUser,
  UsersListResponse,
} from '@/types/moderator-user';
import { apiRequest } from '../api-service';

export const usersApi = {
  getUsers: (params?: GetUsersParams) => {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.userType) queryParams.append('userType', params.userType);

    const queryString = queryParams.toString();
    const url = `/users${queryString ? `?${queryString}` : ''}`;

    return apiRequest<UsersListResponse>(url);
  },

  getUserById: (userId: string) =>
    apiRequest<ModeratorUser>(`/users/${userId}`),
};
