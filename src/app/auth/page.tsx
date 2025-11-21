'use client';

import useStoreUser from '@/hooks/use-store-user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

function Page() {
  const router = useRouter();
  const { user } = useStoreUser();

  useEffect(() => {
    if (user.isAuthenticated) {
      router.push('/');
    }
  }, [user.isAuthenticated, router]);
  return (
    <div className="p-12.5 h-screen w-full flex flex-col bg-[url('/fundo-cadastro-login.svg')] justify-center items-center">
      <div className="max-w-2xl w-full h-full md:max-h-fit md:ring-1 ring-neutral-200 rounded-3xl md:px-25 md:py-25">
        <div className="mb-30 md:mb-2.5">
          <Link href={'/'} className="w-6 flex ml-auto">
            <FiX size={24} />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-7.5 mb-7.5">
          <Image
            src={'./horizontal-logo.svg'}
            alt={'system-logo'}
            width={150}
            height={75}
          />
          <h1 className="font-bold text-midnight text-5xl">Olá!</h1>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Link
            href={'/auth/login'}
            className={`max-w-2xs w-full text-center rounded-2xl py-3.5 cursor-pointer bg-sakura text-white
              hover:bg-white hover:border border hover:border-sakura hover:text-sakura transition`}
          >
            Já possuo cadastro
          </Link>
          <Link
            href={'/auth/register'}
            className={`max-w-2xs w-full text-center rounded-2xl py-3.5 cursor-pointer bg-olivine-600 text-white
              hover:bg-white hover:border border hover:border-olivine-600 hover:text-olivine-600 transition`}
          >
            Quero me cadastrar
          </Link>
          <Link
            href={'/'}
            className="underline text-sm font-light hover:text-sakura mt-4"
          >
            Continuar sem login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
