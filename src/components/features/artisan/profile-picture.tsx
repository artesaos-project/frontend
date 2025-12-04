import { ArtisanProfile } from '@/types/artisan';
import Image from 'next/image';

function ProfilePicture({
  artisan,
  className,
}: {
  artisan: ArtisanProfile;
  className?: string;
}) {
  if (!artisan?.avatar) {
    return (
      <div className="h-30 w-30">
        <Image
          src="/placeholder-avatar.svg"
          className={className}
          alt="Profile"
          width={100}
          height={100}
        />
      </div>
    );
  }

  return (
    <div className="h-30 w-30">
      <Image
        src={artisan.avatar}
        alt={`${artisan.artisanName}'s profile`}
        className={className}
        width={100}
        height={100}
      />
    </div>
  );
}

export default ProfilePicture;
