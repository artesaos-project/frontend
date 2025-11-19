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
