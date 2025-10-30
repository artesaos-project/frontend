'use client';
import BaseSwiper from '@/components/base-swiper';
import { BaseCard, ProductCardBody } from '@/components/card';
import SectionStructure from '@/components/section-structure';
import { ApiProduct } from '@/types/product';

function NewsSection({
  products,
  loading,
}: {
  products: ApiProduct[];
  loading: boolean;
}) {
  if (!products || products.length === 0) {
    return (
      <SectionStructure title="Novidades">
        <p className="py-14 text-center bg-gray-50 border border-black/2 m-2 rounded-lg text-gray-500">
          Nenhum produto disponível no momento.
        </p>
      </SectionStructure>
    );
  }
  return (
    <SectionStructure title="Novidades">
      <BaseSwiper cards={products} loading={loading}>
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
    </SectionStructure>
  );
}

export default NewsSection;
