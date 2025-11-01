'use client';
import { useFavorites } from '@/context/favorite-context';
import { useFollowContext } from '@/context/follow-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaCheck, FaHeart, FaPlus, FaRegHeart } from 'react-icons/fa';
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
      <div className="flex flex-col gap-2 w-full">
        <Button
          onClick={handleDetailsClick}
          variant="secondary"
          className="p-2"
        >
          <FaPlus />
          Detalhes
        </Button>
        {isEdit && (
          <Button onClick={handleEditClick} variant="primary" className="p-2">
            Editar
            <HiOutlinePencilAlt />
          </Button>
        )}
      </div>
    </>
  );
}

function ArtisanCardBody({
  name,
  type,
  userName,
  id,
}: {
  name: string;
  type: string;
  userName: string;
  id: string;
}) {
  const { isFollowing, toggleFollow } = useFollowContext();
  const handleFollow = () => {
    toggleFollow(id);
  };

  return (
    <>
      <header className="flex justify-between items-center mt-2 mb-1">
        <p className="font-bold lg:text-xl md:text-lg text-midnight truncate">
          {name}
        </p>
        <button
          className={`cursor-pointer hover:scale-110 transition-transform duration-200 rounded-full border px-2 py-1 
            ${isFollowing(id) ? 'text-white bg-midnight border-midnight ' : 'text-midnight border-midnight '}`}
          onClick={handleFollow}
        >
          {isFollowing(id) ? <FaCheck /> : <FaPlus />}
        </button>
      </header>
      {/* por enquanto não tem utilidade para esse subtitulo de type então está hidden */}
      <p className="text-sm lg:text-lg truncate italic font-light hidden">
        {type}
      </p>
      <Link href={`/artisan/${userName}`}>
        <Button variant="secondary" className="p-2 w-full mt-2">
          Ver perfil
        </Button>
      </Link>
    </>
  );
}

export { ArtisanCardBody, BaseCard, ProductCardBody };
