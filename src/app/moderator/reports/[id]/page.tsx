'use client';

import ModerateReportButton from '@/components/features/moderator/moderate-report/moderate-report-button';
import ModerateReportInstructions from '@/components/features/moderator/moderate-report/moderate-report-instructions';
import ModeratorTitle from '@/components/features/moderator/moderator-title';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Report {
  id: string;
  reportType: string;
  target: string;
  denunciator: string;
  reason: string;
  status: string;
  phone: string;
  date: string;
  time: string;
  description: string;
  photo: string;
}

function Page() {
  const params = useParams();
  const artisanId = params.id as string;
  const [report, setReport] = useState<Report | null>(null);

  const fetchReportDetails = async () => {
    try {
      // const result = await artisanApi.getApplication(artisanId);
      setReport((prev) => (prev?.id === artisanId ? prev : null));
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
      <ModeratorTitle title={'Denúncias'} />
      <div className="w-2/3 mx-auto mt-15 mb-7.5">
        <div className="flex gap-10  text-midnight ">
          <Link href="/moderator/reports">
            <ArrowLeft size={30} />
          </Link>
          <h2 className="text-2xl font-semibold">ID {artisanId}</h2>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full border border-neutral-300 mt-7.5 rounded-xl">
            <div className="flex justify-between pl-5 text-midnight items-center">
              <h3 className="text-xl font-semibold py-5">
                Status: {report?.status}
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
            <div className="flex">
              <div className="flex flex-col gap-2">
                <div className="w-[215px] h-[175px] border border-sakura rounded-xl">
                  <Image
                    src={'/'}
                    width={1}
                    height={1}
                    alt="Denounced content"
                  />
                </div>
                <button className="bg-midnight rounded-full w-full text-white text-xs font-semibold py-1.5 cursor-pointer hover:text-midnight hover:bg-white border border-midnight transition">
                  ACESSAR
                </button>
              </div>
              <div className="flex flex-col text-xs text-midnight font-semibold">
                <div className="flex gap-4 pl-5">
                  <div className="flex flex-col gap-2">
                    <label>Id</label>
                    <input
                      readOnly
                      className="border border-sakura rounded-md h-8.5 w-28"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Tipo de Denúncia</label>
                    <input
                      readOnly
                      className="border border-sakura rounded-md h-8.5 w-72"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Alvo</label>
                    <input
                      readOnly
                      className="border border-sakura rounded-md h-8.5 w-63"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pl-5">
                  <div className="flex flex-col gap-2 mt-4">
                    <label>Telefone/Whatsapp</label>
                    <div className="flex gap-1">
                      <input
                        readOnly
                        className="border border-sakura rounded-md h-8.5 w-11"
                      />
                      <input
                        readOnly
                        className="border border-sakura rounded-md h-8.5 w-23"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-11 mt-5">
              <div className="flex flex-col">
                <h3 className="font-semibold text-salmon">
                  Informações do Denunciante
                </h3>
                <div className="flex flex-col text-midnight text-xs font-semibold mt-2 gap-2">
                  <label>Nome</label>
                  <div className="flex gap-1">
                    <input
                      readOnly
                      className="border border-sakura rounded-md h-8.5 w-96"
                    />
                    <Link href={'/'}>
                      <button className="w-8.5 h-8.5 bg-midnight text-white rounded-md" />
                    </Link>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <label>Data</label>
                      <input
                        readOnly
                        className="border border-sakura rounded-md h-8.5 w-32"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label>Hora</label>
                      <input
                        readOnly
                        className="border border-sakura rounded-md h-8.5 w-32"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-xs text-midnight font-semibold">
                <h3 className="font-semibold text-salmon mb-4">
                  Motivo da Denúncia
                </h3>
                <label className="mb-2">Motivo Selecionado</label>
                <input
                  readOnly
                  className="border border-sakura rounded-md h-8.5 w-60"
                />
                <label className="my-2">Descrição</label>
                <input
                  readOnly
                  className="border border-sakura rounded-md h-28 w-[450px]"
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
