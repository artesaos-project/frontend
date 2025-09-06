import React from 'react';
import { FaRegHeart, FaHeart, FaPlus } from 'react-icons/fa';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

type ṔroductCardProps = {
  id: string | number;
  price: number;
  title: string;
  author: string;
};

function BaseCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-mint-200 p-2 flex flex-col sm:max-w-40 rounded-lg lg:max-w-65">
      {children}
    </div>
  );
}

function ProductCardBody({ id, price, title, author }: ṔroductCardProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = React.useState(false);

  const handleDetailsClick = () => {
    router.push(`/product/${id}`);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <header className="flex justify-between items-center mt-2 mb-2">
        <p className="font-bold lg:text-xl md:text-lg text-mint-600 truncate">
          R$ {price}
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
      <p className="text-xs lg:text-lg truncate">{title}</p>
      <p className="text-xs lg:text-lg truncate italic font-light">{author}</p>
      <Button
        onClick={handleDetailsClick}
        className="bg-sakura cursor-pointer hover:bg-sakura/70 text-xl font-bold"
      >
        <FaPlus />
        Detalhes
      </Button>
    </>
  );
}

export { BaseCard, ProductCardBody };
