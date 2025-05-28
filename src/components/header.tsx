"use client";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import AuthenticationModal from "./AuthenticationModal/AuthenticationModal";
import useStoreUser from "@/hooks/useStoreUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

function header() {
  const user = useStoreUser((state) => state.user);
  const resetStore = useStoreUser((state) => state.resetStore);

  return (
    <header className="w-full bg-mint-200 pt-16 pb-8 px-4 sm:px-12 lg:px-54 grid gap-6 md:grid-cols-12 lg:gap-8">
      <div className="flex items-center justify-between md:col-span-8">
        <div className="">
          <IoMenu size={30} />
        </div>
        <Image
          src="Criarte.svg"
          alt="Criarte Logo"
          className="md:w-36"
          width={100}
          height={20}
          priority
        />
        {!user.isAuthenticated && <AuthenticationModal />}
        {user.isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center justify-center user-select-none cursor-pointer">
                <Image
                  src={user.userPhoto ?? "/default-avatar.webp"}
                  alt="User Avatar"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-mint-50 border-none">
              <DropdownMenuItem className="cursor-pointer">
                Editar Perfil
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/moderator"
                  className={`cursor-pointer ${!user.isModerator ? "pointer-events-none cursor-none opacity-50" : ""}`}
                  tabIndex={user.isModerator ? 0 : -1}
                  aria-disabled={!user.isModerator}
                >
                  Moderação
                </Link>

              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-mint-600" />
              <DropdownMenuItem
                className="text-red-700 cursor-pointer"
                onClick={() => {
                  resetStore();
                }}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="relative md:col-span-4">
        <Input
          type="text"
          placeholder="Pesquise aqui..."
          className="bg-white rounded-3xl pl-10 pr-6 py-7 drop-shadow-lg shadow-black/40"
        />
        <IoIosSearch className="absolute left-1.5 top-[25%]" size={30} />
      </div>
    </header>
  );
}

export default header;
