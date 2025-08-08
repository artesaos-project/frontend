import React from "react";
import products from "./artisanProductMock.json";
import { BaseCard, ProductCardBody } from "@/components/Card";
import Image from "next/image";

function ProductArtisan({ artistId, visibleCount = 25, onTotalChange }: { artistId?: string, visibleCount?: number, onTotalChange?: (total: number) => void }) {
  const filteredProducts = artistId
    ? products.filter((product) => product.authorId === artistId)
    : products;

  if (filteredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">
          Nenhum produto encontrado para este artista.
        </p>
      </div>
    );
  }

  React.useEffect(() => {
    if (onTotalChange) {
      onTotalChange(filteredProducts.length);
    }
  }, [filteredProducts.length, onTotalChange]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-center gap-4 md:w-6/12">
      {filteredProducts.slice(0, visibleCount).map((product, i) => (
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
  );
}

export default ProductArtisan;
