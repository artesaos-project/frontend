import ModeratorHeader from '@/components/features/moderator/moderator-header';
import Footer from '@/components/footer';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ModeratorHeader />
      {children}
      <Footer />
    </div>
  );
}
