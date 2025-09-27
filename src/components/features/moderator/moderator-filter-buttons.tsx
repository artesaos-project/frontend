import { Button } from '@/components/ui/button';
import { FaCheck } from 'react-icons/fa6';
import { FiX } from 'react-icons/fi';
import { GoClockFill } from 'react-icons/go';

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterButtons = [
  { key: 'all', label: 'Mais recentes', icon: null },
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
    key: 'INACTIVE',
    label: 'Inativos',
    icon: <FiX className="text-red-600 font-bold" />,
  },
];

function ModeratorFilterButtons({
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <>
      {filterButtons.map(({ key, label, icon }) => (
        <Button
          key={key}
          className={`hidden lg:flex text-xs transition ${
            activeFilter === key
              ? 'bg-midnight text-white'
              : 'bg-white border-[1px] border-midnight text-midnight hover:bg-midnight hover:text-white'
          }`}
          onClick={() => onFilterChange(key)}
        >
          {icon}
          {label}
        </Button>
      ))}
    </>
  );
}

export default ModeratorFilterButtons;
