import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ModerationCardProps {
  title: string;
  description: string;
  pending: number;
  finished: number;
  href: string;
}

function ModerationCard({
  title,
  description,
  pending,
  finished,
  href,
}: ModerationCardProps) {
  return (
    <div className="w-52 flex flex-col text-midnight justify-center text-sm items-center text-center px-4 py-7 ring-2 ring-black/10 shadow-md shadow-black/10 rounded-xl hover:transform hover:scale-105 duration-300">
      <p className="font-bold my-4">{title}</p>
      <p>{description}</p>
      <div className="flex gap-5 my-4">
        <p className="font-bold text-sm">Pendentes</p>
        <p className="font-bold text-sm">Concluídos</p>
      </div>
      <div className="flex gap-19">
        <p className="text-sm">{pending}</p>
        <p className="text-sm">{finished}</p>
      </div>
      <Button asChild className="w-36 h-7 mt-4 rounded-2xl text-sm bg-midnight">
        <Link href={href} className=" flex flex-col items-center text-xs">
          Ver Todos
        </Link>
      </Button>
    </div>
  );
}

export default ModerationCard;
