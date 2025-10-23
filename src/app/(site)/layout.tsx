import Footer from '@/components/footer';
import Header from '@/components/header';
<<<<<<< Updated upstream
import '../globals.css';

export default function LayoutSite({
=======
<<<<<<< HEAD

export default function SiteLayout({
=======
import '../globals.css';

export default function LayoutSite({
>>>>>>> afaa67f9ab8f5a1670aaf9d60a9a9f6e08f23968
>>>>>>> Stashed changes
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< Updated upstream
    <div>
      <Header />
      {children}
      <Footer newsSubscription />
    </div>
=======
<<<<<<< HEAD
    <>
      <Header />
      {children}
      <Footer newsSubscription />
    </>
=======
    <div>
      <Header />
      {children}
      <Footer newsSubscription />
    </div>
>>>>>>> afaa67f9ab8f5a1670aaf9d60a9a9f6e08f23968
>>>>>>> Stashed changes
  );
}
