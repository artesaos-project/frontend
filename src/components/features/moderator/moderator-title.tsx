import Image from 'next/image';

function ModeratorTitle({ title }: { title: string }) {
  return (
    <div className="w-2/3 flex text-midnight mx-auto mt-32 md:mt-16 md:gap-17">
      <div className="relative w-[150px] h-[100px]">
        <Image
          src="/horizontal-logo-azul.svg"
          alt="Arteiros Logo"
          width={150}
          height={100}
          className="hidden lg:block"
        />
        <span className="absolute inset-0 flex items-center justify-center font-bold text-3xl lg:hidden">
          {title}
        </span>
      </div>
      <h1 className="font-bold text-3xl my-5 hidden lg:block ml-4">{title}</h1>
    </div>
  );
}

export default ModeratorTitle;
