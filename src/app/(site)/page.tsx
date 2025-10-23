import BannerNovidades from '@/components/features/home/banner-novidades';
import CategoriesSlider from '@/components/features/home/categories-slider';
import NewsSection from '@/components/features/home/news-section';
import PopularProducts from '@/components/features/home/popular-products';

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden items-center justify-items-center min-h-screen sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
      <h2 className="text-2xl sm:text-3xl text-center font-bold mb-3">
        O que você procura?
      </h2>
      <CategoriesSlider />
      <div className="w-full">
        <BannerNovidades />
      </div>
      <div className="flex flex-col w-full px-4 mt-7">
        <PopularProducts />
        <NewsSection />
      </div>
    </main>
  );
}
