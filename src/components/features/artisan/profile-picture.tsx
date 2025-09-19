import { ArtisanProfile } from '@/types/artisan';

function ProfilePicture({
  artisan,
  className,
}: {
  artisan: ArtisanProfile;
  className?: string;
}) {
  if (!artisan?.avatar) {
    return (
      <div>
        <img
          src="https://placehold.co/100x100"
          className={className}
          alt="Profile"
        />
      </div>
    );
  }

  return (
    <div>
      <img
        src={artisan.avatar}
        alt={`${artisan.artisanName}'s profile`}
        className={className}
      />
    </div>
  );
}

export default ProfilePicture;
