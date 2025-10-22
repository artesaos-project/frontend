'use client';

import LoadingScreen from '@/components/common/loading-screen';
import ModerateReportInstructions from '@/components/features/moderator/moderate-report/moderate-report-instructions';
import ModeratorReportTable from '@/components/features/moderator/moderate-report/moderator-report-table';
import ModeratorSearch from '@/components/features/moderator/moderator-search';
import ModeratorTitle from '@/components/features/moderator/moderator-title';
import reportsData from '@/db-mock/reports.json';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type Report = {
  id: number;
  reportType: string;
  target: string;
  denunciator: string;
  reason: string;
  status: 'PENDING' | 'MODERATED' | 'ARCHIVED';
};

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('PENDING');
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchReports = useCallback(async () => {
    try {
      setIsLoading(true);
      // const result = await artisanApi.getApplications();
      // setReports(result.artisanApplications);
      setReports(reportsData as unknown as Report[]);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching artisans:', error.message);
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
    setActiveFilter(filter);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-screen h-full overflow-x-hidden">
      <ModeratorTitle title={'Denúncias'} />
      <div className="w-2/3 mx-auto">
        <ModerateReportInstructions />
        <ModeratorSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          variant="reports"
        />
      </div>
      <ModeratorReportTable
        searchTerm={searchTerm}
        activeFilter={activeFilter}
        reports={reports}
        onRefresh={() => fetchReports()}
        isSearching={isLoading}
      />
    </div>
  );
}

export default Page;
