import { Button } from '@/components/ui/button';
import { FaCheck } from 'react-icons/fa6';
import { FiX } from 'react-icons/fi';
import { GoClockFill } from 'react-icons/go';

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  variant: 'reports' | 'artisans';
}

const artisanFilterButtons = [
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

const reportFilterButtons = [
  { key: 'all', label: 'Mais recentes', icon: null },
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

function ModeratorFilterButtons({
  activeFilter,
  onFilterChange,
  variant = 'artisans',
}: FilterButtonsProps) {
  const filterButtons =
    variant === 'reports' ? reportFilterButtons : artisanFilterButtons;

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
