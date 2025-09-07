import React from 'react';
import ModeratorHeader from '../../../components/features/moderator/ModeratorHeader';
import ModeratorTitle from '../../../components/features/moderator/ModeratorTitle';
import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { IoFilter } from 'react-icons/io5';
import Link from 'next/link';

function page() {
  return (
    <>
      <ModeratorHeader />
      <ModeratorTitle title={'Documentação'} />
      <div className="w-2/3 m-auto">
        <div className="my-15 gap-8 flex items-center">
          <div className="relative w-5/6 border-midnight border-[1px] rounded-md">
            <IoIosSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight"
              size={22}
            />
            <Input
              className="pl-10 py-5 placeholder:text-midnight text-midnight"
              type="search"
              placeholder="Pesquisar..."
            />
          </div>
          <Button variant="ghost">
            <IoFilter className="text-midnight" />
          </Button>
        </div>
        <div className="flex flex-col gap-8 underline underline-offset-2 text-salmon font-semibold">
          <Link href={''}>Política de Privacidade</Link>
          <Link href={''}>Termos de Uso</Link>
        </div>
      </div>
    </>
  );
}

export default page;
