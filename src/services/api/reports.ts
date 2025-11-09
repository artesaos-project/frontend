import { apiRequest } from '../api-service';

export const reportApi = {
  reportProduct: (data: {
    productId: string;
    reason: string;
    details: string;
  }) =>
    apiRequest<{ message: string }>('/reports/products', {
      method: 'POST',
      body: data,
    }),
};
