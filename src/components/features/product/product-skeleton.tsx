import { Skeleton } from '@/components/ui/skeleton';
import { FiChevronLeft, FiChevronRight, FiUser } from 'react-icons/fi';
import { GoArrowLeft } from 'react-icons/go';
import { TbDotsVertical } from 'react-icons/tb';

function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="p-2 ml-4 mt-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
              <GoArrowLeft size={24} className="text-gray-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-4">
            <div className="flex justify-center items-center p-4 md:pl-10">
              <GallerySkeleton />
            </div>

            <div className="flex flex-col mt-5">
              <InfoSkeleton />
            </div>
          </div>

          <div className="relative bg-blue-50 rounded-3xl mt-10">
            <AuthorProfileSkeleton />

            <div className="bg-white md:rounded-3xl mt-6">
              <ReviewsSkeleton />
            </div>
          </div>

          <div className="mt-10">
            <SlideSkeleton withIcon showViewMoreButton itemsCount={5} />
          </div>

          <div className="mt-10 mb-16">
            <SlideSkeleton showViewMoreButton withIcon={false} itemsCount={5} />
          </div>
        </div>
      </main>
    </div>
  );
}

interface ProductSlideSkeletonProps {
  showViewMoreButton?: boolean;
  withIcon?: boolean;
  itemsCount?: number;
}

interface ProductImageSkeletonProps {
  className?: string;
}

function SlideSkeleton({
  showViewMoreButton = true,
  withIcon = true,
  itemsCount = 6,
}: ProductSlideSkeletonProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-row justify-between items-center px-8 py-4">
        <div className="flex flex-row font-bold text-2xl items-center gap-2">
          {withIcon && (
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-5 h-5 bg-gray-200 rounded" />
            </div>
          )}
          <Skeleton className="w-48 h-7 rounded-md" />
        </div>

        {showViewMoreButton && (
          <div className="hidden md:flex justify-end text-xs items-center px-4">
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        )}
      </div>

      <div className="mb-10 p-2">
        <div className="flex items-center gap-3 px-2">
          <div className="hidden md:flex">
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>

          <div className="flex gap-4 overflow-x-auto w-full px-2 no-scrollbar">
            {Array.from({ length: itemsCount }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-40">
                <Skeleton className="w-full h-40 rounded-xl" />
                <Skeleton className="mt-3 h-4 w-full rounded-md" />
                <Skeleton className="mt-2 h-3 w-2/3 rounded-md" />
              </div>
            ))}
          </div>

          <div className="hidden md:flex">
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-8 h-1.5 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="flex flex-col space-y-6 items-center justify-center py-6">
      <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6 py-6 px-8 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col justify-center items-center font-bold">
          <Skeleton className="h-10 w-16 mb-2 rounded-md" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-100 rounded" />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-7 w-20 rounded-md border border-green-200"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="flex w-8/12 justify-center items-center gap-3 p-4 border border-green-200 rounded-xl bg-white">
          <div className="w-5 h-5 bg-gray-100 rounded" />
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col mt-2 w-10/12 rounded-xl shadow-sm border border-gray-100 p-5 mb-4 bg-white"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="w-36 h-4 rounded-md" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-100 rounded" />
                  ))}
                </div>
              </div>
            </div>

            <Skeleton className="mt-4 h-16 w-full rounded-md" />

            <div className="flex gap-2 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoSkeleton() {
  return (
    <div className="mx-9 my-4 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-7 w-56 rounded-md" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>

        <div className="p-2 rounded-full border border-gray-200 bg-gray-50">
          <TbDotsVertical size={22} className="text-gray-300" />
        </div>
      </div>

      <div className="pt-2 w-full">
        <div className="flex justify-between items-center w-full border border-green-200 rounded-xl px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors">
          <Skeleton className="h-4 w-28 rounded-md" />
          <div className="w-5 h-5 bg-gray-100 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 items-center w-full">
        <div className="flex justify-between items-center border border-green-200 rounded-xl px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors">
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="w-5 h-5 bg-gray-100 rounded" />
        </div>

        <div className="flex justify-between items-center border border-green-200 rounded-xl px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors">
          <Skeleton className="h-4 w-28 rounded-md" />
          <div className="w-5 h-5 bg-gray-100 rounded" />
        </div>
      </div>

      <div className="space-y-3 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-48 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <div className="space-y-2 mt-3">
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-11/12 rounded-md" />
          <Skeleton className="h-3.5 w-9/12 rounded-md" />
          <Skeleton className="h-3.5 w-10/12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function ImageSkeleton({ className = '' }: ProductImageSkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio: '16 / 10' }}
    >
      <Skeleton className="w-full h-full" />
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="aspect-video max-h-96 rounded-xl overflow-hidden bg-gray-100">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-400 font-semibold text-xs px-3 py-2 rounded-lg shadow-sm">
          <Skeleton className="w-12 h-3 rounded-md" />
        </div>

        <button
          disabled
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-400 p-2.5 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label="Imagem anterior"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          disabled
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-400 p-2.5 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label="Próxima imagem"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      <div className="mt-4 flex gap-3 p-2 justify-center items-center overflow-x-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-lg border-2 border-transparent hover:border-gray-300 transition-colors"
          >
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthorProfileSkeleton() {
  return (
    <div className="bg-blue-50 md:rounded-t-3xl">
      <div className="flex flex-wrap items-center justify-between px-8 py-6 lg:py-9 sm:px-8 md:px-16 lg:px-20">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center ring-4 ring-white shadow-sm">
              <FiUser className="text-gray-300 text-2xl" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-44 rounded-md" />
              <Skeleton className="h-4 w-36 rounded-md" />

              <div className="flex md:hidden items-center space-x-3 mt-1">
                <Skeleton className="h-3 w-24 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex gap-6 justify-center">
          <div className="flex items-center space-x-6 text-md font-normal">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
        </div>

        <div className="flex items-center justify-center w-full md:w-auto mt-4 md:mt-0">
          <div className="flex items-center gap-2 px-8 py-2.5 border-2 border-gray-200 rounded-full bg-white shadow-sm hover:shadow transition-shadow">
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export {
  AuthorProfileSkeleton,
  GallerySkeleton,
  ImageSkeleton,
  InfoSkeleton,
  ProductPageSkeleton,
  ReviewsSkeleton,
  SlideSkeleton,
};
