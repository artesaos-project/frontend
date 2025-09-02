"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import ProductImage from "../components/ProductImage";
import ProductInfo from "../components/ProductInfo";
import ProductAuthor from "../components/ProductAuthor";
import ProductReviews from "../components/ProductReviews";
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BaseCard, ProductCardBody } from "@/components/Card";
import Image from "next/image";
import ProductSlide from "../components/ProductSlide";
import { FormattedReview, ApiProduct  } from "@/types/product";
import { GoArrowLeft } from "react-icons/go";

const products = [
  {
    id: "1",
    title: "Quadro Abstrato Azul",
    price: 299.9,
    author: "Maria Silva",
    img: "bijuterias.jpg",
  },
  {
    id: "2",
    title: "Escultura Moderna",
    price: 459.9,
    author: "João Santos",
    img: "ceramica-e-porcelana.webp",
  },
  {
    id: "3",
    title: "Pintura Paisagem",
    price: 199.9,
    author: "Ana Costa",
    img: "artesanato-em-madeira.webp",
  },
  {
    id: "4",
    title: "Arte Digital",
    price: 149.9,
    author: "Pedro Lima",
    img: "ceramica-e-porcelana.webp",
  },
  {
    id: "1",
    title: "Quadro Abstrato Azul",
    price: 299.9,
    author: "Maria Silva",
    img: "bijuterias.jpg",
  },
  {
    id: "2",
    title: "Escultura Moderna",
    price: 459.9,
    author: "João Santos",
    img: "ceramica-e-porcelana.webp",
  },
  {
    id: "3",
    title: "Pintura Paisagem",
    price: 199.9,
    author: "Ana Costa",
    img: "artesanato-em-madeira.webp",
  },
  {
    id: "4",
    title: "Arte Digital",
    price: 149.9,
    author: "Pedro Lima",
    img: "ceramica-e-porcelana.webp",
  },
];

function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3333/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Produto não encontrado");
      }

      const productData: ApiProduct = await response.json();
      setProduct(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar produto");
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (product && product.photos.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === product.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.photos.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.photos.length - 1 : prev - 1
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="bg-white">
          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center">
              <p>Carregando produto...</p>
            </div>
          </div>
        </main>
        <Footer newsSubscription={true} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="bg-white">
          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center text-red-500">
              <p>{error || "Produto não encontrado"}</p>
            </div>
          </div>
        </main>
        <Footer newsSubscription={true} />
      </div>
    );
  }

  const productData = {
    id: product.id,
    title: product.title,
    price: `R$ ${(product.priceInCents / 100).toFixed(2).replace(".", ",")}`,
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
          console.log("Erro ao compartilhar:", error);
          navigator.clipboard.writeText(window.location.href);
          alert("Link copiado para a área de transferência!");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.body.removeChild(textArea);
      alert("Link copiado para a área de transferência!");
    }
  };

  const handleAddToFavorites = () => {
    console.log("Adicionado aos favoritos:", productData);
    alert(`${productData.title} foi adicionado aos favoritos!`);
  };

  const handleContact = () => {
    const message = `Olá! Tenho interesse no produto: ${productData.title} (ID: ${productData.id}) por ${productData.author}. Preço: ${productData.price}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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
                            ? "bg-white"
                            : "bg-white/50"
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
              avatar={"https://placehold.co/48x48"}
              followers={1000}
              totalProducts={5}
              isFollowing={false}
              onFollow={() => alert("Seguindo!")}
              onViewProfile={() => alert("Visualizando perfil!")}
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

          <div>
            <ProductSlide
              icon={<FiPlus className="text-2xl" />}
              title="Produtos do Artista"
              onViewMore={() => alert("Ver mais produtos do artista!")}
            >
              {products.map((product, i) => (
                <BaseCard key={product.id || i}>
                  <div className="relative w-full h-40">
                    <Image
                      src={"/" + product.img}
                      alt={product.title}
                      className="rounded-lg object-cover"
                      fill
                    />
                  </div>
                  <ProductCardBody
                    id={product.id}
                    price={product.price}
                    title={product.title}
                    author={product.author}
                  />
                </BaseCard>
              ))}
            </ProductSlide>
          </div>

          <div>
            <ProductSlide
              title="Produtos Relacionados"
              onViewMore={() => alert("Ver mais produtos relacionados!")}
            >
              {products.map((product, i) => (
                <BaseCard key={product.id || i}>
                  <div className="relative w-full h-40">
                    <Image
                      src={"/" + product.img}
                      alt={product.title}
                      className="rounded-lg object-cover"
                      fill
                    />
                  </div>
                  <ProductCardBody
                    id={product.id}
                    price={product.price}
                    title={product.title}
                    author={product.author}
                  />
                </BaseCard>
              ))}
            </ProductSlide>
          </div>
        </div>
      </main>

      <Footer newsSubscription={true} />
    </div>
  );
}

export default ProductPage;
