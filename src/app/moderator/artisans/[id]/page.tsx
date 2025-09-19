'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { artisanApi } from '@/services/api';
import { artisanDetails } from '@/types/artisan-details';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowDown, IoIosInformationCircleOutline } from 'react-icons/io';
import ModeratorHeader from '../../../../components/features/moderator/moderator-header';
import ModeratorTitle from '../../../../components/features/moderator/moderator-title';

function Page() {
  const params = useParams();
  const artisanId = params.id as string;
  const [artisan, setArtisan] = useState<artisanDetails | null>(null);
  const router = useRouter();

  const fetchArtisans = async () => {
    try {
      const result = await artisanApi.getApplication(artisanId);
      setArtisan(result.artisanApplication);
      console.log(result.artisanApplication);
    } catch (error: any) {
      if (error.message === 'UNAUTHORIZED') {
        router.replace('/');
      }
      console.error('Erro ao buscar artesãos: ', error);
    }
  };

  useEffect(() => {
    fetchArtisans();
  }, [artisanId]);

  const handleApprove = async () => {
    try {
      await artisanApi.approve(artisanId);
      console.log(`artesao aprovado`);
      router.push('/moderator/artisans');
    } catch (error) {
      console.error('Erro ao aprovar artesão: ', error);
    }
  };

  const handleRejection = async () => {
    try {
      await artisanApi.reject(artisanId);
      console.log(`artesao rejeitado`);
      router.push('/moderator/artisans');
    } catch (error) {
      console.error('Erro ao rejeitar artesão: ', error);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <ModeratorHeader />
      <ModeratorTitle title={'Artesãos'} />
      <div className="w-2/3 flex mx-auto mt-10 items-center justify-between">
        <h2 className="text-2xl text-midnight font-semibold">
          {artisan?.userName ? artisan.userName : 'Artesão não encontrado'}
        </h2>
        <div className="flex gap-4">
          <Button
            className="h-7 text-xs my-1 bg-green-600 rounded-lg cursor-pointer"
            aria-label="Aprovar artesão"
            onClick={handleApprove}
          >
            <FaCheck className="text-white" />
            APROVAR
          </Button>
          <Button
            className="h-7 text-xs my-1 text-white font-bold border bg-red-500 rounded-lg cursor-pointer"
            aria-label="Desativar artesão"
            onClick={handleRejection}
          >
            <BsXLg className="text-white" />
            DESATIVAR
          </Button>
        </div>
      </div>
      <div className="w-2/3 flex flex-col h-[632px] mx-auto my-8 p-5 text-midnight rounded-lg shadow ring-[0.5px] ring-black/20 shadow-black/30">
        <h3 className="font-semibold mb-5">Dados Pessoais</h3>
        <div className="flex mb-5">
          <div>
            <Label className="text-xs font-semibold mb-2">Foto de Perfil</Label>
            <Image
              src="https://github.com/marcus-santos.png"
              width={246}
              height={246}
              alt={'artisan-profile-photo'}
              className="rounded-md border-2 border-midnight min-w-[246px]"
            />
          </div>
          <div className="w-full flex flex-col gap-2 ml-5">
            <Label className="text-xs font-semibold">
              Nome Artístico/ Marca
            </Label>
            <Input
              value={artisan?.userName}
              readOnly
              className="border border-midnight max-w-[528px] "
            />

            <Label className="text-xs font-semibold">Nome Completo</Label>
            <Input
              value={artisan?.userName}
              readOnly
              className="border border-midnight max-w-[528px]"
            />

            <Label className="text-xs font-semibold">Email</Label>
            <Input
              value={artisan?.userEmail}
              readOnly
              className="border border-midnight max-w-[528px]"
            />

            <Label className="text-xs font-semibold">Telefone/ Whatsapp</Label>
            <div className="flex gap-2 max-w-3xs">
              <Input
                value={artisan?.userPhone.slice(3, 5)}
                readOnly
                className="w-11 border border-midnight"
              />
              <Input
                value={artisan?.userPhone.slice(5, 14)}
                readOnly
                className="border border-midnight"
              />
            </div>
          </div>
        </div>
        <div className="flex mb-5 gap-3">
          <div>
            <Label className="text-xs font-semibold">CEP</Label>
            <Input
              value={artisan?.sicab}
              readOnly
              className="border border-midnight"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold">Estado</Label>
            <Input
              value={artisan?.sicab}
              readOnly
              className="border border-midnight"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold">Cidade</Label>
            <Input
              value={artisan?.sicab}
              readOnly
              className="border border-midnight"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <Label className="text-xs font-semibold">Endereço</Label>
          <Input
            value={artisan?.sicab}
            readOnly
            className="max-w-[576px] border border-midnight"
          />

          <Label className="text-xs font-semibold">Nome de usuário</Label>
          <Input
            value={artisan?.userName}
            readOnly
            className=" max-w-52 border border-midnight"
          />
        </div>
      </div>

      <div className="w-2/3 flex flex-col mx-auto my-8 p-5 text-midnight rounded-lg shadow ring-[0.5px] ring-black/20 shadow-black/30">
        <h3 className="font-semibold mb-5">Dados Profissionais</h3>
        <div className="max-w-[960px] flex justify-around gap-5 mb-5">
          <div className="w-full">
            <Label className="text-xs font-semibold mb-1">
              Tipo de Artesanato/ Arte
            </Label>
            <div className="relative max-w-[450px]">
              <Input
                value={artisan?.rawMaterial}
                readOnly
                className="border border-midnight pr-8"
              />
              <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-midnight pointer-events-none" />
            </div>
          </div>

          <div className="min-w-18">
            <Label className="text-xs font-semibold mb-1">MEI ou CNPJ</Label>
            <div className="relative max-w-[200px]">
              <Input
                value={artisan?.userName}
                readOnly
                className="border border-midnight pr-8"
              />
              <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-midnight pointer-events-none" />
            </div>
          </div>

          <div className="w-full">
            <Label className="text-xs font-semibold mb-1">Número</Label>
            <Input
              value={artisan?.sicab}
              readOnly
              className="max-w-64 border border-midnight"
            />
          </div>
        </div>
        <div className="flex text-xs font-semibold gap-4">
          <div className="border border-midnight rounded-md pl-2 pr-4 py-1">
            <p>Notificações por Email</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input type="radio" name="option" value="yes" className="w-3" />
                <span className="font-semibold text-midnight text-xs">Sim</span>
              </div>
              <div className="flex items-center gap-2">
                <Input type="radio" name="option" value="no" className="w-3" />
                <span className="font-semibold text-midnight text-xs">Não</span>
              </div>
            </div>
          </div>
          <div className="border border-midnight rounded-md pl-2 pr-4 py-2">
            <p>Aparecer em destaques e divulgações</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input type="radio" name="option" value="yes" className="w-3" />
                <span className="font-semibold text-midnight text-xs">Sim</span>
              </div>
              <div className="flex items-center gap-2">
                <Input type="radio" name="option" value="no" className="w-3" />
                <span className="font-semibold text-midnight text-xs">Não</span>
              </div>
            </div>
          </div>
          <div className="border border-midnight rounded-md pl-2 pr-4 py-2">
            <div className="flex items-center gap-2">
              <p>Termos de Uso e Política de Privacidade</p>
              <IoIosInformationCircleOutline
                className="cursor-pointer text-midnight"
                size={16}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input type="radio" name="option" value="yes" className="w-3" />
                <span className="font-semibold text-midnight text-xs">Sim</span>
              </div>
              <div className="flex items-center gap-2">
                <Input type="radio" name="option" value="no" className="w-3" />
                <span className="font-semibold text-midnight text-xs">Não</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col mx-auto my-8 p-5 text-midnight rounded-lg shadow ring-[0.5px] ring-black/20 shadow-black/30">
        <h3 className="font-semibold mb-5">Experiências</h3>
        <p className="text-xs font-semibold mb-5">
          Breve histórico profissional como artesão
        </p>
        <div className="border text-xs border-midnight rounded-md max-w-[960px] min-h-48 h-fit p-3 ">
          <p>{artisan?.userName}</p>
        </div>
        <p className="my-5 text-midnight text-xs font-semibold">Midia</p>
        {/* <div className="flex gap-4">
          {artisan?.media.map((media, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={media}
                alt={`media-${index}`}
                width={180}
                height={190}
                className="rounded-md border-2 border-midnight"
              />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Page;
