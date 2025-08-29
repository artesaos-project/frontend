'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Header from "@/components/header";
import Footer from "@/components/Footer";
import ProductImage from '../components/ProductImage';
import ProductInfo from '../components/ProductInfo';
import products from '../components/products.json';
import ProductAuthor from '../components/ProductAuthor';
import ProductReviews from '../components/ProductReviews';
import { FiPlus } from 'react-icons/fi';
import {BaseCard, ProductCardBody}  from '@/components/Card';
import Image from 'next/image';
import ProductSlide from '../components/ProductSlide';

interface Review {
    reviewer: string;
    rating: number;
    reviewText: string;
    reviewImages?: string[];
    reviewerImage?: string;
}

interface Product {
    id?: number;
    title: string;
    price: number;
    author: string;
    description: string;
    img: string;
    reviews?: Review[]; 
}

interface FormattedReview {
    reviewerImage?: string;
    reviewerName: string;
    rating: number;
    reviewText: string;
    reviewImages?: string[];
}

function ProductPage() {
    const params = useParams();
    const productId = params.id as string;
    
    const currentProduct: Product = products.find((product: Product) => 
        product.id?.toString() === productId
    ) || products[0];

    const productData = {
        id: currentProduct.id || 1,
        title: currentProduct.title,
        price: `R$ ${currentProduct.price.toFixed(2).replace('.', ',')}`,
        description: currentProduct.description,
        author: currentProduct.author,
        image: currentProduct.img,
    };

    const productReviews: FormattedReview[] = currentProduct.reviews ? 
        currentProduct.reviews.map(review => ({
            reviewerName: review.reviewer,
            rating: review.rating,
            reviewText: review.reviewText,
            reviewImages: review.reviewImages,
            reviewerImage: review.reviewerImage ?? "https://placehold.co/26"
        })) 
        : [];

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: productData.title,
                text: `Confira este produto: ${productData.title} por ${productData.author}`,
                url: window.location.href,
            }).catch(error => {
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
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <main className="bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex justify-center md:justify-end items-center p-4">
                            <ProductImage 
                                src={`/${productData.image}`} 
                                alt={productData.title}
                                className="aspect-rectangle max-h-96 rounded-lg"
                            />
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
                            avatar={`/${productData.image}`} 
                            followers={1000} 
                            totalProducts={5} 
                            isFollowing={false}
                            onFollow={() => alert('Seguindo!')}
                            onViewProfile={() => alert('Visualizando perfil!')}
                        />
                    </div>

                    {productReviews.length > 0 && (
                        <div>
                            <ProductReviews 
                                reviews={productReviews}
                            />
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
                            onViewMore={() => alert('Ver mais produtos do artista!')}
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
                            onViewMore={() => alert('Ver mais produtos relacionados!')}
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