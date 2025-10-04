import { Input } from '@/components/ui/input';
import categories from '@/db-mock/categories.json';
import { IoIosSearch } from 'react-icons/io';
function page({ params }: { params: { name: string } }) {
  const category = categories.find(
    (cat) => cat.nameFilter.toLowerCase() === params.name,
  );
  return (
    <main className="flex flex-col overflow-x-hidden items-center justify-items-center min-h-screen px-6 sm:px-12 lg:px-46 pb-10 py-8 font-[family-name:var(--font-poppins)]">
      <h1 className="text-xl text-sakura font-bold mb-8">{category?.name}</h1>
      <SearchInput />
    </main>
  );
}

function SearchInput() {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Pesquisar produto"
        className="pl-8 py-5 text-sm border-gray-400 focus-visible:border-gray-600 focus-visible:ring-0"
      />
      <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default page;
