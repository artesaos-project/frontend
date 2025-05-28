'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/header";
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import products from './components/products.json';
import ProductAuthor from './components/ProductAuthor';

interface Product {
    id?: number;
    title: string;
    price: number;
    author: string;
    description: string;
    img: string;
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
        image: currentProduct.img
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: productData.title,
                text: `Confira este produto: ${productData.title} por ${productData.author}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
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
                                className="aspect-retangle max-h-96"
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

                    <div>
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
                </div>
            </main>
        </div>
    );
}

export default ProductPage;