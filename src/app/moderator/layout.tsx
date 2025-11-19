import ModerationHeader from '@/components/features/moderator/moderation-header';
import Footer from '@/components/footer';
import '../globals.css';
import { SearchProvider } from '@/context/SearchContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden">
      <SearchProvider>
        <ModerationHeader />
        {children}
        <Footer />
      </SearchProvider>
    </div>
  );
}
