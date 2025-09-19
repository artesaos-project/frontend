'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronLeft } from 'react-icons/fi';

function ModeratorHeader() {
  const pathName = usePathname();
  return (
    <>
      <header className="invisible w-screen flex justify-center bg-midnight lg:visible">
        <nav className="pb-11 pt-17 flex gap-10 text-white font-semibold">
          <Button
            asChild
            className="text-sm py-7 md:w-30 xl:w-40 bg-black/30 rounded-xl hover:bg-baby-blue/80 cursor-pointer"
          >
            <Link href="/">
              <FiChevronLeft />
              VOLTAR
            </Link>
          </Button>
          <Button
            asChild
            className={`${pathName.endsWith('/moderator') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40 hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator">INÍCIO</Link>
          </Button>
          <Button
            asChild
            variant={'ghost'}
            className={`${pathName.endsWith('/artisans') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40 hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator/artisans">ARTESÃOS</Link>
          </Button>
          <Button
            asChild
            variant={'ghost'}
            className={`${pathName.endsWith('/events') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40 hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator/events">EVENTOS</Link>
          </Button>
          <Button
            asChild
            variant={'ghost'}
            className={`${pathName.endsWith('/reports') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40  hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator/reports">DENUNCIAS</Link>
          </Button>
          <Button
            asChild
            variant={'ghost'}
            className={`${pathName.endsWith('/documents') ? 'bg-baby-blue text-midnight drop-shadow-sm shadow-black/15' : 'bg-midnight text-white'} text-sm py-7 md:w-30 xl:w-40  hover:bg-baby-blue/80 rounded-xl cursor-pointer`}
          >
            <Link href="/moderator/documents">DOCUMENTAÇÃO</Link>
          </Button>
        </nav>
      </header>
      <div className="w-screen lg:hidden absolute top-0">
        <Header />
      </div>
    </>
  );
}

export default ModeratorHeader;
