import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';
import ModerationFilterButtons from './moderation-filter-buttons';

interface ModerationSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  isSearching?: boolean;
  variant: 'reports' | 'artisans' | 'users';
}

function ModerationSearchBar({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  isSearching = false,
  variant,
}: ModerationSearchBarProps) {
  return (
    <div className="mx-auto flex flex-col mt-4 md:mt-10">
      <div className="flex w-full justify-center items-center gap-5 mt-10">
        <div className="relative w-full md:max-w-3/5 border-midnight border-[1px] rounded-md">
          <IoIosSearch
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-midnight ${
              isSearching ? 'animate-pulse' : ''
            }`}
            size={22}
          />
          <Input
            className="pl-10 py-5 placeholder:text-midnight text-midnight"
            type="search"
            placeholder={isSearching ? 'Buscando...' : 'Pesquisar...'}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={isSearching}
          />
        </div>

        <ModerationFilterButtons
          variant={variant}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  );
}

export default ModerationSearchBar;
