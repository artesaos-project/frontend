import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export const ErrorBanner = () => (
  <div className="flex items-center text-center justify-center bg-salmon text-white rounded-2xl py-4 mb-4 text-[10px] md:text-xs font-bold">
    <FaExclamationTriangle className="m-1" size={14} />
    <span>Campo obrigatório ou com formato inválido.</span>
  </div>
);

interface UIMessageProps {
  message: string;
}

export const UIMessage = ({ message }: UIMessageProps) => {
  const isSuccess = message.includes('sucesso');
  const bannerColor = isSuccess ? 'bg-mint-600' : 'bg-salmon';

  return (
    <div
      className={`mb-4 py-4 rounded-lg text-xs text-center ${bannerColor} text-white`}
    >
      <div className="flex items-center justify-center">
        {!isSuccess && <FaExclamationTriangle size={16} className="mr-2" />}
        <span>{message}</span>
      </div>
    </div>
  );
};

export const TermsAgreement = () => (
  <div className="text-sm text-gray-600 text-center mb-6 font-normal">
    <p>
      Ao continuar, você concorda com os
      <br />
      <a href="#" className="underline text-black">
        Termos de Uso e Privacidade
      </a>
    </p>
  </div>
);

interface ArtisanInfoProps {
  popoverRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export const ArtisanInfo = ({ popoverRef, onClose }: ArtisanInfoProps) => (
  <div
    ref={popoverRef}
    className="bg-white text-black p-5 rounded-3xl shadow-lg max-w-xs text-center relative"
  >
    <button
      onClick={onClose}
      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
      aria-label="Fechar"
    >
      ×
    </button>
    <p className="font-bold mb-2">Artesão credenciado</p>
    <p className="text-xs">
      Marque essa opção se você é artesão(a) cadastrado e faz parte da
      associação vinculada à <strong>Fundacc</strong> (Fundação Educacional e
      Cultural de Caraguatatuba). Isso garante acesso a funcionalidades
      exclusivas para membros reconhecidos.
    </p>
  </div>
);
