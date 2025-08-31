import Header from "@/components/header";
import Footer from "@/components/Footer";
import ArtistProfileCard from '../components/ArtisanProfileCard';

export default function(){
    return(
        <div>
            <Header/>
                <ArtistProfileCard/>
            <Footer newsSubscription={true}/>
        </div>
    );
}   