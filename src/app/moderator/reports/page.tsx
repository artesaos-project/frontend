'use client';

import LoadingScreen from '@/components/common/loading-screen';
import ModerationSearchBar from '@/components/features/moderator/moderation-searchbar';
import ModerationTitle from '@/components/features/moderator/moderation-title';
import ReportsTable from '@/components/features/moderator/reports/reports-table';
import { reportApi } from '@/services/api';
import { Report, ReportFilterType } from '@/types/moderator-report';
import { useCallback, useEffect, useState } from 'react';

function ReportsPage() {
  const [searchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<ReportFilterType>('all');
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);

      const params: {
        isSolved?: boolean;
        isDeleted?: boolean;
        targetType?: 'product' | 'productRating' | 'user';
      } = {};

      if (activeFilter === 'resolved') {
        params.isSolved = true;
      } else if (activeFilter === 'deleted') {
        params.isDeleted = true;
      } else if (activeFilter === 'product') {
        params.targetType = 'product';
      } else if (activeFilter === 'review') {
        params.targetType = 'productRating';
      } else if (activeFilter === 'user') {
        params.targetType = 'user';
      }

      const result = await reportApi.listReports(params);

      if (Array.isArray(result)) {
        setReports(result);
      } else {
        console.warn('API did not return an array:', result);
        setReports([]);
      }

      setIsLoading(false);
    } catch {
      setReports([]);
      setIsLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSearchChange = () => {};
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter as ReportFilterType);
  };

  const filteredReports = reports.filter((report) => {
    if (searchTerm === '') return true;

    const searchLower = searchTerm.toLowerCase();
    const reasonMatch = report.reason.toLowerCase().includes(searchLower);
    const descriptionMatch = report.description
      .toLowerCase()
      .includes(searchLower);
    const idMatch = report.id.toLowerCase().includes(searchLower);

    return reasonMatch || descriptionMatch || idMatch;
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <ModerationTitle title="Denúncias" />
      <div className="w-2/3 mx-auto">
        <ModerationSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          variant="reports"
        />
      </div>
      <ReportsTable reports={filteredReports} isLoading={isLoading} />
    </div>
  );
}

export default ReportsPage;
