'use client';

import { Button } from '@/components/ui/button';
import { useProductReviews } from '@/hooks/use-product-review';
import { Review } from '@/types/review';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import { MdOutlineRateReview } from 'react-icons/md';

interface ITotalEstrelas {
  estrelas: number;
}

interface Filtro {
  text?: string;
  estrelas: number;
  onClick: () => void;
  isActive?: boolean;
}

function TotalEstrelas({ estrelas }: ITotalEstrelas) {
  const fullStars = Math.floor(estrelas);
  const hasHalfStar = estrelas % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex">
      {Array.from({ length: fullStars }, (_, index) => (
        <IoMdStar key={`full-${index}`} className="text-yellow-400" />
      ))}
      {hasHalfStar && <IoMdStarHalf key="half" className="text-yellow-400" />}
      {Array.from({ length: emptyStars }, (_, index) => (
        <IoMdStarOutline key={`empty-${index}`} className="text-yellow-400" />
      ))}
    </div>
  );
}

function FiltroEstrelas({ estrelas, onClick, text, isActive }: Filtro) {
  return (
    <button
      className={`flex items-center gap-1 cursor-pointer p-1 border rounded-sm transition-colors ${
        isActive
          ? 'bg-[#82BC92] text-white border-[#82BC92]'
          : 'border-[#82BC92] hover:bg-[#82BC92] hover:text-white'
      }`}
      onClick={onClick}
    >
      {text && <span className="text-xs font-bold">{text}</span>}
      {!text && <span className="text-xs font-bold">{estrelas}.0</span>}
      {!text && (
        <div className="flex">
          {Array.from({ length: estrelas }, (_, index) => (
            <IoMdStar key={`filter-${index}`} className="text-yellow-400" />
          ))}
        </div>
      )}
    </button>
  );
}

function CardReview({
  rating,
  comment,
  user: { name, avatar },
  images: reviewImages,
}: Review) {
  const [showAllImages, setShowAllImages] = useState(false);

  const hasMoreImages = reviewImages.length > 3;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-col mt-2 w-10/12 rounded-lg shadow-md p-4 mb-4 bg-white">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row items-start">
          <Image
            className="rounded-full h-15 w-15 object-cover mx-2"
            src={avatar || '/default-avatar.webp'}
            alt={`Imagem do usuario ${name}`}
            width={58}
            height={58}
          />
          <div className="flex flex-col gap-2 px-2 justify-center">
            <h3 className="font-bold text-black">{name}</h3>
            <div className="flex">
              {Array.from({ length: fullStars }, (_, index) => (
                <IoMdStar
                  key={`full-${index}`}
                  className="text-[#FFBB00]"
                  size={20}
                />
              ))}
              {hasHalfStar && (
                <IoMdStarHalf key="half" className="text-[#FFBB00]" size={20} />
              )}
              {Array.from({ length: emptyStars }, (_, index) => (
                <IoMdStarOutline
                  key={`empty-${index}`}
                  className="text-[#FFBB00]"
                  size={20}
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-2 mb-2">{comment}</p>
            <div className="flex w-full">
              {reviewImages.length > 0 && (
                <div className="flex flex-wrap gap-2 w-full">
                  {reviewImages
                    .slice(0, showAllImages ? reviewImages.length : 3)
                    .map((url, index) => (
                      <Image
                        key={index}
                        src={url}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 lg:w-32 lg:h-32 rounded-2xl object-cover"
                        height={400}
                        width={400}
                      />
                    ))}

                  {!showAllImages && hasMoreImages && reviewImages[3] && (
                    <div className="relative w-20 h-20 lg:w-32 lg:h-32 rounded-2xl overflow-hidden">
                      <Image
                        src={reviewImages[3]}
                        alt="Review image 4"
                        className="w-20 h-20 lg:w-32 lg:h-32 rounded-2xl object-cover"
                        height={400}
                        width={400}
                      />
                      <button
                        onClick={() => setShowAllImages(true)}
                        className="absolute inset-0 flex items-center justify-center backdrop-blur-sm transition-all"
                      >
                        <div className="text-center text-white">
                          <FiPlus className="text-xl" />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductReviews() {
  const router = useRouter();
  const params = useParams();
  const Id = params?.id as string;
  const { reviews } = useProductReviews(Id);

  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [activeFilter, setActiveFilter] = useState<number>(0);

  const handleShowMore = () => {
    setReviewsToShow((prev) => prev + 3);
  };
  const handleShowLess = () => {
    setReviewsToShow(3);
  };

  const reviewsData = reviews || [];

  const isEmpty = reviewsData.length === 0;

  const averageRating =
    reviewsData.length > 0
      ? reviewsData.reduce((sum, review) => sum + review.rating, 0) /
        reviewsData.length
      : 0;

  const getFilteredReviews = (rating: number) => {
    if (rating === 0) return reviewsData;
    return reviewsData.filter((review) => Math.floor(review.rating) === rating);
  };

  const filteredReviews = getFilteredReviews(activeFilter);

  const handleFilterClick = (rating: number) => {
    setActiveFilter(rating);
    setReviewsToShow(3);
  };

  const handleEvaluateClick = () => {
    router.push(`/product/${Id}/to-evaluate`);
  };

  const filtros = [
    { estrelas: 0, text: `Todos(${reviewsData.length})` },
    { estrelas: 5 },
    { estrelas: 4 },
    { estrelas: 3 },
    { estrelas: 2 },
    { estrelas: 1 },
  ];

  return (
    <>
      <div className="flex flex-row w-full md:grid-cols-3 justify-center items-center gap-6 py-5 px-8 bg-[#FFFFFF] rounded-3xl shadow-lg">
        <div className="flex flex-col justify-center items-center font-bold">
          <h2 className="text-3xl">{averageRating.toFixed(1)}</h2>
          <TotalEstrelas estrelas={averageRating} />
        </div>

        <div className="flex flex-wrap lg:flex-row justify-center items-center gap-2">
          {filtros.map(({ estrelas, text }) => (
            <FiltroEstrelas
              key={text ?? estrelas}
              text={text}
              estrelas={estrelas}
              onClick={() => handleFilterClick(estrelas)}
              isActive={activeFilter === estrelas}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center w-full mt-6">
        <Button
          className="w-8/12"
          variant="olivineOutline"
          onClick={handleEvaluateClick}
        >
          <MdOutlineRateReview size={20} />
          Avaliar Produto
        </Button>
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center">
        {filteredReviews.slice(0, reviewsToShow).map((review, index) => (
          <CardReview key={index} {...review} />
        ))}

        {reviewsToShow < filteredReviews.length && (
          <button
            onClick={handleShowMore}
            className="mt-4 px-1.5 py-1 mb-2 bg-white text-[#1B7132] border border-[#ABCFB5] rounded-2xl hover:bg-[#ABCFB5] hover:text-white transition-colors cursor-pointer"
          >
            Ver mais
          </button>
        )}
        {filteredReviews.length > 3 && (
          <button
            onClick={handleShowLess}
            className="px-1.5 py-1 mb-4 bg-white text-[#1B7132] border border-[#ABCFB5] rounded-2xl hover:bg-[#ABCFB5] hover:text-white transition-colors cursor-pointer"
          >
            Ver menos
          </button>
        )}

        {isEmpty ? (
          <div className="text-center text-gray-500 py-8">
            Este produto ainda não possui avaliações.
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Nenhuma avaliação encontrada para este filtro.
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ProductReviews;
