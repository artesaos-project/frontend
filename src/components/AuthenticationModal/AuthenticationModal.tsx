'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useStoreUser from '@/hooks/use-store-user';
import { UserProps } from '@/types/user-props';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignUpArtesian from './SignUpArtesian';

function AuthenticationModal({ color }: { color?: string }) {
  const [modalState, setModalState] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [artisanId, setArtisanId] = useState<string | null>(null);
  const [pendingUser, setPendingUser] = useState<UserProps | null>(null);
  const setUser = useStoreUser((state) => state.setUser);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  function openInitial() {
    setModalState(0);
  }
  function openSignIn() {
    setModalState(1);
  }
  function openSignUp() {
    setModalState(2);
  }

  function handleClose(open: boolean) {
    if (!open) {
      if (modalState === 2 || modalState === 3) {
        setShowConfirmClose(true);
      } else {
        setIsDialogOpen(false);
      }
    } else {
      setIsDialogOpen(open);
    }
  }

  function confirmClose() {
    setPendingUser(null);
    if (pendingUser) setUser(pendingUser);
    setShowConfirmClose(false);
    setIsDialogOpen(false);
    setModalState(0);
  }

  function cancelClose() {
    setShowConfirmClose(false);
  }

  function openArtisan(userId: string, userData: UserProps) {
    setArtisanId(userId);
    setPendingUser(userData);
    setModalState(3);
  }

  function handleArtisanSuccess() {
    setIsDialogOpen(false);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setPendingUser(null);
      if (pendingUser) {
        setUser(pendingUser);
      }
      setModalState(0);
    }, 3000);
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              openInitial();
              setIsDialogOpen(true);
            }}
            variant="outline"
            className={`bg-transparent cursor-pointer hover:bg-white/20 hover:text-${
              color || 'white'
            } border-${color || 'white'} text-${
              color || 'white'
            } inset-shadow-black/50 inset-shadow-sm p-6 rounded-full underline underline-offset-2 text-xs`}
          >
            Entre ou cadastre-se
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full sm:max-h-[99vh] h-[95vh] overflow-y-auto rounded-xl sm:h-fit lg:min-w-4/12">
          {modalState === 0 && (
            <div className="flex flex-col justify-center gap-8">
              <Image
                src="/Criarte.svg"
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
            <SignUp
              onClose={() => setIsDialogOpen(false)}
              onArtisanSignup={openArtisan}
            >
              <button
                onClick={openInitial}
                className="bg-transparent cursor-pointer"
              >
                <FiChevronLeft size={28} />
              </button>
            </SignUp>
          )}
          {modalState === 3 && (
            <SignUpArtesian
              artisanId={artisanId}
              onSuccess={handleArtisanSuccess}
            >
              <button
                onClick={() => {
                  openInitial();
                }}
                className="bg-transparent cursor-pointer"
              >
                <FiChevronLeft size={28} />
              </button>
            </SignUpArtesian>
          )}
        </DialogContent>
      </Dialog>

      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
          ref={modalRef}
        >
          <div className="bg-white rounded-2xl p-8 mx-4 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="w-10 h-10 text-green-600" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Cadastro Enviado!
              </h3>

              <p className="text-gray-600">
                Sua solicitação de cadastro como artesão foi enviada para
                análise. Você receberá uma resposta em breve.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600" />
                <span>Redirecionando...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showConfirmClose} onOpenChange={setShowConfirmClose}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Deseja sair?
          </DialogTitle>
          <p className="text-center text-gray-600 mb-6">
            Você perderá todos os dados inseridos nos campos. Tem certeza que
            deseja continuar?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={cancelClose}
              variant="outline"
              className="px-6 py-2"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmClose}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Sim, sair
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuthenticationModal;
