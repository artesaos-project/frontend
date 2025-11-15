import { BiMessageError } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
import { MdOutlineArchive } from 'react-icons/md';
import { RxReload } from 'react-icons/rx';
import { TbCancel } from 'react-icons/tb';

interface ModerateReportButtonProps {
  variant: 'warn' | 'exclude' | 'suspend' | 'ban' | 'archive' | 'revert';
  onClick?: () => void;
}

function ModerateReportButton({ variant, onClick }: ModerateReportButtonProps) {
  if (variant === 'warn') {
    return (
      <button
        className="min-h-8 min-w-8 text-white rounded-lg font-semibold border bg-golden cursor-pointer flex items-center justify-center gap-1 hover:bg-white hover:text-golden hover:border-golden transition"
        aria-label="Aprovar artesão"
        onClick={onClick}
      >
        <BiMessageError size={16} />
      </button>
    );
  }

  if (variant === 'exclude') {
    return (
      <button
        className="min-h-8 min-w-8 text-white rounded-lg font-semibold border bg-solar-600 cursor-pointer flex items-center justify-center gap-1 hover:bg-white hover:text-solar-600 hover:border-solar-600 transition"
        aria-label="Excluir publicação"
        onClick={onClick}
      >
        <TbCancel size={16} />
      </button>
    );
  }

  if (variant === 'suspend') {
    return (
      <button
        className="min-h-8 min-w-8 rounded-lg font-semibold text-white bg-salmon border-salmon border cursor-pointer flex items-center justify-center gap-1 hover:bg-white hover:text-salmon transition"
        aria-label="Aprovar artesão"
        onClick={onClick}
      >
        <FiX size={16} />
      </button>
    );
  }

  if (variant === 'ban') {
    return (
      <button
        className="min-h-8 min-w-8 rounded-lg font-semibold border border-black bg-black text-white cursor-pointer flex items-center justify-center gap-1 hover:bg-white hover:text-black transition"
        aria-label="Desativar artesão"
        onClick={onClick}
      >
        <GiCancel size={16} />
      </button>
    );
  }

  if (variant === 'archive') {
    return (
      <button
        className="min-h-8 min-w-8 rounded-lg font-bold text-white bg-dust-500 border border-dust-500 cursor-pointer flex items-center justify-center gap-1 hover:bg-white hover:text-dust-500 transition"
        aria-label="Editar artesão"
        onClick={onClick}
      >
        <MdOutlineArchive size={16} />
      </button>
    );
  }

  if (variant === 'revert') {
    return (
      <button
        className="min-h-8 min-w-8 rounded-lg font-bold text-white bg-olivine-600 border border-olivine-600 cursor-pointer flex items-center justify-center gap-1 hover:bg-white hover:text-olivine-600 transition"
        aria-label="Editar artesão"
        onClick={onClick}
      >
        <RxReload size={16} />
      </button>
    );
  }

  return null;
}

export default ModerateReportButton;
