// Mock básico para listagem de denúncias
export type Report = {
  id: number;
  reportType: string;
  target: string;
  denunciator: string;
  reason: string;
  status: 'PENDING' | 'MODERATED' | 'ARCHIVED';
};

// Mock detalhado para página individual de denúncia
export type ReportDetailed = Report & {
  phone: {
    ddd: string;
    number: string;
  };
  photo: string;
  date: string;
  time: string;
  detailedDescription: string;
};
