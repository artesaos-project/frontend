'use client';
import ProductsList from '@/components/products-list';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoClose, IoSwapVerticalOutline } from 'react-icons/io5';
import { LuListFilter } from 'react-icons/lu';

type CategoryProps = {
  id: number;
  nameFilter: string;
  nameExhibit: string;
  createdAt: string;
  description: string;
  isActive: true;
  updatedAt: string;
};

function Page() {
  const [category, setCategory] = useState<CategoryProps>({} as CategoryProps);
  const params = useParams();
  const nameFilter = params.name as string;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/materials`,
        );
        const data = await response.json();
        console.log(data);
        const cat = data.items.find(
          (c: CategoryProps) => c.nameFilter === nameFilter.toUpperCase(),
        );
        setCategory(cat);
      } catch (err: unknown) {
        if (err instanceof Error)
          console.log('Erro ao buscar categorias', err.message);
      }
    }
    fetchCategories();
  }, [nameFilter]);
  const [action, setAction] = useState<'FILTER' | 'SORT' | 'NONE'>('NONE');
  const [sortSelection, setSortSelection] = useState<
    'LATEST' | 'OLDEST' | 'LOWEST' | 'HIGHEST'
  >('LATEST');
  const [controlsGap, setControlsGap] = useState(16);
  useEffect(() => {
    if (action !== 'NONE') {
      setControlsGap(0);
    } else {
      setControlsGap(16);
    }
  }, [action]);
  return (
    <main className="flex flex-col overflow-x-hidden justify-items-center min-h-screen px-6 sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
      <h1 className="text-xl text-sakura font-bold mb-8 text-center">
        {category.nameExhibit}
      </h1>
      <SearchInput />
      <div
        style={{ gap: controlsGap }}
        className="w-full mt-4 flex transition-all duration-200"
      >
        <ControlButton
          action={action}
          setAction={setAction}
          type="FILTER"
          text="Filtrar"
        />
        <ControlButton
          action={action}
          setAction={setAction}
          type="SORT"
          text="Ordenar"
        />
      </div>
      {action === 'FILTER' && <FilterModal />}
      {action === 'SORT' && (
        <SortModal
          sortSelection={sortSelection}
          setSortSelection={setSortSelection}
        />
      )}
      <ProductsList />
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

type ControlButtonProps = {
  action: 'FILTER' | 'SORT' | 'NONE';
  setAction: React.Dispatch<React.SetStateAction<'FILTER' | 'SORT' | 'NONE'>>;
  type: 'FILTER' | 'SORT';
  text: string;
};

function ControlButton({ action, setAction, type, text }: ControlButtonProps) {
  const [width, setWidth] = useState('100%');
  const [padding, setPadding] = useState('8px 16px');
  const [textDisplay, setTextDisplay] = useState('block');
  const background = type === 'FILTER' ? 'green-600' : 'midnight';
  function handleClick() {
    if (action === 'NONE') {
      setAction(type);
    } else {
      setAction('NONE');
    }
  }
  useEffect(() => {
    if (action !== type && action !== 'NONE') {
      setWidth('0');
      setTextDisplay('none');
      setPadding('0px');
    } else if (action === 'NONE') {
      setWidth('100%');
      setTextDisplay('block');
      setPadding('8px 16px');
    }
  }, [action, type]);
  return (
    <button
      onClick={handleClick}
      style={{ width, padding }}
      className={`bg-${background} flex items-center w-full transition-all duration-200 ease-in-out justify-center text-white rounded-lg font-semibold text-sm cursor-pointer`}
    >
      {type === 'SORT' ? (
        <IoSwapVerticalOutline
          style={{ display: textDisplay }}
          className="mr-4"
          color={'white'}
          size={24}
        />
      ) : (
        <LuListFilter
          style={{ display: textDisplay }}
          className="mr-4"
          color={'white'}
          size={24}
        />
      )}
      <span style={{ display: textDisplay }}>{text}</span>
      {action === type && <IoClose className="ml-auto" size={24} />}
    </button>
  );
}

function FilterModal() {
  return (
    <div className="w-full border-2 border-green-500 p-3 rounded-2xl mt-2">
      <div>
        <h3 className="mb-3">Faixa de preço</h3>
        <div className="flex items-ceter gap-2">
          <Label htmlFor="from">de R$</Label>
          <Input className="w-24" type="number" id="from" min={0} />
          <Label htmlFor="from">até R$</Label>
          <Input className="w-24" type="number" id="from" min={0} />
        </div>
      </div>
      <div>
        <h3 className="mt-4 mb-3">Disponibilidade</h3>
        <div className="flex items-center gap-3 mb-2">
          <Checkbox id="disponivel" />
          <Label htmlFor="disponivel">Disponível</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="encomenda" />
          <Label htmlFor="encomenda">Sob encomenda</Label>
        </div>
      </div>
    </div>
  );
}

type SortModalProps = {
  sortSelection: 'LATEST' | 'OLDEST' | 'LOWEST' | 'HIGHEST';
  setSortSelection: React.Dispatch<
    React.SetStateAction<'LATEST' | 'OLDEST' | 'LOWEST' | 'HIGHEST'>
  >;
};

function SortModal({ sortSelection, setSortSelection }: SortModalProps) {
  const selectedStyle = {
    background: '#1f3a4d',
    color: 'white',
  };
  function handleClick(selected: 'LATEST' | 'OLDEST' | 'LOWEST' | 'HIGHEST') {
    setSortSelection(selected);
  }

  return (
    <div className="w-full border-2 border-midnight text-midnight p-3 rounded-2xl mt-2 grid grid-cols-2 gap-4">
      <button
        style={sortSelection === 'LATEST' ? selectedStyle : {}}
        onClick={() => handleClick('LATEST')}
        className="border border-midnight p-2 rounded-xl cursor-pointer"
      >
        Mais recentes
      </button>
      <button
        style={sortSelection === 'OLDEST' ? selectedStyle : {}}
        onClick={() => handleClick('OLDEST')}
        className="border border-midnight p-2 rounded-xl cursor-pointer"
      >
        Mais antigo
      </button>
      <button
        style={sortSelection === 'LOWEST' ? selectedStyle : {}}
        onClick={() => handleClick('LOWEST')}
        className="border border-midnight p-2 rounded-xl cursor-pointer"
      >
        Menor Preço
      </button>
      <button
        style={sortSelection === 'HIGHEST' ? selectedStyle : {}}
        onClick={() => handleClick('HIGHEST')}
        className="border border-midnight p-2 rounded-xl cursor-pointer"
      >
        Maior Preço
      </button>
    </div>
  );
}

export default Page;
