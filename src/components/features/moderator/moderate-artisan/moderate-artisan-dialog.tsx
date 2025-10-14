'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface ModerateArtisanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  artisanName: string;
  action: 'reject' | 'approve' | 'deactivate';
  isLoading?: boolean;
}

function ModerateArtisanDialog({
  isOpen,
  onClose,
  onConfirm,
  artisanName,
  action,
  isLoading = false,
}: ModerateArtisanDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(action === 'reject' ? reason : undefined);
    setReason('');
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto border">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Rejeitar Artesão
          </DialogTitle>
          <DialogDescription className="text-gray-600 leading-relaxed">
            Tem certeza que deseja rejeitar o artesão <b>{artisanName}</b>? Esta
            ação impedirá que ele adicione produtos ou serviços à plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <label htmlFor="reason" className="text-sm font-medium text-gray-700">
            Motivo {action === 'reject' ? '(obrigatório)' : '(opcional)'}:
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={`Digite o motivo da ${action === 'reject' ? 'rejeição' : 'desativação'}...`}
            className="w-full p-3 border border-gray-300 mt-2 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-700 hover:bg-white hover:text-red-700 border hover:border-red-700 text-white"
          >
            {isLoading ? 'Processando...' : 'Rejeitar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModerateArtisanDialog;
