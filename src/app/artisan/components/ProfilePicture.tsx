import { Artisan } from '@/types/Artisan';

function ProfilePicture({ artist, className }: { artist: Artisan; className?: string }) {
    return (
        <div>
            <img src={artist.profilePicture} alt={`${artist.name}'s profile`} className={className}/>
        </div>
    );
}

export default ProfilePicture;