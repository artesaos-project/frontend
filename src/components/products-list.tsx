'use client';
import { ApiProduct } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { BaseCard, ProductCardBody } from './card';
import { CardsListSkeleton } from './loading-state';

function ProductsList({
  products,
  loading,
}: {
  products: ApiProduct[];
  loading: boolean;
}) {
  const [visibleProducts, setVisibleProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let maxItems = products?.length;

      if (width > 1024) maxItems = 15;
      else if (width > 768) maxItems = 8;
      else if (width > 640) maxItems = 6;
      else maxItems = 4;

      setVisibleProducts(products?.slice(0, maxItems) || []);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  if (loading) {
    return <CardsListSkeleton />;
  }
  if (!products || products.length === 0) {
    return (
      <p className="py-14 text-center bg-gray-50 border border-black/2 m-2 rounded-lg text-gray-500">
        Nenhum produto disponível no momento.
      </p>
    );
  }
  return (
    <div className="items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-4 mt-4 lg:gap-y-6">
      {visibleProducts.map((product, i) => (
        <BaseCard key={i}>
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
      ))}
    </div>
  );
}
export default ProductsList;
