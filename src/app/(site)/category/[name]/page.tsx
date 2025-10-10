'use client';
import { Input } from '@/components/ui/input';
import categories from '@/db-mock/categories.json';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoClose, IoSwapVerticalOutline } from 'react-icons/io5';
import { LuListFilter } from 'react-icons/lu';

function Page() {
  const params = useParams();
  const rawName = params.name;
  const [action, setAction] = useState<'FILTER' | 'SORT' | 'NONE'>('NONE');
  const name = decodeURIComponent(rawName);
  return (
    <main className="flex flex-col overflow-x-hidden items-center justify-items-center min-h-screen px-6 sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
      <h1 className="text-xl text-sakura font-bold mb-8">{name}</h1>
      <SearchInput />
      <div className="w-full mt-4 flex gap-4">
        <FilterButton action={action} setAction={setAction} />
        <SortButton action={action} setAction={setAction} />
      </div>
    </main>
  );
}

function SearchInput() {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Pesquisar produto"
        className="pl-8 py-5 text-sm border-gray-400 focus-visible:border-gray-600 focus-visible:ring-0"
      />
      <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

type ButtonProps = {
  action: 'FILTER' | 'SORT' | 'NONE';
  setAction: React.Dispatch<React.SetStateAction<'FILTER' | 'SORT' | 'NONE'>>;
};

function FilterButton({ action, setAction }: ButtonProps) {
  function handleClick() {
    if (action === 'NONE') {
      setAction('FILTER');
    } else {
      setAction('NONE');
    }
  }
  return (
    <button
      onClick={handleClick}
      className="bg-green-600 flex items-center w-full transition-all duration-400 ease-in-out justify-center py-2 px-4 text-white rounded-lg font-semibold text-sm cursor-pointer"
    >
      <LuListFilter className="mr-4" color={'white'} size={24} /> Filtrar{' '}
      {action === 'FILTER' && <IoClose className="ml-auto" size={24} />}
    </button>
  );
}

function SortButton({ action, setAction }: ButtonProps) {
  function handleClick() {
    if (action === 'NONE') {
      setAction('SORT');
    } else {
      setAction('NONE');
    }
  }
  useEffect(()=>{
    if(action === 'FILTER'){
    }
  }, [action])
  return (
    <button
      onClick={handleClick}
      className="bg-midnight flex items-center w-full transition-all duration-400 ease-in-out justify-center py-2 px-4 text-white rounded-lg font-semibold text-sm cursor-pointer"
    >
      <IoSwapVerticalOutline className="mr-4" color={'white'} size={24} />{' '}
      Ordenar 
      {action === 'SORT' && <IoClose className="ml-auto" size={24} />}
    </button>
  );
}

export default Page;
