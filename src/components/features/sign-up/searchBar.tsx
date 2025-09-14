import { HiSearch } from 'react-icons/hi';

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full mt-4">
      <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Pesquise aqui..."
        className="w-full pl-10 py-2 rounded-md shadow-md border border-gray-300 focus:shadow-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
