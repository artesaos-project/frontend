'use client';

import React, {useState} from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/header";
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import products from './components/products.json';
import ProductAuthor from './components/ProductAuthor';
import ProductReviews from './components/ProductReviews';
import { FiPlus } from 'react-icons/fi';
import {BaseCard, ProductCardBody}  from '@/components/Card';
import Image from 'next/image';

interface Review {
    reviewer: string;
    rating: number;
    reviewText: string;
    reviewImages?: string[];
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
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    
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
            reviewerImage: undefined 
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
                        <div className='flex flex-row items-center'>
                            <div className='flex items-center gap-2 px-8 py-4 text-2xl font-bold'>
                                <FiPlus/>
                                <h1>Produtos do Artista</h1>
                            </div>

                            <div className='hidden md:flex justify-end flex-1 text-xs items-center px-4'>
                                <button 
                                    onClick={() => alert('Ver mais produtos do artista!')}
                                    className="p-1.5 bg-white text-[#1B7132] border-1 border-[#ABCFB5] rounded-md hover:bg-[#ABCFB5] hover:text-white transition-colors"
                                >
                                    Ver mais
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-4 p-4">
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
                        </div>
                    </div>

                    <div>
                        <div className='flex flex-row'>
                            <div className='font-bold text-2xl items-center px-8 py-4'>
                                <h1>Produtos Relacionados</h1>
                            </div>

                            <div className='hidden md:flex justify-end flex-1 text-xs items-center px-4'>
                                <button 
                                    onClick={() => alert('Ver mais produtos do artista!')}
                                    className="p-1.5 bg-white text-[#1B7132] border-1 border-[#ABCFB5] rounded-md hover:bg-[#ABCFB5] hover:text-white transition-colors"
                                >
                                    Ver mais
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-4 p-4">
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProductPage;