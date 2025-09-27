import { FaCheck } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { LuPencil } from 'react-icons/lu';

interface ModerateArtisanButtonProps {
  variant: 'approve' | 'reject' | 'activate' | 'deactivate' | 'edit';
  onClick?: () => void;
}

function ModerateArtisanButton({ variant }: ModerateArtisanButtonProps) {
  return (
    <>
      {variant === 'approve' && (
        <button
          className="h-6 w-24 text-xs text-white rounded-lg font-semibold border bg-green-600 cursor-pointer flex items-center justify-center gap-1 hover:bg-white hover:text-green-600 hover:border-green-600 transition"
          aria-label="Aprovar artesão"
        >
          <FaCheck size={12} />
          <p className="hidden md:inline">APROVAR</p>
        </button>
      )}

      {variant === 'reject' && (
        <button
          className="h-6 w-24 text-xs text-white rounded-lg font-semibold border bg-red-700 cursor-pointer flex items-center justify-center gap-1 hover:bg-white hover:text-red-700 hover:border-red-700 transition"
          aria-label="Recusar artesão"
        >
          <FiX size={16} />
          <p className="hidden md:inline">RECUSAR</p>
        </button>
      )}

      {variant === 'activate' && (
        <button
          className="h-6 w-24 text-xs rounded-lg font-semibold text-green-600 bg-white border-green-600 border cursor-pointer flex items-center justify-center gap-1 hover:bg-green-600 hover:text-white transition"
          aria-label="Aprovar artesão"
        >
          <FaCheck />
          <p className="hidden md:inline">ATIVAR</p>
        </button>
      )}

      {variant === 'deactivate' && (
        <button
          className="h-6 w-24 text-xs rounded-lg font-semibold md:bg-white border border-red-600 bg-red-600 text-red-600 cursor-pointer flex items-center justify-center gap-1 hover:bg-red-600 hover:text-white transition"
          aria-label="Desativar artesão"
        >
          <FiX size={16} />
          <p className="hidden md:inline">DESATIVAR</p>
        </button>
      )}

      {variant === 'edit' && (
        <button
          className="h-6 w-24 text-xs rounded-lg font-bold text-dust-700 bg-dust-300 border border-dust-500 cursor-pointer flex items-center justify-center gap-1 hover:bg-dust-500 hover:text-white transition"
          aria-label="Editar artesão"
        >
          <LuPencil size={14} />
          <p className="hidden md:inline">EDITAR</p>
        </button>
      )}
    </>
  );
}

export default ModerateArtisanButton;
