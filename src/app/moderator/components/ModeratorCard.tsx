import Link from "next/link";

interface ModeratorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  pending: number;
  finished: number;
}

function ModeratorCard({
  icon,
  title,
  description,
  pending,
  finished }: ModeratorCardProps
) {
  return (
    <div className="w-56 flex flex-col justify-center text-sm items-center text-center px-4 py-7 ring-2 ring-black/10 shadow-md shadow-black/10 rounded-xl hover:transform hover:scale-105 duration-300 cursor-pointer">
      <Link href={`/moderator/artisans`} className="w-full h-full flex flex-col items-center">
        {icon}
        <p className="font-bold my-4">{title}</p>
        <p className="">{description}</p>
        <div className="flex gap-5 my-5">
          <p className="font-bold text-sm">Pendentes</p>
          <p className="font-bold text-sm">Concluídos</p>
        </div>
        <div className="flex gap-19">
          <p className="text-sm">{pending}</p>
          <p className="text-sm">{finished}</p>
        </div>
      </Link>
    </div>
  )
}

export default ModeratorCard