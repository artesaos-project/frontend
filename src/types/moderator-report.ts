export type ReportStatus = 'PENDING' | 'MODERATED' | 'ARCHIVED';

export interface Report {
  id: number;
  reportType: string;
  target: string;
  denunciator: string;
  reason: string;
  status: ReportStatus;
}

export type ReportFilterType = 'all' | ReportStatus;
