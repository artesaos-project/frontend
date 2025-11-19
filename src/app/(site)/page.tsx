'use client';
import BannerNovidades from '@/components/features/home/banner-novidades';
import CategoriesSlider from '@/components/features/home/categories-slider';
import NewArtisans from '@/components/features/home/new-artisans';
import NewsSection from '@/components/features/home/news-section';
import PopularProducts from '@/components/features/home/popular-products';
import { homeApi } from '@/services/api';
import type { HomeApiResponse } from '@/services/api/home';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<HomeApiResponse>({
    newArtisans: [],
    popularProducts: [],
    recentProducts: [],
    followedArtisansProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await homeApi.getHome();
        setData(res.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

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
        <PopularProducts products={data.popularProducts} loading={loading} />
        <NewsSection products={data.recentProducts} loading={loading} />
        <NewArtisans artisans={data.newArtisans} loading={loading} />
      </div>
    </main>
  );
}
