import { Suspense } from 'react';
import SearchContent from './search-content';

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchPageSkeleton() {
  return (
    <main className="flex flex-col overflow-x-hidden items-center justify-items-center min-h-screen sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
      <div className="flex flex-col w-full px-4 mt-7">
        <div className="flex flex-row items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="py-10 text-center text-gray-500">
          Carregando resultados...
        </div>
      </div>
    </main>
  );
}
