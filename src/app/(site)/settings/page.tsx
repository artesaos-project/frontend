import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { MdOutlineLock } from 'react-icons/md';
import { TbCancel } from 'react-icons/tb';

function Page() {
  return (
    <div className="bg-[#f3f3f3] w-full min-h-screen py-8">
      <div className="w-full max-w-2/3 mx-auto px-4">
        <div className="flex gap-3 text-midnight items-center py-8 italic">
          <ArrowLeft />
          <h2 className="font-semibold text-lg">Configurações</h2>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-lg flex flex-col gap-3 text-sm text-midnight font-semibold mb-8">
          <Link
            href={'#'}
            className="transform hover:scale-102 transition duration-200"
          >
            <div className="py-2.5 px-3.5 border flex justify-between items-center border-neutral-200 rounded-2xl">
              <div className="flex gap-2.5 items-center">
                <IoPersonCircleSharp size={20} />
                Meu perfil
              </div>
              <IoIosArrowForward size={20} />
            </div>
          </Link>
          <Link
            href={'#'}
            className="transform hover:scale-102 transition duration-200"
          >
            <div className="py-2.5 px-3.5 border flex justify-between items-center border-neutral-200 rounded-2xl">
              <div className="flex gap-2.5 items-center">
                <TbCancel size={20} />
                Inativar conta
              </div>
              <IoIosArrowForward size={20} />
            </div>
          </Link>
          <Link
            href={'#'}
            className="transform hover:scale-102 transition duration-200"
          >
            <div className="py-2.5 px-3.5 border flex justify-between items-center border-neutral-200 rounded-2xl">
              <div className="flex gap-2.5 items-center">
                <MdOutlineLock size={20} />
                Trocar senha de acesso
              </div>
              <IoIosArrowForward size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
