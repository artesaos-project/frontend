import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpDialog({ isOpen, onClose }: HelpDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-midnight text-center">
            Precisa de Ajuda?
          </DialogTitle>
          <DialogDescription className="text-center text-midnight pt-2">
            Fale conosco através de um dos canais a seguir:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <HiMail className="text-sakura" size={24} />
            <div>
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <a
                href="mailto:contato@artesaos.com"
                className="text-sm text-midnight hover:text-sakura"
              >
                contato@artesaos.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <HiPhone className="text-olivine-600" size={24} />
            <div>
              <p className="text-xs text-gray-500 font-medium">Telefone</p>
              <a
                href="tel:+5511999999999"
                className="text-sm text-midnight hover:text-olivine-600"
              >
                (11) 99999-9999
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <HiLocationMarker className="text-amber-500" size={24} />
            <div>
              <p className="text-xs text-gray-500 font-medium">Endereço</p>
              <p className="text-sm text-midnight">Rua dos Artesãos, 123</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
