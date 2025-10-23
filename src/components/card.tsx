'use client';
import { useFavorites } from '@/context/favorite-context';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaHeart, FaPlus, FaRegHeart } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from './ui/button';

type ProductCardProps = {
  id: string | number;
  price: number;
  title: string;
  author: string;
  isEdit?: boolean;
};

function BaseCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-mint-200 p-2 flex flex-col sm:max-w-40 rounded-lg lg:max-w-65 h-full">
      {children}
    </div>
  );
}

function ProductCardBody({
  id,
  price,
  title,
  author,
  isEdit,
}: ProductCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFavorited = isFavorite(String(id));

  const handleDetailsClick = () => {
    router.push(`/product/${id}`);
  };

  const handleEditClick = () => {
    router.push(`/artisan/edit-product/${id}`);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(String(id));
  };

  return (
    <>
      <header className="flex justify-between items-center mt-2 mb-1">
        <p className="font-bold lg:text-xl md:text-lg text-mint-600 truncate">
          {Number(price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        <button
          onClick={handleFavoriteClick}
          className="cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          {isFavorited ? (
            <FaHeart size={25} color="#E00061" />
          ) : (
            <FaRegHeart size={25} color="#E00061" />
          )}
        </button>
      </header>
      <p className="text-sm lg:text-lg truncate">{title}</p>
      <p className="text-sm lg:text-lg truncate italic font-light">{author}</p>
      <Button
        onClick={handleDetailsClick}
        className="bg-sakura cursor-pointer hover:bg-sakura/70 text-xl font-bold mt-auto"
      >
        <FaPlus />
        Detalhes
      </Button>
      {isEdit && (
        <Button
          onClick={handleEditClick}
          className="bg-olivine-600 cursor-pointer hover:bg-olivine-600/70 text-xl font-bold mt-1"
        >
          Editar
          <HiOutlinePencilAlt />
        </Button>
      )}
    </>
  );
}

export { BaseCard, ProductCardBody };
