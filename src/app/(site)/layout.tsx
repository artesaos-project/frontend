import Footer from '@/components/footer';
import Header from '@/components/header';
import '../globals.css';

export default function LayoutSite({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer newsSubscription />
    </div>
  );
}
