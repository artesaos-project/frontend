'use client';

/*
 * Copyright (C) 2025 IFSP - Instituto Federal de Educação, Ciência e Tecnologia de São Paulo
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

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
