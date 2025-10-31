import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage = ({ src, alt, className = '' }: ProductImageProps) => {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        className="w-full h-83 hover:scale-105 transition-transform duration-300"
        width={256}
        height={160}
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
