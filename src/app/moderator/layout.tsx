import ModerationHeader from '@/components/features/moderator/moderation-header';
import Footer from '@/components/footer';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden">
      <ModerationHeader />
      {children}
      <Footer />
    </div>
  );
}
