'use client';
import BaseSwiper from '@/components/base-swiper';
import { BaseCard, ProductCardBody } from '@/components/card';
import BannerNovidades from '@/components/features/home/banner-novidades';
import CategoriesSlider from '@/components/features/home/categories-slider';
import ProductsList from '@/components/products-list';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 13,
    title: 'Taça de Vidro Soprado',
    priceInCents: 70.0,
    authorName: 'Bruna Almeida',
    description:
      'Taça artesanal feita com técnica de sopro em vidro reciclado.',
    coverPhoto: 'bijuterias.jpg',
  },
  {
    id: 13,
    title: 'Taça de Vidro Soprado',
    priceInCents: 70.0,
    authorName: 'Bruna Almeida',
    description:
      'Taça artesanal feita com técnica de sopro em vidro reciclado.',
    coverPhoto: 'bijuterias.jpg',
  },
  {
    id: 14,
    title: 'Necessaire de Tecido Reutilizado',
    priceInCents: 38.0,
    authorName: 'Gabriel Torres',
    description:
      'Necessaire feita com sobras de tecido estampado e zíper reforçado.',
    coverPhoto: 'artesanato-em-madeira.webp',
  },
  {
    id: 13,
    title: 'Taça de Vidro Soprado',
    priceInCents: 70.0,
    authorName: 'Bruna Almeida',
    description:
      'Taça artesanal feita com técnica de sopro em vidro reciclado.',
    coverPhoto: 'bijuterias.jpg',
  },
  {
    id: 14,
    title: 'Necessaire de Tecido Reutilizado',
    priceInCents: 38.0,
    authorName: 'Gabriel Torres',
    description:
      'Necessaire feita com sobras de tecido estampado e zíper reforçado.',
    coverPhoto: 'artesanato-em-madeira.webp',
  },
  {
    id: 13,
    title: 'Taça de Vidro Soprado',
    priceInCents: 70.0,
    authorName: 'Bruna Almeida',
    description:
      'Taça artesanal feita com técnica de sopro em vidro reciclado.',
    coverPhoto: 'bijuterias.jpg',
  },
  {
    id: 14,
    title: 'Necessaire de Tecido Reutilizado',
    priceInCents: 38.0,
    authorName: 'Gabriel Torres',
    description:
      'Necessaire feita com sobras de tecido estampado e zíper reforçado.',
    coverPhoto: 'artesanato-em-madeira.webp',
  },
];

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden items-center justify-items-center min-h-screen sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
      <h2 className="text-2xl sm:text-3xl text-center font-bold mb-3">
        O que você procura?
      </h2>
      <CategoriesSlider />
      <div className="w-full">
        <BannerNovidades />
      </div>
      <div className="flex flex-col w-full px-4 mt-7">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-3xl font-bold">Produtos Populares</h2>
          <Button className="bg-transparent text-mint-600 border-2 rounded-md px-3 border-mint-200 hover:bg-mint-200 hover:text-white transition-colors duration-300 cursor-pointerz\">
            Ver Mais
          </Button>
        </div>
        <ProductsList />

        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl sm:text-3xl font-bold">Novidades</h2>
          <Button className="bg-transparent text-mint-600 border-2 rounded-md px-3 border-mint-200 hover:bg-mint-200 hover:text-white transition-colors duration-300 cursor-pointerz\">
            Ver Mais
          </Button>
        </div>
        <BaseSwiper cards={products} loading={false}>
          {(product) => {
            return (
              <BaseCard>
                <div className="w-full h-34 md:h-40">
                  <img
                    src={product.coverPhoto}
                    alt="Imagem do Produto"
                    className="rounded-lg object-cover h-34 md:h-40 w-full"
                  />
                </div>
                <ProductCardBody
                  id={product.id}
                  price={product.priceInCents / 100}
                  title={product.title}
                  author={product.authorName}
                />
              </BaseCard>
            );
          }}
        </BaseSwiper>
      </div>
    </main>
  );
}
