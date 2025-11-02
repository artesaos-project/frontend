'use client';

import LoadingScreen from '@/components/common/loading-screen';
import ModerationSearchBar from '@/components/features/moderator/moderation-searchbar';
import ModerationTitle from '@/components/features/moderator/moderation-title';
import ReportsTable from '@/components/features/moderator/reports/reports-table';
import reportsMock from '@/db-mock/reports.json';
import { Report, ReportFilterType } from '@/types/moderator-report';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<ReportFilterType>('PENDING');
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulando delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));
      // TODO: Implement real API call
      // const result = await reportsApi.getReports({ status: activeFilter, search: searchTerm });
      // setReports(result.reports);
      setReports(reportsMock as Report[]);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching reports:', error.message);
      }
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter as ReportFilterType);
  };

  // Filter reports client-side for now
  const filteredReports = reports.filter((report) => {
    const matchesFilter =
      activeFilter === 'all' || report.status === activeFilter;
    const matchesSearch =
      searchTerm === '' ||
      report.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.denunciator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
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
