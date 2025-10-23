import ModeratorHeader from '@/components/features/moderator/moderator-header';
import Footer from '@/components/footer';

export default function ModeratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ModeratorHeader />
      {children}
      <Footer newsSubscription={false} />
    </>
  );
}
