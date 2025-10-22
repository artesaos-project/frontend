function CardsListSkeleton({ numberOfCards = 4 }: { numberOfCards?: number }) {
  return (
    <div className="items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-4 mt-4 lg:gap-y-6">
      {Array.from({ length: numberOfCards }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="border border-mint-200 p-2 flex flex-col sm:max-w-40 rounded-lg lg:max-w-65 h-full">
      <div className="animate-pulse flex flex-col gap-4">
        <div className="bg-gray-300 rounded-md h-40" />
        <div className="bg-gray-300 rounded-md h-6 w-3/4" />
        <div className="bg-gray-300 rounded-md h-6 w-1/2" />
      </div>
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col mt-4 mb-10 items-center justify-center gap-2 cursor-pointer bg-red-500">
      <div className="animate-pulse flex flex-col gap-4">
        <div className="bg-black rounded-md h-20" />
      </div>
    </div>
  );
}

export { CardsListSkeleton, CategoryCardSkeleton, CardSkeleton };
