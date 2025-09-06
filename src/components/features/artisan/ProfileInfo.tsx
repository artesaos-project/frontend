import { ArtisanProfile } from '@/types/Artisan';

function ProfileInfo({
  artisan,
  textColor,
}: {
  artisan: ArtisanProfile;
  textColor?: string;
}) {
  return (
    <div className="profile-info">
      <h2 className={`mt-2 text-xl font-bold ${textColor}`}>
        {artisan.artisanName}
      </h2>
      <h3 className={`${textColor}`}>@{artisan.userName}</h3>
      <p className={`text-sm ${textColor} mt-1`}>
        <span className={`font-bold ${textColor}`}>
          {artisan.followersCount}
        </span>{' '}
        Seguidores ·{' '}
        <span className={`font-bold ${textColor}`}>
          {artisan.productsCount}
        </span>{' '}
        Produtos
      </p>
    </div>
  );
}
export default ProfileInfo;
