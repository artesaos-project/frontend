import { apiRequest } from '../api-service';

export interface ListReportsParams {
  isSolved?: boolean | string;
  isDeleted?: boolean | string;
  reporterId?: string;
  targetType?: 'product' | 'productRating' | 'user';
  take?: number;
  skip?: number;
}

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

  getReportById: (id: string) => {
    return apiRequest<unknown>(`/reports/${id}`, {
      method: 'GET',
    });
  },

  solveReport: (reportId: string) => {
    return apiRequest<{ message: string }>(`/reports/${reportId}/solve`, {
      method: 'PATCH',
    });
  },

  listReports: (params?: ListReportsParams) => {
    const queryParams = new URLSearchParams();

    if (params?.isSolved !== undefined) {
      queryParams.append('isSolved', String(params.isSolved));
    }
    if (params?.isDeleted !== undefined) {
      queryParams.append('isDeleted', String(params.isDeleted));
    }
    if (params?.reporterId) {
      queryParams.append('reporterId', params.reporterId);
    }
    if (params?.targetType) {
      queryParams.append('targetType', params.targetType);
    }
    if (params?.take !== undefined && !isNaN(params.take)) {
      queryParams.append('take', params.take.toString());
    }
    if (params?.skip !== undefined && !isNaN(params.skip)) {
      queryParams.append('skip', params.skip.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/reports?${queryString}` : '/reports';

    return apiRequest<unknown>(url, {
      method: 'GET',
    });
  },
};
