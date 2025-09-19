import Footer from '@/components/footer';
import Header from '@/components/header';
import ArtistProfileCard from '../../../components/features/artisan/artisan-profile-card';

export default function ArtisanPage() {
  return (
    <div>
      <Header />
      <ArtistProfileCard />
      <Footer newsSubscription={true} />
    </div>
  );
}
