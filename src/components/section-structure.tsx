import Link from 'next/link';
import { Button } from './ui/button';

function SectionStructure({
  title,
  children,
  showMoreLink,
}: {
  title: string;
  children: React.ReactNode;
  showMoreLink?: string;
}) {
  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl sm:text-3xl font-bold">{title}</h2>
        {showMoreLink && (
          <Link href={showMoreLink}>
            <Button className="bg-transparent text-mint-600 border-2 rounded-md px-3 border-mint-200 hover:bg-mint-200 hover:text-white transition-colors duration-300 cursor-pointer">
              Ver Mais
            </Button>
          </Link>
        )}
      </div>
      {children}
    </>
  );
}

export default SectionStructure;
