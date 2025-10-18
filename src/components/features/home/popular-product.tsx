'use client';
import { ApiProduct } from '@/types/product';
import { useEffect, useState } from 'react';
import { BaseCard, ProductCardBody } from '../../card';
import { Button } from '../../ui/button';
import { productApi } from '@/services/api';

function PopularProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        setProducts(res);
        setIsLoading(false);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let maxItems = products.length;

      if (width > 1024) maxItems = 15;
      else if (width > 768) maxItems = 8;
      else if (width > 640) maxItems = 6;
      else maxItems = 4;

      if (products.length > 0) setVisibleProducts(products?.slice(0, maxItems));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  if (isLoading)
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight mx-auto mb-4" />
        <p className="text-midnight font-semibold">Carregando...</p>
      </div>
    );
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-3xl font-bold">Produtos Populares</h2>
        <Button className="bg-transparent text-mint-600 border-2 rounded-md px-3 border-mint-200 hover:bg-mint-200 hover:text-white transition-colors duration-300 cursor-pointerz\">
          Ver Mais
        </Button>
      </div>
      <div className="items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-4 mt-4 lg:gap-y-6">
        {visibleProducts.map((product, i) => (
          <BaseCard key={i}>
            <div className="w-full h-34 md:h-40">
              <img
                src={product.coverPhoto}
                alt="Criarte Logo"
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
    </>
  );
}

export default PopularProducts;
