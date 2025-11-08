import ProductImage from '@/components/features/product/product-image';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ProductGalleryProps {
  images: string[];
  title: string;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
  };
}

export default function ProductGallery({
  images,
  title,
  currentIndex,
  onNext,
  onPrev,
  onGoTo,
  touchHandlers,
}: ProductGalleryProps) {
  if (!images || images.length === 0) {
    return <div className="aspect-rectangle max-h-83 rounded-lg bg-gray-200" />;
  }

  const hasMultipleImages = images.length > 1;

  return (
    <div className="w-full">
      <div className="relative" {...touchHandlers}>
        <ProductImage src={images[currentIndex]} alt={title} />

        <span className="absolute bottom-2 right-2 bg-white text-black font-bold text-xs px-2 py-2 rounded-lg">
          {currentIndex + 1} / {images.length}
        </span>

        {hasMultipleImages && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              aria-label="Imagem anterior"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              aria-label="Próxima imagem"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="mt-4 flex gap-2 p-2 justify-center items-center overflow-x-auto">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => onGoTo(index)}
              className="flex rounded-md"
              aria-label={`Ver imagem ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${title} - ${index + 1}`}
                className={`h-16 w-16 md:h-20 md:w-20 object-cover rounded-md border transition
                  ${index === currentIndex ? 'ring-2 ring-black border-transparent' : 'border-gray-200 hover:border-gray-300'}`}
                width={256}
                height={160}
                quality={95}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
