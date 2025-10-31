'use client';

import { BaseCard, ProductCardBody } from '@/components/card';
import ProductAuthor from '@/components/features/product/product-author';
import ProductGallery from '@/components/features/product/product-gallery';
import ProductInfo from '@/components/features/product/product-info';
import ProductReviews from '@/components/features/product/product-reviews';
import ProductSlide from '@/components/features/product/product-slide';
import { useFavorites } from '@/context/favorite-context';
import { useCarousel } from '@/hooks/use-carousel';
import { useProductData } from '@/hooks/use-product-data';
import { handleShare } from '@/lib/utils/share-utils';
import { useParams, useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import { GoArrowLeft } from 'react-icons/go';

function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { toggleFavorite, isFavorite } = useFavorites();

  const { product, artistProducts, relatedProducts, isLoading, error } =
    useProductData(productId);

  const imagesCount = product
    ? product.photos.length > 0
      ? product.photos.length
      : 1
    : 0;
  const carousel = useCarousel(imagesCount);

  const handleViewArtistProfile = () => {
    if (product?.authorUserName) {
      router.push(`/artisan/${product.authorUserName}`);
    }
  };

  const handleViewMoreArtistProducts = () => {
    if (product?.authorUserName) {
      router.push(`/artisan/${product.authorUserName}`);
    }
  };

  const onShare = () => {
    if (!product) return;
    handleShare(
      product.title,
      `Confira este produto: ${product.title} por ${product.authorName}`,
    );
  };

  const onContact = () => {
    if (!product) return;
    const message = `Olá! Tenho interesse no produto: ${product.title} (ID: ${product.id}) por ${product.authorName}. Preço: ${product.priceInCents / 100}`;
    const whatsappUrl = `https://wa.me/+5512999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const onAddToFavorites = () => {
    if (!product) return;
    toggleFavorite(product.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="bg-white">
          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center">
              <p>Carregando produto...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="bg-white">
          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center text-red-500">
              <p>{error || 'Produto não encontrado'}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const productReviews: [] = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="bg-white">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-300 rounded-full ml-4 mt-6 transition-colors"
          >
            <GoArrowLeft size={30} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-4">
            <div className="flex justify-center items-center p-4 md:pl-10">
              <ProductGallery
                images={
                  product.photos.length > 0
                    ? product.photos
                    : [product.coverPhoto]
                }
                title={product.title}
                currentIndex={carousel.currentIndex}
                onNext={carousel.next}
                onPrev={carousel.prev}
                onGoTo={carousel.goTo}
                touchHandlers={carousel.touchHandlers}
              />
            </div>

            <div className="flex flex-col mt-5">
              <ProductInfo
                productId={product.id}
                title={product.title}
                price={new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.priceInCents / 100)}
                description={product.description}
                onShare={onShare}
                onAddToFavorites={onAddToFavorites}
                onContact={onContact}
                isFavorited={isFavorite(product.id)}
              />
            </div>
          </div>

          <div className="relative bg-baby-blue rounded-4xl">
            <div>
              <ProductAuthor
                name={product.authorName}
                authorUserName={product.authorUserName}
                avatar={product.authorAvatarUrl || 'https://placehold.co/48x48'}
                followers={product.authorFollowersCount || 0}
                totalProducts={product.authorProductsCount || 0}
                authorId={product.authorId}
                onViewProfile={handleViewArtistProfile}
              />
            </div>

            {productReviews && (
              <div className="bg-white md:rounded-4xl">
                <ProductReviews
                  reviews={productReviews}
                  productId={productId}
                />
              </div>
            )}
          </div>

          <div>
            <ProductSlide
              icon={<FiPlus className="text-2xl" />}
              title="Produtos do Artista"
              onViewMore={handleViewMoreArtistProducts}
            >
              {artistProducts.length > 0
                ? artistProducts.slice(0, 12).map((artistProduct) => (
                    <BaseCard key={artistProduct.id}>
                      <div className="relative w-full h-34 md:h-44">
                        <img
                          src={artistProduct.coverPhoto}
                          alt={artistProduct.title}
                          className="rounded-lg w-full h-34 md:h-44"
                        />
                      </div>
                      <ProductCardBody
                        id={artistProduct.id}
                        price={artistProduct.priceInCents / 100}
                        title={artistProduct.title}
                        author={artistProduct.authorName}
                      />
                    </BaseCard>
                  ))
                : [
                    <div
                      key="no-artist-products"
                      className="flex justify-center items-center p-8 col-auto-span-full"
                    >
                      <p>Este artista ainda não possui outros produtos.</p>
                    </div>,
                  ]}
            </ProductSlide>
          </div>

          <div>
            <ProductSlide
              title="Produtos Relacionados"
              onViewMore={() => router.push('/')}
            >
              {relatedProducts.length > 0
                ? relatedProducts.map((relatedProduct) => (
                    <BaseCard key={relatedProduct.id}>
                      <div className="relative w-full h-34 md:h-44">
                        <img
                          src={relatedProduct.coverPhoto}
                          alt={relatedProduct.title}
                          className="rounded-lg h-34 md:h-44 w-full"
                        />
                      </div>
                      <ProductCardBody
                        id={relatedProduct.id}
                        price={relatedProduct.priceInCents / 100}
                        title={relatedProduct.title}
                        author={relatedProduct.authorName}
                      />
                    </BaseCard>
                  ))
                : [
                    <div
                      key="no-related-products"
                      className="flex justify-center items-center pl-8"
                    >
                      <p>Nenhum produto relacionado encontrado.</p>
                    </div>,
                  ]}
            </ProductSlide>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
