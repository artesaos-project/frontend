import { Artisan } from "@/types/Artisan";

function ProfileInfo({ artist, textColor }: { artist: Artisan, textColor?: string }) {
  return (
    <div className="profile-info">
      <h2 className={`mt-2 text-xl font-bold ${textColor}`}>{artist.name}</h2>
      <h3 className={`${textColor}`}>{artist.username}</h3>
      <p className={`text-sm ${textColor} mt-1`}>
        <span className={`font-bold ${textColor}`}>{artist.followers}</span>{" "}
        Seguidores ·{" "}
        <span className={`font-bold ${textColor}`}>{artist.products}</span>{" "}
        Produtos
      </p>
    </div>
  );
}
export default ProfileInfo;
