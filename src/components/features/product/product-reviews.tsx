'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import { MdOutlineRateReview } from 'react-icons/md';
import Button from './button';
import { useRouter } from 'next/navigation';

interface ITotalEstrelas {
  estrelas: number;
}

interface Filtro {
  text?: string;
  estrelas: number;
  onClick: () => void;
  isActive?: boolean;
}

interface IReview {
  reviewerImage?: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  reviewImages?: string[];
}

interface ProductReviewsProps {
  reviews?: IReview[];
  productId?: string;
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
      className={`flex items-center gap-1 cursor-pointer p-1 border rounded-sm transition-colors ${isActive
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
  reviewerImage,
  reviewerName,
  rating,
  reviewText,
  reviewImages,
}: IReview) {
  const [showAllImages, setShowAllImages] = useState(false);
  const hasMoreImages = reviewImages && reviewImages.length > 3;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-col mt-2 w-10/12 rounded-lg shadow-md p-4 mb-4 bg-white">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row items-center gap-2 ">
          <img
            className="rounded-full w-12 h-12 object-cover"
            src={reviewerImage ?? 'https://placehold.co/26'}
            alt={`Imagem do usuario ${reviewerName}`}
          />
          <div className="flex flex-col gap-2 px-2 justify-center items-center">
            <h3 className="font-bold text-black">{reviewerName}</h3>
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
          </div>
        </div>
        <p className="text-gray-600 text-sm">{reviewText}</p>
      </div>

      <div className="flex w-full p-4">
        {reviewImages && reviewImages.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full">
            {reviewImages
              .slice(0, showAllImages ? reviewImages.length : 3)
              .map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-18 h-20 lg:w-30 lg:h-29 rounded-2xl object-cover"
                />
              ))}

            {!showAllImages && hasMoreImages && (
              <div className="relative w-18 h-20 lg:w-30 lg:h-29 rounded-2xl overflow-hidden">
                <img
                  src={reviewImages[3]}
                  alt="Review image 4"
                  className="w-18 h-20 lg:w-30 lg:h-29 rounded-2xl object-cover"
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
  );
}

function ProductReviews({ reviews }: ProductReviewsProps) {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string | undefined;
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const router = useRouter();

  const handleShowMore = () => {
    setReviewsToShow((prev) => prev + 3);
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
    if (!productId) return;
    router.push(`/product/${productId}/to-evaluate`);
  };

  return (
    <>
      <div className="flex flex-row w-full md:grid-cols-3 justify-center items-center gap-6 py-5 px-8 bg-[#FFFFFF] rounded-4xl shadow-lg">
        <div className="flex flex-col justify-center items-center font-bold">
          <h2 className="text-3xl">{averageRating.toFixed(1)}</h2>
          <TotalEstrelas estrelas={averageRating} />
        </div>

        <div className="flex flex-wrap lg:flex-row justify-center items-center gap-2">
          <FiltroEstrelas
            text={`Todos(${reviewsData.length})`}
            estrelas={0}
            onClick={() => handleFilterClick(0)}
            isActive={activeFilter === 0}
          />
          <FiltroEstrelas
            estrelas={5}
            onClick={() => handleFilterClick(5)}
            isActive={activeFilter === 5}
          />
          <FiltroEstrelas
            estrelas={4}
            onClick={() => handleFilterClick(4)}
            isActive={activeFilter === 4}
          />
          <FiltroEstrelas
            estrelas={3}
            onClick={() => handleFilterClick(3)}
            isActive={activeFilter === 3}
          />
          <FiltroEstrelas
            estrelas={2}
            onClick={() => handleFilterClick(2)}
            isActive={activeFilter === 2}
          />
          <FiltroEstrelas
            estrelas={1}
            onClick={() => handleFilterClick(1)}
            isActive={activeFilter === 1}
          />
        </div>
      </div>

      <div className="flex justify-center items-center w-full mt-6">
        <Button
          className="w-8/12"
          variant="outline"
          text="Avaliar Produto"
          Icon={<MdOutlineRateReview size={20} />}
          onClick={handleEvaluateClick}
        />
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center">
        {filteredReviews.slice(0, reviewsToShow).map((review, index) => (
          <CardReview
            key={index}
            reviewerImage={review.reviewerImage}
            reviewerName={review.reviewerName}
            rating={review.rating}
            reviewText={review.reviewText}
            reviewImages={review.reviewImages}
          />
        ))}

        {reviewsToShow < filteredReviews.length && (
          <button
            onClick={handleShowMore}
            className="mt-4 px-1.5 py-1 mb-2 bg-white text-[#1B7132] border-1 border-[#ABCFB5] rounded-lg hover:bg-[#ABCFB5] hover:text-white transition-colors"
          >
            Ver mais
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
