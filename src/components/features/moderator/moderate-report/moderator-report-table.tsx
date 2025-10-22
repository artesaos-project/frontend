'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import ModerateReportButton from './moderate-report-button';

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
  onRefresh: () => void;
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
  onRefresh,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAction = async (action: 'exclude', reportId: number) => {
    try {
      if (action === 'exclude') {
        // await artisanApi.exclude(reportId);
        console.log('Denuncia excluída');
      }
      onRefresh();
    } catch (error) {
      console.error(`Erro ao moderar artesão`, error);
    }
  };

  const handleExclude = async (reportId: number) => {
    await handleAction('exclude', reportId);
  };

  const renderActionButtons = (reports: Report) => {
    switch (reports.status) {
      case 'PENDING':
        return (
          <div className="flex py-1 justify-center items-center gap-2.5">
            <ModerateReportButton
              variant="exclude"
              onClick={() => handleExclude(reports.id)}
            />
          </div>
        );

      case 'MODERATED':
        return null;

      case 'ARCHIVED':
        return null;

      default:
        return null;
    }
  };

  if (isSearching) {
    return (
      <div className="w-2/3 mx-auto mt-10 text-center">
        <p className="text-midnight">Buscando...</p>
      </div>
    );
  }

  return (
    <div>
      <table className="w-2/3 mx-auto mt-10 text-center text-midnight border-b border-midnight text-sm mb-20">
        <thead className="bg-baby-blue">
          <tr>
            <th className="font-semibold p-2 text-sm rounded-tl-md ring-[0.5px]">
              ID
            </th>
            <th className="font-semibold text-sm ring-[0.5px] hidden md:table-cell">
              Tipo
            </th>
            <th className="font-semibold text-sm ring-[0.5px] hidden md:table-cell">
              Alvo
            </th>
            <th className="font-semibold text-sm ring-[0.5px] hidden md:table-cell">
              Denunciante
            </th>
            <th className="font-semibold text-sm ring-[0.5px] hidden md:table-cell">
              Motivo
            </th>
            <th className="font-semibold px-6 text-sm ring-[0.5px] hidden md:table-cell">
              Status
            </th>
            <th className="font-semibold text-sm rounded-tr-md ring-[0.5px]">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report.id} className="h-9">
              <td className="ring-[0.5px]">
                <Link
                  href={`/moderator/reports/${report.id}`}
                  className="hover:font-semibold transition underline"
                >
                  {report.id}
                </Link>
              </td>
              <td className="ring-[0.5px] hidden md:table-cell">
                {report.reportType}
              </td>
              <td className="ring-[0.5px] hidden md:table-cell">
                {report.target}
              </td>
              <td className="ring-[0.5px] hidden md:table-cell">
                {report.denunciator}
              </td>
              <td className="ring-[0.5px] hidden md:table-cell">
                {report.reason}
              </td>
              <td className="font-semibold ring-[0.5px] hidden md:table-cell">
                {STATUS_TRANSLATIONS[report.status]}
              </td>
              <td className="ring-[0.5px]">{renderActionButtons(report)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModeratorReportTable;
