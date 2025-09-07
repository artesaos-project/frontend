import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ArtistProfileCard from '../../../components/features/artisan/ArtisanProfileCard';

export default function ArtisanPage() {
  return (
    <div>
      <Header />
      <ArtistProfileCard />
      <Footer newsSubscription={true} />
    </div>
  );
}
