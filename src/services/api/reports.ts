import { Report } from '@/types/moderator-report';
import { apiRequest } from '../api-service';

export interface ListReportsParams {
  isSolved?: boolean | string;
  reporterId?: string;
  page?: number;
  limit?: number;
}

export interface ListReportsResponse {
  data: Report[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const reportApi = {
  reportProduct: (data: {
    productId: string;
    reason: string;
    description: string;
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
    if (params?.reporterId) {
      queryParams.append('reporterId', params.reporterId);
    }
    if (params?.page !== undefined && !isNaN(params.page)) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit !== undefined && !isNaN(params.limit)) {
      queryParams.append('limit', params.limit.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/reports?${queryString}` : '/reports';

    return apiRequest<ListReportsResponse>(url, {
      method: 'GET',
    });
  },
};
