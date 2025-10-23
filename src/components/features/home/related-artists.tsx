'use client';
import BaseSwiper from '@/components/base-swiper';
import { ArtisanCardBody, BaseCard } from '@/components/card';
import SectionStructure from '@/components/section-structure';
import { productApi } from '@/services/api';
import { ApiProduct } from '@/types/product';
import React, { useEffect, useState } from 'react';

function RelatedArtists() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        setProducts(res);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      }
    };

    fetchProducts();
    // setProducts(productsMock);
  }, []);

  if (products.length === 0) {
    return (
      <SectionStructure title="Artistas Relacionados">
        <p className="py-14 text-center bg-gray-50 border border-black/2 m-2 rounded-lg text-gray-500">
          Nenhum produto disponível no momento.
        </p>
      </SectionStructure>
    );
  }
  return (
    <SectionStructure title="Artistas Relacionados">
      <BaseSwiper cards={products} loading={loading}>
        {(product) => {
          if (product)
            return (
              <BaseCard>
                <div className="w-full h-34 md:h-40">
                  <img
                    src={'/banner-novidades.png'}
                    alt="Imagem do Produto"
                    className="rounded-lg object-cover h-34 md:h-40 w-full"
                  />
                </div>
                <ArtisanCardBody
                  id={1}
                  name={'joao da silva'}
                  type={'Acessórios'}
                />
              </BaseCard>
            );
        }}
      </BaseSwiper>
    </SectionStructure>
  );
}

export default RelatedArtists;
