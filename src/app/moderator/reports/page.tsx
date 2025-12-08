'use client';

import LoadingScreen from '@/components/common/loading-screen';
import Pagination from '@/components/common/pagination';
import ModerationTitle from '@/components/features/moderator/moderation-title';
import ReportsTable from '@/components/features/moderator/reports/reports-table';
import { reportApi } from '@/services/api';
import { Report } from '@/types/moderator-report';
import { useCallback, useEffect, useState } from 'react';

function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0,
    totalPages: 1,
  });

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);

      const result = await reportApi.listReports({
        page: currentPage,
        limit: 15,
      });
      if (result && result.data && Array.isArray(result.data)) {
        setReports(result.data);
        setPagination(result.pagination);
      } else {
        setReports([]);
      }

      setIsLoading(false);
    } catch {
      setReports([]);
      setIsLoading(false);
    }
    // Incluímos currentPage nas dependências pois é usado dentro da função
  }, [currentPage]);

  useEffect(() => {
    fetchReports();
    // fetchReports muda quando currentPage muda (por design), então é seguro
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Removemos fetchReports, dependemos apenas de currentPage

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  if (isLoading && reports.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <ModerationTitle title="Denúncias" />
      <ReportsTable reports={reports} isLoading={isLoading} />
      <div className="my-8">
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ReportsPage;
