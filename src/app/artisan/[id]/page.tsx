import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistProfileCard from '../../../components/features/artisan/ArtisanProfileCard';

export default function(){
    return(
        <div>
            <Header/>
                <ArtistProfileCard/>
            <Footer newsSubscription={true}/>
        </div>
    );
}   