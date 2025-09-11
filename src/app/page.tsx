import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CategoriesSlider from '@/components/categories-slider/CategoriesSlider';
import BannerNovidades from '@/components/features/home/BannerNovidades';
import PopularProducts from '@/components/features/home/PopularProducts';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col overflow-x-hidden items-center justify-items-center min-h-screen sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
        <h2 className="text-2xl sm:text-3xl text-center font-bold mb-3">
          O que você procura?
        </h2>
        <CategoriesSlider />
        <div className="w-full order-2 sm:order-1">
          <BannerNovidades />
        </div>
        <div className="order-1 sm:order-2 flex flex-col w-full px-4 mt-7 ">
          <PopularProducts />
        </div>
      </main>
      <Footer newsSubscription={true} />
    </>
  );
}
