import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { FaCheck } from 'react-icons/fa6';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { GoClockFill } from 'react-icons/go';
import { IoFilter } from 'react-icons/io5';
import { MdHourglassEmpty } from 'react-icons/md';

interface FilterButtonsProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  variant: 'reports' | 'artisans' | 'users';
}

const artisanFilterButtons = [
  {
    key: 'all',
    label: 'Mais recentes',
    icon: <FiChevronDown />,
  },
  {
    key: 'PENDING',
    label: 'Pendentes',
    icon: <GoClockFill className="text-amber-400" />,
  },
  {
    key: 'APPROVED',
    label: 'Aprovados',
    icon: <FaCheck className="text-green-600" />,
  },
  {
    key: 'REJECTED',
    label: 'Recusados',
    icon: <FiX className="text-red-600 font-bold" />,
  },
  {
    key: 'POSTPONED',
    label: 'Incompletos',
    icon: <MdHourglassEmpty />,
  },
];

const reportFilterButtons = [
  {
    key: 'all',
    label: 'Mais recentes',
    icon: <FiChevronDown />,
  },
  {
    key: 'PENDING',
    label: 'Pendentes',
    icon: <GoClockFill className="text-amber-400" />,
  },
  {
    key: 'MODERATED',
    label: 'Moderados',
    icon: <FiX className="text-red-600 font-bold" />,
  },
  {
    key: 'ARCHIVED',
    label: 'Arquivados',
    icon: <FaCheck className="text-green-600" />,
  },
];

function ModerationFilterButtons({
  activeFilter,
  onFilterChange,
  variant = 'artisans',
}: FilterButtonsProps) {
  const filterButtons =
    variant === 'reports' ? reportFilterButtons : artisanFilterButtons;

  if (variant === 'users') {
    return null;
  }

  return (
    <>
      {filterButtons.map(({ key, label, icon }) => (
        <Button
          key={key}
          className={`hidden lg:flex text-xs transition rounded-lg ${
            activeFilter === key
              ? 'bg-midnight text-white'
              : 'bg-white border-[1px] border-midnight text-midnight hover:bg-midnight hover:text-white'
          }`}
          onClick={() => (onFilterChange ? onFilterChange(key) : null)}
        >
          {icon}
          {label}
        </Button>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoFilter className="ml-2 hover:bg-gray-300 p-2 text-midnight rounded-sm cursor-pointer transition h-9 w-9 lg:hidden" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white rounded-md shadow-md border border-neutral-300 p-4 text-sm text-midnight font-semibold flex flex-col gap-1   ">
          <DropdownMenuItem
            onClick={() => onFilterChange?.('all')}
            className="hover:bg-gray-200 transition cursor-pointer focus:outline-none focus-visible:outline-none px-2 py-1 rounded-md"
          >
            Mais Recentes
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onFilterChange?.('PENDING')}
            className="hover:bg-gray-200 transition cursor-pointer flex justify-between items-center focus:outline-none focus-visible:outline-none px-2 py-1 rounded-md"
          >
            Pendentes
            <GoClockFill className="text-amber-400" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onFilterChange?.('APPROVED')}
            className="hover:bg-gray-200 transition cursor-pointer focus:outline-none flex justify-between items-center focus-visible:outline-none px-2 py-1 rounded-md"
          >
            Aprovados
            <FaCheck className="text-green-600" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onFilterChange?.('REJECTED')}
            className="hover:bg-gray-200 transition cursor-pointer focus:outline-none flex justify-between items-center focus-visible:outline-none px-2 py-1 rounded-md"
          >
            Recusados
            <FiX className="text-red-600 font-bold" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onFilterChange?.('POSTPONED')}
            className="hover:bg-gray-200 transition cursor-pointer focus:outline-none flex justify-between items-center focus-visible:outline-none px-2 py-1 rounded-md"
          >
            Incompletos
            <MdHourglassEmpty />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ModerationFilterButtons;
