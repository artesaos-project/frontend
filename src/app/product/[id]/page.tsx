'use client';

import { BaseCard, ProductCardBody } from '@/components/card';
import ProductAuthor from '@/components/features/product/product-author';
import ProductImage from '@/components/features/product/product-image';
import ProductInfo from '@/components/features/product/product-info';
import ProductReviews from '@/components/features/product/product-reviews';
import ProductSlide from '@/components/features/product/product-slide';
import { productApi } from '@/services/api';
import { ApiProduct, FormattedReview } from '@/types/product';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import { GoArrowLeft } from 'react-icons/go';

function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [artistProducts, setArtistProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingArtistProducts, setLoadingArtistProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ApiProduct[]>([]);
  const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(false);

  const fetchArtistProducts = useCallback(
    async (authorId: string) => {
      try {
        setLoadingArtistProducts(true);
        const products = await productApi.getByArtisan(authorId);
        const filteredProducts = products.filter((p) => p.id !== productId);
        setArtistProducts(filteredProducts);
      } catch (err) {
        console.error('Erro ao carregar produtos do artista:', err);
      } finally {
        setLoadingArtistProducts(false);
      }
    },
    [productId],
  );

  const fetchRelatedProducts = useCallback(async () => {
    try {
      setLoadingRelatedProducts(true);
      const allProducts = await productApi.getAll();
      setRelatedProducts(
        allProducts.filter((p) => p.id !== productId).slice(0, 12),
      );
    } catch (err) {
      console.error('Erro ao carregar produtos relacionados:', err);
    } finally {
      setLoadingRelatedProducts(false);
    }
  }, [productId]);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const productData = await productApi.getById(productId);
      setProduct(productData);

      if (productData.authorId) {
        fetchArtistProducts(productData.authorId);
      }

      fetchRelatedProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produto');
    } finally {
      setLoading(false);
    }
  }, [productId, fetchArtistProducts, fetchRelatedProducts]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  const nextImage = () => {
    if (product && product.photos.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === product.photos.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (product && product.photos.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.photos.length - 1 : prev - 1,
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && product && product.photos.length > 1) {
      nextImage();
    }
    if (isRightSwipe && product && product.photos.length > 1) {
      prevImage();
    }
  };

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

  if (loading) {
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

  const productData = {
    id: product.id,
    title: product.title,
    price: `R$ ${(product.priceInCents / 100).toFixed(2).replace('.', ',')}`,
    description: product.description,
    author: product.authorName,
    image: product.photos[currentImageIndex] || product.coverPhoto,
    photos: product.photos,
  };

  const productReviews: FormattedReview[] = [];

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: productData.title,
          text: `Confira este produto: ${productData.title} por ${productData.author}`,
          url: window.location.href,
        })
        .catch((error) => {
          console.log('Erro ao compartilhar:', error);
          navigator.clipboard.writeText(window.location.href);
          alert('Link copiado para a área de transferência!');
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.body.removeChild(textArea);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleAddToFavorites = () => {
    console.log('Adicionado aos favoritos:', productData);
    alert(`${productData.title} foi adicionado aos favoritos!`);
  };

  const handleContact = () => {
    const message = `Olá! Tenho interesse no produto: ${productData.title} (ID: ${productData.id}) por ${productData.author}. Preço: ${productData.price}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="bg-white">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-300 rounded-full ml-4 mt-2 transition-colors"
          >
            <GoArrowLeft size={30} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center md:justify-end items-center p-4">
              <div
                className="relative"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <ProductImage
                  src={productData.image}
                  alt={productData.title}
                  className="aspect-rectangle max-h-83 rounded-lg"
                />

                {product.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      <FiChevronLeft size={20} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </>
                )}

                {product.photos.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <ProductInfo
                title={productData.title}
                price={productData.price}
                description={productData.description}
                onShare={handleShare}
                onAddToFavorites={handleAddToFavorites}
                onContact={handleContact}
              />
            </div>
          </div>

          <div className="lg:px-4">
            <ProductAuthor
              name={productData.author}
              avatar={'https://placehold.co/48x48'}
              followers={1000}
              totalProducts={5}
              isFollowing={false}
              onFollow={() => alert('Seguindo!')}
              onViewProfile={handleViewArtistProfile}
            />
          </div>

          {productReviews.length > 0 && (
            <div>
              <ProductReviews reviews={productReviews} />
            </div>
          )}

          {productReviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Este produto ainda não possui avaliações.</p>
            </div>
          )}

          {product && (
            <div>
              <ProductSlide
                icon={<FiPlus className="text-2xl" />}
                title="Produtos do Artista"
                onViewMore={handleViewMoreArtistProducts}
              >
                {loadingArtistProducts
                  ? [
                      <div
                        key="loading"
                        className="flex justify-center items-center p-8"
                      >
                        <p>Carregando produtos do artista...</p>
                      </div>,
                    ]
                  : artistProducts.length > 0
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
          )}

          <div>
            <ProductSlide
              title="Produtos Relacionados"
              onViewMore={() => router.push('/')}
            >
              {loadingRelatedProducts
                ? [
                    <div
                      key="loading-related"
                      className="flex justify-center items-center pl-8"
                    >
                      <p>Carregando produtos relacionados...</p>
                    </div>,
                  ]
                : relatedProducts.length > 0
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
