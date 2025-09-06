import { IoIosSearch } from "react-icons/io";

function SearchBar() {
  return (
    <div className="flex md:w-7/12 items-center justify-center p-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Pesquisar Produto"
          className="w-full py-2 px-8 ring-1 ring-[#A3A3A3] rounded-sm"
        />
        <IoIosSearch
          size={20}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
}

export default SearchBar;
