import {
  IoMenu,
  IoChevronForward,
  IoChevronDownOutline,
} from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { TbArrowsExchange, TbLogout2 } from "react-icons/tb";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

function SideBarMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IoMenu size={30} color="white" className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-[#FAFAFA] p-5 flex flex-col gap-5"
      >
        <SheetHeader>
          <SheetTitle asChild>
            <Image
              src="/horizontal-logo-azul 3.svg"
              alt="User Avatar"
              width={180}
              height={90}
              className="w-60"
            />
          </SheetTitle>
        </SheetHeader>
        <div className="w-full bg-white shadow-md shadow-black/40 rounded-lg p-4 flex gap-2">
          <Image
            src={"/default-avatar.webp"}
            alt="User Avatar"
            width={110}
            height={110}
            className="rounded-full"
          />
          <div className="ml-auto mr-2">
            <h2 className="font-bold text-2xl text-midnight mb-1">John Doe</h2>
            <p className="text-sm text-midnight font-semibold">@johndoe</p>
            <Button asChild variant={"outline"} className="rounded-full">
              <Link
                href="/profile"
                className="bg-[#FAFAFA] text-sakura border-sakura border-2 border-b-4 shadow-sakura hover:bg-sakura hover:text-white w-42 mt-2"
              >
                Ver meu perfil
                <IoChevronForward />
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-full bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center">
          <MdOutlineShoppingBag color="#ff8c94" size={30} />
          <p className="text-midnight font-bold text-2xl ml-6 mr-auto">
            Produtos
          </p>
          <IoChevronDownOutline size={25} />
        </div>
        <div className="w-full bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center">
          <FaRegHeart color="#ff8c94" size={30} />
          <p className="text-midnight font-bold text-2xl ml-6 mr-auto">
            Favoritos
          </p>
        </div>
        <div className="w-full bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center">
          <BsGear color="#ff8c94" size={30} />
          <p className="text-midnight font-bold text-2xl ml-6 mr-auto">
            Configurações
          </p>
        </div>
        <div className="w-full bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center">
          <IoMdHelpCircleOutline color="#ff8c94" size={30} />
          <p className="text-midnight font-bold text-2xl ml-6 mr-auto">
            Suporte e Ajuda
          </p>
        </div>
        <div className="w-full bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center">
          <TbArrowsExchange color="#ff8c94" size={30} />
          <p className="text-midnight font-bold text-2xl ml-6 mr-auto">
            Troca de Conta
          </p>
        </div>
        <div className="w-full bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center">
          <TbLogout2 color="#ff8c94" size={30} />
          <p className="text-midnight font-bold text-2xl ml-6 mr-auto">Sair</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideBarMenu;
