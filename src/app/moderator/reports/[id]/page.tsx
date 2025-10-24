'use client';

import ModerationTitle from '@/components/features/moderator/moderation-title';
import ModerateReportButton from '@/components/features/moderator/reports/moderate-report-button';
import ModerateReportInstructions from '@/components/features/moderator/reports/moderate-report-instructions';
import reportsDetailedMock from '@/db-mock/reports-detailed.json';
import type { ReportDetailed } from '@/types/report';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

const STATUS_TRANSLATIONS: Record<string, string> = {
  PENDING: 'Pendente',
  MODERATED: 'Moderado',
  ARCHIVED: 'Arquivado',
};

function Page() {
  const params = useParams();
  const reportId = Number(params.id);
  const [report, setReport] = useState<ReportDetailed | null>(null);

  const fetchReportDetails = async () => {
    try {
      // Simulando delay de API
      const foundReport = reportsDetailedMock.find((r) => r.id === reportId);
      setReport(foundReport as ReportDetailed);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('erro');
    }
  };

  useEffect(() => {
    fetchReportDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ModerationTitle title={'Denúncias'} />
      <div className="max-w-[295px] sm:max-w-full sm:w-2/3 mx-auto mt-15 mb-7.5">
        <div className="flex gap-10  text-midnight ">
          <Link href="/moderator/reports">
            <ArrowLeft size={30} />
          </Link>
          <h2 className="text-2xl font-semibold">ID {reportId}</h2>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full border border-neutral-300 mt-7.5 rounded-xl">
            <div className="flex justify-between pl-5 text-midnight items-center">
              <h3 className="text-xl font-semibold py-5">
                Status:{' '}
                {report?.status ? STATUS_TRANSLATIONS[report.status] : ''}
              </h3>
              <div>
                <ModerateReportButton variant="exclude" />
              </div>
            </div>
            <div className="pl-5 pr-7.5 pb-5">
              <ModerateReportInstructions />
            </div>
          </div>
          <div className="w-full p-5 border border-neutral-300 mt-7.5 rounded-xl">
            <h3 className="text-salmon font-semibold mb-5">
              Informações do Conteúdo Denunciado
            </h3>
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-0">
              <div className="flex flex-col gap-2">
                <div className="w-[215px] h-[175px] border border-sakura rounded-xl overflow-hidden">
                  {report?.photo && (
                    <Image
                      src={report.photo}
                      width={215}
                      height={175}
                      alt="Foto do denunciante"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <button className="bg-midnight flex gap-2 justify-center items-center rounded-full w-full text-white text-xs font-semibold py-1.5 cursor-pointer hover:text-midnight hover:bg-white border border-midnight transition">
                  ACESSAR
                  <FiExternalLink size="14" />
                </button>
              </div>
              <div className="flex flex-col text-xs text-midnight font-semibold">
                <div className="flex flex-col lg:flex-row gap-4 pl-5">
                  <div className="flex flex-col gap-2">
                    <label>Id</label>
                    <input
                      readOnly
                      value={report?.id || ''}
                      className="border border-sakura rounded-md h-8.5 max-w-28 px-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Tipo de Denúncia</label>
                    <input
                      readOnly
                      value={report?.reportType || ''}
                      className="border border-sakura rounded-md h-8.5 max-w-72 px-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Alvo</label>
                    <input
                      readOnly
                      value={report?.target || ''}
                      className="border border-sakura w-full rounded-md h-8.5 max-w-63 px-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pl-5">
                  <div className="flex flex-col gap-2 mt-4">
                    <label>Telefone/Whatsapp</label>
                    <div className="flex gap-1">
                      <input
                        readOnly
                        value={report?.phone.ddd || ''}
                        className="border border-sakura rounded-md h-8.5 w-11 px-2"
                      />
                      <input
                        readOnly
                        value={report?.phone.number || ''}
                        className="border border-sakura rounded-md h-8.5 w-23 px-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col w-full gap-11 mt-5">
              <div className="flex flex-col">
                <h3 className="font-semibold text-salmon">
                  Informações do Denunciante
                </h3>
                <div className="flex flex-col text-midnight text-xs font-semibold mt-2 gap-2">
                  <label>Nome</label>
                  <div className="flex flex-col gap-1 sm:flex-row">
                    <input
                      readOnly
                      value={report?.denunciator || ''}
                      className="border border-sakura rounded-md h-8.5 max-w-96 px-2"
                    />
                    <Link href={'/'}>
                      <button className="w-8.5 h-8.5 bg-midnight text-white rounded-md flex items-center justify-center hover:text-midnight hover:bg-white border border-midnight transition cursor-pointer">
                        <FiExternalLink size="14" />
                      </button>
                    </Link>
                  </div>
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex flex-col gap-2">
                      <label>Data</label>
                      <input
                        readOnly
                        value={
                          report?.date
                            ? new Date(report.date).toLocaleDateString('pt-BR')
                            : ''
                        }
                        className="border border-sakura rounded-md h-8.5 max-w-32 px-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label>Hora</label>
                      <input
                        readOnly
                        value={report?.time || ''}
                        className="border border-sakura rounded-md h-8.5 max-w-32 px-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col text-xs text-midnight font-semibold">
                <h3 className="font-semibold text-salmon mb-4">
                  Motivo da Denúncia
                </h3>
                <label className="mb-2">Motivo Selecionado</label>
                <input
                  readOnly
                  value={report?.reason || ''}
                  className="border border-sakura rounded-md h-8.5 max-w-60 px-2"
                />
                <label className="my-2">Descrição</label>
                <textarea
                  readOnly
                  value={report?.detailedDescription || ''}
                  className="border border-sakura rounded-md h-28 max-w-[450px] p-2 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
