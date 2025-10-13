import { HiSearch } from 'react-icons/hi';

function SearchBar({
  className = '',
  classNameIcon = '',
  value,
  onChange,
  iconPosition = 'left',
}: {
  className?: string;
  classNameIcon?: string;
  iconPosition?: 'left' | 'right';
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full mt-4">
      {iconPosition === 'left' && (
        <HiSearch
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${classNameIcon}`}
        />
      )}
      <input
        type="text"
        placeholder="Pesquise aqui..."
        className={`w-full pl-10 py-2 rounded-md shadow-md border border-gray-300 focus:shadow-none ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {iconPosition === 'right' && (
        <HiSearch
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${classNameIcon}`}
        />
      )}
    </div>
  );
}

export default SearchBar;
