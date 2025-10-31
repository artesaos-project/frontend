import { FavoritesProvider } from '@/context/favorite-context';
import { FollowProvider } from '@/context/follow-context';
import { SearchProvider } from '@/context/SearchContext';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['200', '400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Criarte',
  description: 'Crirarte -  Uma plataforma de arte para artesãos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Toaster richColors position="top-right" />
        <FavoritesProvider>
          <FollowProvider>
            <SearchProvider>{children}</SearchProvider>
          </FollowProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
