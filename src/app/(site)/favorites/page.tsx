'use client';

import { BaseCard, ProductCardBody } from '@/components/card';
import SearchBar from '@/components/features/artisan/search-bar';
import { useFavorites } from '@/context/favorite-context';
import { useRouter } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';

function FavoritePage() {
  const router = useRouter();
  const { favoriteProducts } = useFavorites();

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full xl:max-w-8/12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-6 ml-4 px-6">
          <div className="flex w-full flex-row items-center gap-2">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-300 rounded-full transition-colors"
            >
              <GoArrowLeft size={30} />
            </button>
            <FaHeart size={25} color="#E00061" />
            <h1 className="font-bold text-2xl text-midnight">Favoritos</h1>
            <span className="text-gray-500">({favoriteProducts.length})</span>
          </div>
          <div className="flex md:justify-end w-full">
            <SearchBar />
          </div>
        </div>

        <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6  gap-6 p-6">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
              <BaseCard key={product.id}>
                <div className="relative w-full h-34 md:h-44">
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="rounded-lg h-34 md:h-44 w-full"
                  />
                </div>
                <ProductCardBody
                  id={product.id}
                  price={product.priceInCents / 100}
                  title={product.title}
                  author={product.artisan.user.name}
                />
              </BaseCard>
            ))
          ) : (
            <div className="text-gray-500 text-center col-span-full mt-12">
              Você ainda não possui produtos favoritos.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default FavoritePage;
