"use client";
import React from "react";
import { Button } from "./ui/button";
import { BaseCard, ProductCardBody } from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";

type Product = {
  id: number;
  title: string;
  author: string;
  price: number;
  img: string;
}


function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
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

      setVisibleProducts(products.slice(0, maxItems));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

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
            <div className="relative w-full h-34 md:h-40">
              <Image
                src={"/" + product.img}
                alt="Criarte Logo"
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
      </div>
    </>
  );
}

export default PopularProducts;
