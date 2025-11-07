'use client';

import { BaseCard, ProductCardBody } from '@/components/card';
import ProductAuthor from '@/components/features/product/product-author';
import ProductGallery from '@/components/features/product/product-gallery';
import ProductInfo from '@/components/features/product/product-info';
import ProductReviews from '@/components/features/product/product-reviews';
import { ProductPageSkeleton } from '@/components/features/product/product-skeleton';
import ProductSlide from '@/components/features/product/product-slide';
import { useFavorites } from '@/context/favorite-context';
import { useCarousel } from '@/hooks/use-carousel';
import { useProductData } from '@/hooks/use-product-data';
import { useProductReviews } from '@/hooks/use-product-review';
import handleContact from '@/lib/utils/contact-utils';
import { handleShare } from '@/lib/utils/share-utils';
import Image from 'next/image';
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
  const { reviews } = useProductReviews(productId);
  console.log(reviews);

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
    handleContact({
      contactInfo: product.authorPhoneNumber || '',
      productId: product.id,
      productTitle: product.title,
      productAuthor: product.authorName,
      priceInCents: product.priceInCents,
    });
  };

  const onAddToFavorites = () => {
    if (!product) return;
    toggleFavorite(product.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="bg-white">
          <ProductPageSkeleton />
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
            {artistProducts.length > 0 ? (
              <ProductSlide
                icon={<FiPlus className="text-2xl" />}
                title="Produtos do Artista"
                onViewMore={handleViewMoreArtistProducts}
              >
                {artistProducts.slice(0, 12).map((artistProduct) => (
                  <BaseCard key={artistProduct.id}>
                    <div className="relative w-full h-34 md:h-44">
                      <Image
                        src={artistProduct.coverPhoto}
                        alt={artistProduct.title}
                        className="object-fill rounded-lg w-full h-34 md:h-44"
                        width={800}
                        height={400}
                      />
                    </div>
                    <ProductCardBody
                      id={artistProduct.id}
                      price={artistProduct.priceInCents / 100}
                      title={artistProduct.title}
                      author={artistProduct.authorName}
                    />
                  </BaseCard>
                ))}
              </ProductSlide>
            ) : (
              <div className="mt-8 p-4">
                <p className="text-2xl font-bold mb-4">Produtos do Artista</p>
                <p className="py-14 text-center bg-gray-50 border border-black/2 m-2 rounded-lg text-gray-500">
                  Nenhum outro produto do artista encontrado.
                </p>
              </div>
            )}
          </div>

          <div>
            {relatedProducts.length > 0 ? (
              <ProductSlide
                title="Produtos Relacionados"
                onViewMore={() => router.push('/')}
              >
                {relatedProducts.map((relatedProduct) => (
                  <BaseCard key={relatedProduct.id}>
                    <div className="relative w-full h-34 md:h-44">
                      <Image
                        src={relatedProduct.coverPhoto}
                        alt={relatedProduct.title}
                        className="object-fill rounded-lg w-full h-34 md:h-44"
                        width={800}
                        height={400}
                      />
                    </div>
                    <ProductCardBody
                      id={relatedProduct.id}
                      price={relatedProduct.priceInCents / 100}
                      title={relatedProduct.title}
                      author={relatedProduct.authorName}
                    />
                  </BaseCard>
                ))}
              </ProductSlide>
            ) : (
              <div className="mt-8 p-4">
                <p className="text-2xl font-bold mb-4">Produtos Relacionados</p>
                <p className="py-14 text-center bg-gray-50 border border-black/2 m-2 rounded-lg text-gray-500">
                  Nenhum produto relacionado encontrado.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
