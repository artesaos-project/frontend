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

import Footer from '@/components/footer';
import Header from '@/components/header';
import '../globals.css';
import { SearchProvider } from '@/context/SearchContext';

export default function LayoutSite({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SearchProvider>
        <Header />
        {children}
        <Footer />
      </SearchProvider>
    </div>
  );
}
