'use client';

import ModerateArtisanButton from '@/components/features/moderator/artisans/moderate-artisan-button';
import RejectArtisanButton from '@/components/features/moderator/artisans/reject-artisan-button';
import ModerationTitle from '@/components/features/moderator/moderation-title';
import { artisanApi } from '@/services/api';
import { artisanDetails } from '@/types/artisan-details';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Page() {
  const params = useParams();
  const artisanId = params.id as string;
  const [artisan, setArtisan] = useState<artisanDetails | null>(null);
  const router = useRouter();

  const fetchArtisans = async () => {
    try {
      const result = await artisanApi.getApplication(artisanId);
      setArtisan(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'UNAUTHORIZED') {
          router.replace('/auth/login');
        }
        console.error('Erro ao buscar artesãos: ', error.message);
      }
      console.error('Erro ao buscar artesãos: ', error);
    }
  };

  useEffect(() => {
    fetchArtisans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = () => {
    try {
      artisanApi.approve(artisanId);
      toast.success('Usuário aprovado com sucesso!');
      router.push('/moderator/artisans');
    } catch (error) {
      toast.error('Erro ao aprovar artesão!');
      console.error(error);
    }
  };

  const handleRejection = (rejectionReason?: string) => {
    try {
      if (rejectionReason) {
        artisanApi.reject(artisanId, rejectionReason);
        toast.success('Usuário rejeitado com sucesso!');
        router.push('/moderator/artisans');
      }
    } catch (error) {
      toast.error('Erro ao rejeitar artesão!');
      console.error(error);
    }
  };

  return (
    <div>
      <ModerationTitle title={'Detalhes do Artesão'} />
      <div className="w-2/3 mx-auto my-15 flex flex-col sm:flex-row gap-4 sm:justify-between text-midnight font-semibold text-2xl">
        <div className="flex items-center gap-12 sm:gap-4">
          <Link href="/moderator/artisans">
            <ArrowLeft size={24} />
          </Link>
          <h2>{artisan?.artisanName}</h2>
        </div>

        {artisan?.status === 'PENDING' &&
          artisan?.formStatus === 'SUBMITTED' && (
            <div className="flex gap-4 justify-center items-center">
              <ModerateArtisanButton
                variant="approve"
                onClick={() => {
                  handleApprove();
                }}
              />
              <RejectArtisanButton
                variant="reject"
                artisanName={artisan?.artisanName || ''}
                onAction={(reason) => {
                  handleRejection(reason);
                }}
              />
            </div>
          )}
      </div>
      <main className="w-80 sm:w-2/3 mx-auto rounded-xl border border-neutral-200 p-8.5">
        <h3 className="text-salmon font-semibold mb-5">Dados Pessoais</h3>
        <section className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-2 text-midnight">
            <label className=" font-semibold text-sm">Foto de perfil</label>
            <div className="w-56 h-44 border border-sakura rounded-lg">
              <Image
                src={artisan?.artisanAvatarUrl || '/default-avatar.webp'}
                width={172}
                height={172}
                alt="artisan-avatar"
                className="w-full h-full rounded-lg"
              />
            </div>
            <label className="mb-1 mt-4 font-semibold text-sm hidden md:block">
              Cep
            </label>
            <input
              type="text"
              value={
                artisan?.zipCode.slice(0, 5) +
                  '-' +
                  artisan?.zipCode.slice(5) || ''
              }
              readOnly
              className="w-full border border-sakura rounded-lg p-1 hidden md:block"
            />
          </div>
          <div className="flex flex-col gap-4 text-sm w-full text-midnight">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Nome Artístico/Marca</label>
              <input
                type="text"
                value={artisan?.comercialName || ''}
                readOnly
                className="max-w-[528px] border text-sm border-sakura rounded-lg p-1.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Nome Completo</label>
              <input
                type="text"
                value={artisan?.artisanName || ''}
                readOnly
                className="max-w-[528px] border text-sm border-sakura rounded-lg p-1.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Email</label>
              <input
                type="text"
                value={artisan?.artisanEmail || ''}
                readOnly
                className="max-w-[528px] border text-sm border-sakura rounded-lg p-1.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Telefone/WhatsApp</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={'(' + artisan?.artisanPhone?.slice(3, 5) + ')' || ''}
                  readOnly
                  className="max-w-11 border text-sm text-center border-sakura rounded-lg p-1.5 "
                />
                <input
                  type="text"
                  value={artisan?.artisanPhone?.slice(5, 14) || ''}
                  readOnly
                  className="max-w-52 border text-sm border-sakura rounded-lg p-1.5 "
                />
              </div>
            </div>
          </div>
        </section>
        <section className="text-sm text-midnight flex flex-col gap-2 mt-2">
          <div className="flex flex-col font-semibold gap-2">
            <label className="mb-1 mt-4 font-semibold text-sm md:hidden">
              Cep
            </label>
            <input
              type="text"
              value={artisan?.zipCode || ''}
              readOnly
              className="w-full border border-sakura rounded-lg p-1 md:hidden "
            />
            <label>Endereço</label>
            <input
              type="text"
              value={artisan?.address || ''}
              readOnly
              className="max-w-[720px] border border-sakura p-1.5 rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col font-semibold gap-2">
              <label>Número</label>
              <input
                type="text"
                value={artisan?.addressNumber || ''}
                readOnly
                className="w-16 border border-sakura p-1.5 rounded-lg"
              />
            </div>
            <div className="flex flex-col font-semibold gap-2">
              <label>Bairro</label>
              <input
                type="text"
                value={artisan?.neighborhood || ''}
                readOnly
                className="w-full border border-sakura p-1.5 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col font-semibold gap-2">
            <label>Complemento</label>
            <input
              type="text"
              value={artisan?.addressComplement || ''}
              readOnly
              className="max-w-[720px] border border-sakura p-1.5 rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col font-semibold gap-2">
              <label>Cidade</label>
              <input
                type="text"
                value={artisan?.city || ''}
                readOnly
                className="w-full border border-sakura p-1.5 rounded-lg"
              />
            </div>
            <div className="flex flex-col font-semibold gap-2">
              <label>Estado</label>
              <input
                type="text"
                value={artisan?.state || ''}
                readOnly
                className="w-full border border-sakura p-1.5 rounded-lg"
              />
            </div>
          </div>
        </section>
        <section className="my-5 flex flex-col gap-2 text-midnight text-sm">
          <h3 className="text-salmon font-semibold mb-5">
            Dados Profissionais
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Sicab</label>
              <input
                type="text"
                value={artisan?.sicab || ''}
                readOnly
                className="w-full border border-sakura p-1.5 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Data de Criação</label>
              <input
                type="text"
                value={artisan?.sicabRegistrationDate?.slice(0, 10) || ''}
                readOnly
                className="w-full border border-sakura p-1.5 rounded-lg"
              />
            </div>
            <div className="flex flex-col  gap-2">
              <label className="font-semibold">Data de Validade</label>
              <input
                type="text"
                value={artisan?.sicabValidUntil?.slice(0, 10) || ''}
                readOnly
                className="w-full border border-sakura p-1.5 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Materiais</label>
              <input
                type="text"
                value={artisan?.rawMaterial?.join(', ') || ''}
                readOnly
                className="w-3xs border border-sakura p-1.5 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Técnica</label>
              <input
                type="text"
                value={artisan?.technique?.join(', ') || ''}
                readOnly
                className="max-w-3xs w-full border border-sakura p-1.5 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Finalidade</label>
            <input
              type="text"
              value={artisan?.finalityClassification?.join(', ') || ''}
              readOnly
              className="max-w-[520px] border border-sakura p-1.5 rounded-lg"
            />
          </div>
        </section>
      </main>
      <div className="w-80 sm:w-2/3 mx-auto rounded-xl border text-midnight border-neutral-200 p-8.5 mb-15 mt-8">
        <h3 className="font-semibold">Experiências</h3>
        <p className="text-sm font-semibold mt-6 mb-2">
          Breve histórico profissional como Artesão
        </p>
        <textarea
          value={artisan?.bio || ''}
          readOnly
          className="w-full border border-sakura p-1.5 text-sm text-start rounded-lg h-52 resize-none"
        />
        <div className="flex flex-col mt-2 gap-2">
          <p className="font-semibold">Mídias</p>
          <div className="flex gap-2 flex-col md:flex-row flex-wrap">
            {artisan?.photos && artisan.photos.length > 0 ? (
              artisan.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 border border-sakura rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                >
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1} - ${artisan.artisanName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">
                Nenhuma foto disponível
              </p>
            )}
          </div>
          {artisan?.status === 'PENDING' &&
            artisan?.formStatus === 'SUBMITTED' && (
              <div className="flex gap-4 mt-5 items-center ml-auto">
                <ModerateArtisanButton
                  variant="approve"
                  onClick={() => {
                    handleApprove();
                  }}
                />
                <RejectArtisanButton
                  variant="reject"
                  artisanName={artisan?.artisanName || ''}
                  onAction={(reason) => {
                    handleRejection(reason);
                  }}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Page;
