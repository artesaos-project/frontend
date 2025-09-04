"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import AuthenticationModal from "./AuthenticationModal/AuthenticationModal";
import useStoreUser from "@/hooks/useStoreUser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SideBarMenu from "./SideBarMenu";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

function header() {
  const user = useStoreUser((state) => state.user);
  const resetStore = useStoreUser((state) => state.resetStore);

  return (
    <header className="w-full bg-midnight pt-16 pb-8 px-4 sm:px-12 lg:px-54 grid gap-6 md:grid-cols-12 lg:gap-8 items-center">
      <div className="flex items-center md:col-span-8">
        <SideBarMenu />
        <Link
          href={"/"}
          className="mx-auto md:mx-0 md:ml-8 md:mr-auto cursor-pointer"
        >
          <Image
            src="/horizontal-logo.svg"
            alt="Criarte Logo"
            className="md:w-36"
            width={120}
            height={60}
            priority
          />
        </Link>
        {!user.isAuthenticated && <AuthenticationModal />}
        {user.isAuthenticated && (
          <Dialog>
            <DialogTrigger asChild>
              <DialogHeader>
                <DialogTitle>
                  <Image
                    src={user.userPhoto ?? "/default-avatar.webp"}
                    alt="User Avatar"
                    width={60}
                    height={60}
                    className="rounded-full user-select-none cursor-pointer bg-gray-300"
                  />
                </DialogTitle>
              </DialogHeader>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px] py-10 rounded-3xl">
              <div className="flex flex-col items-center justify-center text-midnight">
                <Image
                  src={user.userPhoto ?? "/default-avatar.webp"}
                  alt="User Avatar"
                  width={120}
                  height={120}
                  className="rounded-full mb-4 bg-gray-300"
                />
                <h2 className="text-2xl font-bold">{user.userName}</h2>
                {user.artisanUserName && (
                  <p>@{user.artisanUserName}</p>
                )}
                {user.isModerator && (
                  <div className="w-fit">
                    <Separator className="my-2" />
                    <Link href="/moderator" className="text-xl">
                      Moderação
                    </Link>
                    <Separator className="my-2" />
                  </div>
                )}
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    resetStore();
                  }}
                  className="text-xl text-red-500 hover:text-red-600 mt-2"
                >
                  Sair
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
