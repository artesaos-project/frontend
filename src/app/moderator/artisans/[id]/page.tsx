'use client'

import ModeratorHeader from "../../components/ModeratorHeader"
import ModeratorTitle from "../../components/ModeratorTitle"
import { useParams } from 'next/navigation'
import artisans from "@/db-mock/artisans.json"
import { Button } from "@/components/ui/button"
import { FaCheck } from "react-icons/fa"
import { BsXLg } from "react-icons/bs"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoIosArrowDown } from "react-icons/io"

function Page() {
  const params = useParams();
  const artisanId = params.id as unknown as number;
  const artisan = artisans.at(artisanId - 1);

  return (
    <div className='overflow-x-hidden'>
      <ModeratorHeader />
      <ModeratorTitle title={'Artesãos'} />
      <div className="w-2/3 flex mx-auto mt-10 items-center justify-between">
        <h2 className="text-2xl text-midnight font-semibold">
          {artisan ? artisan.name : "Artesão não encontrado"}
        </h2>
        <div className="flex gap-4">
          <Button className="h-7 text-xs my-1 bg-green-600 rounded-lg cursor-pointer" aria-label="Aprovar artesão">
            <FaCheck className="text-white" />
            APROVAR
          </Button>
          <Button className="h-7 text-xs my-1 text-white font-bold border bg-red-500 rounded-lg cursor-pointer" aria-label="Desativar artesão">
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
            <Image src="https://github.com/marcus-santos.png"
              width={246}
              height={246}
              alt={"artisan-profile-photo"}
              className="rounded-md border-2 border-midnight min-w-[246px]" />
          </div>
          <div className="w-full flex flex-col gap-2 ml-5">
            <Label className="text-xs font-semibold">Nome Artístico/ Marca</Label>
            <Input value={artisan?.artistic_name} readOnly className="border border-midnight max-w-[528px] " />

            <Label className="text-xs font-semibold">Nome Completo</Label>
            <Input value={artisan?.name} readOnly className="border border-midnight max-w-[528px]" />

            <Label className="text-xs font-semibold">Email</Label>
            <Input value={artisan?.email} readOnly className="border border-midnight max-w-[528px]" />

            <Label className="text-xs font-semibold">Telefone/ Whatsapp</Label>
            <div className="flex gap-2 max-w-3xs">
              <Input value={artisan?.phone.slice(3, 5)} readOnly className="w-11 border border-midnight" />
              <Input value={artisan?.phone.slice(5, 14)} readOnly className="border border-midnight" />
            </div>
          </div>

        </div>
        <div className="flex mb-5 gap-3">
          <div>
            <Label className="text-xs font-semibold">CEP</Label>
            <Input value={artisan?.zip_code} readOnly className="border border-midnight" />
          </div>

          <div>
            <Label className="text-xs font-semibold">Estado</Label>
            <Input value={artisan?.state} readOnly className="border border-midnight" />
          </div>

          <div>
            <Label className="text-xs font-semibold">Cidade</Label>
            <Input value={artisan?.city} readOnly className="border border-midnight" />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <Label className="text-xs font-semibold">Endereço</Label>
          <Input value={artisan?.address} readOnly className="max-w-[576px] border border-midnight" />

          <Label className="text-xs font-semibold">Nome de usuário</Label>
          <Input value={artisan?.username} readOnly className=" max-w-52 border border-midnight" />
        </div>
      </div>

      <div className="w-2/3 flex flex-col h-[218px] mx-auto my-8 p-5 text-midnight rounded-lg shadow ring-[0.5px] ring-black/20 shadow-black/30">
        <h3 className="font-semibold mb-5">Dados Profissionais</h3>
        <div className="w-full flex gap-5 mb-5">
          <div className="w-full">
            <Label className="text-xs font-semibold">Tipo de Artesanato/ Arte</Label>
            <Input value={artisan?.art_type} readOnly className="max-w-[450px] border border-midnight" />
          </div>
          
          <div className="min-w-18">
            <Label className="text-xs font-semibold">MEI ou CNPJ</Label>
            <Input value={artisan?.business_type} readOnly className="max-w-24 border border-midnight"/>
            <IoIosArrowDown />
          </div>
          
          <div className="w-full">
            <Label className="text-xs font-semibold">Número</Label>
            <Input value={artisan?.registration_number} readOnly className="max-w-64 border border-midnight"/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Page