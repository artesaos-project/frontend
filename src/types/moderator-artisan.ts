export type ArtisanApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type ArtisanFormStatus = 'SUBMITTED' | 'NOT_FINISHED';

export type ArtisanApplicationType = 'BE_ARTISAN';

export interface GetAllArtisanApplicationsParams {
  type?: ArtisanApplicationType;
  status?: ArtisanApplicationStatus;
  formStatus?: ArtisanFormStatus;
  page?: number;
  limit?: number;
  search?: string;
}

export interface ArtisanApplication {
  id: string;
  artisanName: string;
  email: string;
  status: ArtisanApplicationStatus;
  formStatus?: ArtisanFormStatus;
}

export interface ArtisanApplicationsResponse {
  artisanApplications: ArtisanApplication[];
  pagination?: {
    page: number;
    totalPages: number;
    limit: number;
    total: number;
  };
}

export type ArtisanFilterType = 'all' | ArtisanApplicationStatus | 'POSTPONED';
