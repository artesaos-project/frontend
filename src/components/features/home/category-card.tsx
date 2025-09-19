import Image from 'next/image';

type CategoryCardProps = {
  name: string;
  img: string;
};

function CategoryCard({ name, img }: CategoryCardProps) {
  return (
    <div className="flex flex-col mt-4 mb-10 items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
      <Image
        src={'/' + img}
        width={80}
        height={80}
        alt={name}
        className="w-20 h-20 rounded-lg object-cover shadow-md shadow-black/40"
      />
      <p className="font-bold w-22 text-sm text-center">{name}</p>
    </div>
  );
}

export default CategoryCard;
