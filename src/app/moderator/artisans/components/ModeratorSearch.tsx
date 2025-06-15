import { Input } from "@/components/ui/input"
import { IoIosSearch } from 'react-icons/io'
import { Button } from '@/components/ui/button'
import { IoIosArrowDown } from "react-icons/io";
import { GoClockFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { BsXLg } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";

function ModeratorSearch() {
  return (
    <div className='w-2/3 mx-auto flex justify-center items-center gap-5 mt-4 md:mt-16'>
        <div className="relative w-full md:max-w-3/5 border-midnight border-[1px] rounded-md">
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight" size={22} />
          <Input
            className="pl-10 py-5 placeholder:text-midnight text-midnight"
            type="search"
            placeholder="Pesquisar..."
          />
        </div>
        <Button className='hidden lg:flex ml-2 bg-white border-[1px] border-midnight text-midnight hover:bg-midnight hover:text-white transition text-xs'>
          <IoIosArrowDown />
          Mais recentes
        </Button>
        <Button className='hidden lg:flex text-xs bg-midnight text-white hover:bg-midnight/80'>
          <GoClockFill className='text-amber-400' />
          Pendentes
          <IoIosArrowDown />
        </Button>
        <Button className='hidden lg:flex text-xs bg-midnight text-white hover:bg-midnight/80'>
          <FaCheck className='text-green-600' />
          Ativos
          <IoIosArrowDown />
        </Button>
        <Button className='hidden lg:flex text-xs bg-midnight text-white hover:bg-midnight/80'>
          <BsXLg className='text-red-600 font-bold'/>
          Desativados
          <IoIosArrowDown />
        </Button>
        <Button variant='ghost'>
          <IoFilter className='text-midnight' />
        </Button>
      </div>
  )
}

export default ModeratorSearch