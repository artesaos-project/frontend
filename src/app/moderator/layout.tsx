import ModeratorHeader from '@/components/features/moderator/moderator-header';
import Footer from '@/components/footer';
<<<<<<< Updated upstream
import '../globals.css';

export default function RootLayout({
=======
<<<<<<< HEAD

export default function ModeratorLayout({
=======
import '../globals.css';

export default function RootLayout({
>>>>>>> afaa67f9ab8f5a1670aaf9d60a9a9f6e08f23968
>>>>>>> Stashed changes
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< Updated upstream
    <div>
      <ModeratorHeader />
      {children}
      <Footer newsSubscription={false} />
    </div>
=======
<<<<<<< HEAD
    <>
      <ModeratorHeader />
      {children}
      <Footer newsSubscription={false} />
    </>
=======
    <div>
      <ModeratorHeader />
      {children}
      <Footer newsSubscription={false} />
    </div>
>>>>>>> afaa67f9ab8f5a1670aaf9d60a9a9f6e08f23968
>>>>>>> Stashed changes
  );
}
