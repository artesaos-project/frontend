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
        className="object-cover w-full h-83 hover:scale-105 transition-transform duration-300"
        width={800}
        height={400}
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
