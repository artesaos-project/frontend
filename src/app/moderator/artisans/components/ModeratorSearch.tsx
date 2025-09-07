import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { IoIosArrowDown } from 'react-icons/io';
import { GoClockFill } from 'react-icons/go';
import { FaCheck } from 'react-icons/fa6';
import { BsXLg } from 'react-icons/bs';
import { IoFilter } from 'react-icons/io5';
import { LuPencil } from 'react-icons/lu';

interface ModeratorSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

function ModeratorSearch({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: ModeratorSearchProps) {
  return (
    <div className="w-2/3 mx-auto flex flex-col mt-4 md:mt-16">
      <div className="hidden lg:flex flex-col">
        <div className="w-full rounded-md border border-midnight p-2 text-midnight font-bold">
          <p>Instruções das ações</p>
        </div>
        <div className="flex flex-col text-sm font-semibold text-midnight">
          <div className="flex gap-6 mx-3 pt-4">
            <span>Ação/Botão</span>
            <span>Função</span>
          </div>
          <div className="flex gap-4 pt-2 items-center">
            <Button
              className="h-6 w-24 text-xs my-1 bg-green-600 md:bg-white border border-green-600 text-green-600"
              aria-label="Aprovar artesão"
              asChild
            >
              <div>
                <FaCheck className="text-white md:text-green-600" />
                <p className="hidden md:inline">ATIVAR</p>
              </div>
            </Button>

            <span>
              Ativar usuários desativados anteriormente, permitindo que o
              usuário volte a acessar o sistema.
            </span>
          </div>
          <div className="flex gap-4 pt-2 items-center">
            <Button
              className="h-6 w-24 text-xs my-1 md:bg-white font-bold border border-red-600 bg-red-600 text-red-600"
              aria-label="Desativar artesão"
              asChild
            >
              <div>
                <BsXLg className="text-white md:text-red-600" />
                <p className="hidden md:inline">DESATIVAR</p>
              </div>
            </Button>

            <span>Desativar usuários e bloqueiar o acesso ao sistema.</span>
          </div>
          <div className="flex gap-4 pt-2 items-center">
            <Button
              className="h-6 w-24 text-xs my-1 bg-green-600"
              aria-label="Aprovar artesão"
              asChild
            >
              <div>
                <FaCheck className="text-white" />
                <p className="hidden md:inline">APROVAR</p>
              </div>
            </Button>

            <span>Validar a ação ou cadastro.</span>
          </div>
          <div className="flex gap-4 pt-2 items-center">
            <Button
              className="h-6 w-24 text-xs my-1 bg-red-700"
              aria-label="Recusar artesão"
            >
              <div className="flex items-center gap-2">
                <BsXLg className="text-white" />
                <p className="hidden md:inline">RECUSAR</p>
              </div>
            </Button>

            <span>Rejeitar o pedido de cadastro e impedir a continuidade.</span>
          </div>
          <div className="flex gap-4 pt-2 items-center">
            <Button
              className="h-6 w-24 text-xs my-1 bg-yellow-600/75"
              aria-label="Editar artesão"
              asChild
            >
              <div>
                <LuPencil className="text-white" />
                <p className="hidden md:inline">EDITAR</p>
              </div>
            </Button>

            <span>
              Abrir as informações deste registro para atualização ou correção
              de dados.
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center gap-5 mt-10">
        <div className="relative w-full md:max-w-3/5 border-midnight border-[1px] rounded-md">
          <IoIosSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight"
            size={22}
          />
          <Input
            className="pl-10 py-5 placeholder:text-midnight text-midnight"
            type="search"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          className={`hidden lg:flex ml-2 text-xs transition ${
            activeFilter === 'all'
              ? 'bg-midnight text-white'
              : 'bg-white border-[1px] border-midnight text-midnight hover:bg-midnight hover:text-white'
          }`}
          onClick={() => onFilterChange('all')}
        >
          <IoIosArrowDown />
          Mais recentes
        </Button>
        <Button
          className={`hidden lg:flex text-xs transition ${
            activeFilter === 'PENDING'
              ? 'bg-midnight text-white'
              : 'bg-white border-[1px] border-midnight text-midnight hover:bg-midnight hover:text-white'
          }`}
          onClick={() => onFilterChange('PENDING')}
        >
          <GoClockFill className="text-amber-400" />
          Pendentes
          <IoIosArrowDown />
        </Button>
        <Button
          className={`hidden lg:flex text-xs transition ${
            activeFilter === 'APPROVED'
              ? 'bg-midnight text-white'
              : 'bg-white border-[1px] border-midnight text-midnight hover:bg-midnight hover:text-white'
          }`}
          onClick={() => onFilterChange('APPROVED')}
        >
          <FaCheck className="text-green-600" />
          Aprovados
          <IoIosArrowDown />
        </Button>
        <Button
          className={`hidden lg:flex text-xs transition ${
            activeFilter === 'INACTIVE'
              ? 'bg-midnight text-white'
              : 'bg-white border-[1px] border-midnight text-midnight hover:bg-midnight hover:text-white'
          }`}
          onClick={() => onFilterChange('INACTIVE')}
        >
          <BsXLg className="text-red-600 font-bold" />
          Inativos
          <IoIosArrowDown />
        </Button>
      </div>
    </div>
  );
}

export default ModeratorSearch;
