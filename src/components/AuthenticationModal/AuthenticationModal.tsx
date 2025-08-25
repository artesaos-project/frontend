"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { FiChevronLeft } from "react-icons/fi";

function AuthenticationModal({ color }: { color?: string }) {
  const [modalState, setModalState] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function openInitial() {
    setModalState(0);
  }
  function openSignIn() {
    setModalState(1);
  }
  function openSignUp() {
    setModalState(2);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            openInitial();
            setIsDialogOpen(true);
          }}
          variant="outline"
          className={`bg-transparent cursor-pointer hover:bg-white/20 hover:text-${
            color || "white"
          } border-${color || "white"} text-${
            color || "white"
          } inset-shadow-black/50 inset-shadow-sm p-6 rounded-full underline underline-offset-2 text-xs`}
        >
          Entre ou cadastre-se
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:max-h-[99vh] h-[95vh] overflow-y-auto rounded-xl sm:h-fit sm:max-w-[425px]">
        {modalState === 0 && (
          <div className="flex flex-col justify-center gap-8">
            <Image
              src="Criarte.svg"
              alt="Criart"
              width={110}
              height={110}
              className="mt-6 mx-auto"
            />
            <DialogTitle className="font-bold text-6xl mx-auto">
              Olá!
            </DialogTitle>
            <div className="flex flex-col items-center justify-center gap-8 mt-12 mb-6">
              <Button
                onClick={openSignIn}
                className="font-semibold cursor-pointer hover:bg-mint/70 bg-mint inset-shadow-sm text-bla inset-shadow-black/40 text-xl py-7 px-7 rounded-3xl"
              >
                Já possuo Cadastro
              </Button>
              <Button
                onClick={openSignUp}
                className="mt-5 font-semibold cursor-pointer hover:bg-solar/70 bg-solar inset-shadow-sm text-bla inset-shadow-black/40 text-xl py-7 px-7 rounded-3xl"
              >
                Quero me Cadastrar
              </Button>
              <DialogClose className="mb-6 underline underline-offset-2">
                Continuar sem login
              </DialogClose>
            </div>
          </div>
        )}
        {modalState === 1 && (
          <SignIn onSuccess={() => setIsDialogOpen(false)}>
            <button
              onClick={openInitial}
              className="bg-transparent cursor-pointer"
            >
              <FiChevronLeft size={28} />
            </button>
          </SignIn>
        )}
        {modalState === 2 && (
          <SignUp>
            <button
              onClick={openInitial}
              className="bg-transparent cursor-pointer"
            >
              <FiChevronLeft size={28} />
            </button>
          </SignUp>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthenticationModal;
