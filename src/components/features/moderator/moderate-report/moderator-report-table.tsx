'use client';

import Link from 'next/link';
import { useMemo } from 'react';

type Report = {
  id: number;
  reportType: string;
  target: string;
  denunciator: string;
  reason: string;
  status: 'PENDING' | 'MODERATED' | 'ARCHIVED';
};

interface ModeratorTableProps {
  searchTerm: string;
  activeFilter: string;
  reports: Report[];
  searchResults?: Report[];
  isSearching?: boolean;
}

const STATUS_TRANSLATIONS: Record<string, string> = {
  PENDING: 'Pendente',
  MODERATED: 'Moderado',
  ARCHIVED: 'Arquivado',
};

function ModeratorReportTable({
  searchTerm,
  activeFilter,
  reports,
  searchResults = [],
  isSearching = false,
}: ModeratorTableProps) {
  const filteredReports = useMemo(() => {
    const dataToFilter = searchTerm.trim() ? searchResults : reports;

    let filtered = dataToFilter;

    if (!searchTerm.trim() && activeFilter !== 'all') {
      filtered = filtered.filter((report) => report.status === activeFilter);
    }

    return filtered;
  }, [reports, searchResults, searchTerm, activeFilter]);

  if (isSearching) {
    return (
      <div className="w-full px-4 sm:w-11/12 md:w-5/6 lg:w-2/3 mx-auto mt-10 text-center">
        <p className="text-midnight">Buscando...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 overflow-x-hidden">
      <div className="w-full sm:w-11/12 md:w-5/6 lg:w-2/3 mx-auto mt-10 mb-20">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-midnight border-b border-midnight text-sm">
            <thead className="bg-baby-blue">
              <tr>
                <th className="font-semibold p-2 text-xs sm:text-sm rounded-tl-md ring-[0.5px] whitespace-nowrap">
                  ID
                </th>
                <th className="font-semibold p-2 text-xs sm:text-sm ring-[0.5px] rounded-tr-md sm:rounded-none whitespace-nowrap">
                  Alvo
                </th>
                <th className="font-semibold p-2 text-xs sm:text-sm ring-[0.5px] hidden sm:table-cell whitespace-nowrap">
                  Status
                </th>
                <th className="font-semibold p-2 text-xs sm:text-sm ring-[0.5px] hidden md:table-cell whitespace-nowrap">
                  Tipo
                </th>
                <th className="font-semibold p-2 text-xs sm:text-sm ring-[0.5px] hidden lg:table-cell whitespace-nowrap">
                  Denunciante
                </th>
                <th className="font-semibold p-2 text-xs sm:text-sm ring-[0.5px] rounded-tr-md hidden xl:table-cell whitespace-nowrap">
                  Motivo
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="h-9">
                  <td className="ring-[0.5px] border border-midnight p-1 sm:p-2 ">
                    <Link
                      href={`/moderator/reports/${report.id}`}
                      className="hover:font-semibold transition underline text-xs sm:text-sm"
                    >
                      {report.id}
                    </Link>
                  </td>
                  <td className="ring-[0.5px] p-1 sm:p-2 text-xs sm:text-sm border border-midnight max-w-[120px] sm:max-w-none truncate">
                    {report.target}
                  </td>
                  <td className="font-semibold ring-[0.5px] p-1 sm:p-2 hidden sm:table-cell text-xs sm:text-sm border border-midnight whitespace-nowrap">
                    {STATUS_TRANSLATIONS[report.status]}
                  </td>
                  <td className="ring-[0.5px] p-1 sm:p-2 hidden md:table-cell text-xs sm:text-sm border border-midnight whitespace-nowrap">
                    {report.reportType}
                  </td>
                  <td className="ring-[0.5px] p-1 sm:p-2 hidden lg:table-cell text-xs sm:text-sm border border-midnight whitespace-nowrap">
                    {report.denunciator}
                  </td>
                  <td className="ring-[0.5px] p-1 sm:p-2 hidden xl:table-cell text-xs sm:text-sm border border-midnight max-w-[200px] truncate">
                    {report.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ModeratorReportTable;
