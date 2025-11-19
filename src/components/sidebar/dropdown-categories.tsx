import { SheetClose } from '@/components/ui/sheet';
import { productApi } from '@/services/api';
import { CategoryProps } from '@/types/category';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { MdOutlineShoppingBag } from 'react-icons/md';

export function DropdownCategories() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await productApi.getCatalogs();
        setCategories(response.items);
      } catch (error: unknown) {
        console.error('Erro ao buscar categorias', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer mb-5 bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center"
      >
        <MdOutlineShoppingBag color="#ff8c94" size={30} />
        <p className="text-midnight font-bold text-lg sm:text-2xl ml-6 mr-auto">
          Produtos
        </p>
        {isOpen ? (
          <IoChevronUpOutline size={25} />
        ) : (
          <IoChevronDownOutline size={25} />
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col animate-slide-in-bottom animate-duration-300 animate-ease-in-out gap-2">
          {categories.map((category, index) => (
            <SheetClose asChild key={category.id || index}>
              <Link
                href={'/category/' + category.id}
                className="w-full bg-white shadow-md shadow-black/40 rounded-lg p-2 text-midnight font-semibold cursor-pointer"
              >
                {category.nameExhibit}
              </Link>
            </SheetClose>
          ))}
        </div>
      )}
    </div>
  );
}
