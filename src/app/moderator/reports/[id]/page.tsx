'use client';

import ModerationTitle from '@/components/features/moderator/moderation-title';
import ModerateReportButton from '@/components/features/moderator/reports/moderate-report-button';
import ModerateReportInstructions from '@/components/features/moderator/reports/moderate-report-instructions';
import { reportApi } from '@/services/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { toast } from 'sonner';

const getReportStatus = (report: BackendReport | null): string => {
  if (!report) return 'Desconhecido';
  if (report.isSolved) return 'Resolvido';
  return 'Pendente';
};

const REASON_TRANSLATIONS: Record<string, string> = {
  COPYRIGHT_VIOLATION: 'Violação de Direitos Autorais',
  INAPPROPRIATE_LANGUAGE: 'Linguagem Inapropriada',
  OTHER: 'Outro',
  FALSE_OR_MISLEADING_INFORMATION: 'Informação Falsa ou Enganosa',
  OFF_TOPIC_OR_IRRELEVANT: 'Fora do Tópico ou Irrelevante',
  PROHIBITED_ITEM_SALE_OR_DISCLOSURE: 'Venda ou Divulgação de Item Proibido',
  INAPPROPRIATE_CONTENT: 'Conteúdo Inapropriado',
};

interface BackendReport {
  id: string;
  reporterId: string;
  reason: string;
  description: string;
  isSolved: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  product: unknown | null;
  productRating: unknown | null;
  ReportUser: unknown[];
  reporter?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
  };
}

function Page() {
  const params = useParams();
  const reportId = params.id as string;
  const [report, setReport] = useState<BackendReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await reportApi.getReportById(reportId);

        if (!result || typeof result !== 'object') {
          throw new Error('Dados inválidos retornados pela API');
        }

        setReport(result as BackendReport);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido';
        setError(`Erro ao carregar detalhes da denúncia: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (reportId) {
      fetchReportDetails();
    }
  }, [reportId]);

  const handleSolveReport = async () => {
    if (!report || isProcessing) return;

    try {
      setIsProcessing(true);
      await reportApi.solveReport(reportId);
      toast.success('Denúncia marcada como resolvida!');
      setReport({ ...report, isSolved: true });
    } catch {
      toast.error('Erro ao resolver denúncia');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <ModerationTitle title={'Denúncias'} />
        <div className="w-full h-64 flex items-center justify-center">
          <p className="text-midnight">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div>
        <ModerationTitle title={'Denúncias'} />
        <div className="w-full h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              {error || 'Denúncia não encontrada'}
            </p>
            <Link href="/moderator/reports" className="text-midnight underline">
              Voltar para lista de denúncias
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                Status: {getReportStatus(report)}
              </h3>
              {!report?.isSolved && (
                <div className="flex mr-8.5 gap-3">
                  <ModerateReportButton
                    variant="archive"
                    onClick={handleSolveReport}
                  />
                </div>
              )}
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
                <div className="w-[215px] h-[175px] border border-sakura rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Sem imagem</p>
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
                      value={report?.id?.substring(0, 8) || ''}
                      className="border border-sakura rounded-md h-8.5 max-w-28 px-2"
                      title={report?.id || ''}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Tipo de Denúncia</label>
                    <input
                      readOnly
                      value={
                        report?.product
                          ? 'Produto'
                          : report?.productRating
                            ? 'Avaliação'
                            : report?.ReportUser?.length
                              ? 'Usuário'
                              : 'Desconhecido'
                      }
                      className="border border-sakura rounded-md h-8.5 max-w-72 px-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Alvo</label>
                    <input
                      readOnly
                      value="N/A"
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
                        value={report?.reporter?.phone || ''}
                        className="border border-sakura rounded-md h-8.5 w-full px-2"
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
                      value={report?.reporter?.name || ''}
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
                          report?.createdAt
                            ? new Date(report.createdAt).toLocaleDateString(
                                'pt-BR',
                              )
                            : ''
                        }
                        className="border border-sakura rounded-md h-8.5 max-w-32 px-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label>Hora</label>
                      <input
                        readOnly
                        value={
                          report?.createdAt
                            ? new Date(report.createdAt).toLocaleTimeString(
                                'pt-BR',
                                { hour: '2-digit', minute: '2-digit' },
                              )
                            : ''
                        }
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
                  value={
                    REASON_TRANSLATIONS[report?.reason || ''] ||
                    report?.reason ||
                    ''
                  }
                  className="border border-sakura rounded-md h-8.5 max-w-60 px-2"
                />
                <label className="my-2">Descrição</label>
                <textarea
                  readOnly
                  value={report?.description || ''}
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
