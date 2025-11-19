import { CategoryProps } from '@/types/category';
import { ApiProduct } from '@/types/product';
import { apiRequest } from '../api-service';

export const productApi = {
  getByArtisan: (artisanId: string) =>
    apiRequest<ApiProduct[]>(`/products/?artisanId=${artisanId}`),

  getById: (id: string) => apiRequest<ApiProduct>(`/products/${id}`),

  getAll: () => apiRequest<ApiProduct[]>(`/products`),

  create: (productData: unknown) =>
    apiRequest<{ message?: string }>(`/products`, {
      method: 'POST',
      body: productData,
    }),

  update: (id: string, productData: unknown) =>
    apiRequest<{ message?: string }>(`/products/${id}`, {
      method: 'PUT',
      body: productData,
    }),

  delete: (id: string) =>
    apiRequest<{ message?: string }>(`/products/${id}`, { method: 'DELETE' }),

  getCatalogs: () =>
    apiRequest<{ items: CategoryProps[] }>('/catalog/categories'),

  search: (query: string) => apiRequest<ApiProduct[]>(`/products?${query}`),
};
