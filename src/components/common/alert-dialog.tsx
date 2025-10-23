import { FaX } from 'react-icons/fa6';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: React.ReactNode;
  dialogTitle?: string;
  dialogMessage?: {
    text: string;
    color?: string;
  };
  textButton1?: string;
  textButton2?: string;
};

function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  icon,
  dialogTitle = '',
  dialogMessage = { text: '', color: '' },
  textButton1 = 'Sair',
  textButton2 = 'Voltar',
}: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex w-11/12 max-w-sm flex-col items-center justify-center rounded-4xl bg-white p-8 shadow-lg">
        <div className="self-end cursor-pointer">
          <FaX size={12} onClick={onClose} />
        </div>
        <div className="h-8 mb-2">{icon}</div>
        <h1 className="text-center font-bold text-midnight">{dialogTitle}</h1>
        <h2 className={`text-center mb-4 ${dialogMessage.color}`}>
          {dialogMessage.text}
        </h2>
        <div className="mt-4 flex w-full justify-between gap-4 text-white">
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-10 flex-1 border border-salmon items-center 
            justify-center rounded-lg bg-salmon p-4 cursor-pointer hover:bg-white
            hover:text-salmon transition duration-200"
          >
            {textButton1}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 border border-olivine-600 flex-1 items-center
             justify-center rounded-lg bg-olivine-600 p-4 cursor-pointer
              hover:bg-white hover:text-olivine-600 transition duration-200"
          >
            {textButton2}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDialog;
