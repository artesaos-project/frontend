'use client';

import { useState } from 'react';
import ModerateArtisanButton from './moderate-artisan-button';
import ModerateArtisanDialog from './moderate-artisan-dialog';

interface ModerateArtisanButtonWithDialogProps {
  variant: 'approve' | 'reject' | 'activate' | 'deactivate' | 'edit';
  artisanName: string;
  onAction: (reason?: string) => void;
  isLoading?: boolean;
}

function ModerateArtisanButtonWithDialog({
  variant,
  artisanName,
  onAction,
  isLoading = false,
}: ModerateArtisanButtonWithDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    // Apenas botões que precisam de confirmação abrem o dialog
    if (variant === 'reject' || variant === 'deactivate') {
      setIsDialogOpen(true);
    } else {
      // Ações diretas (approve, activate, edit)
      onAction();
    }
  };

  const handleDialogConfirm = (reason?: string) => {
    onAction(reason);
    setIsDialogOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ModerateArtisanButton variant={variant} onClick={handleButtonClick} />

      {(variant === 'reject' || variant === 'deactivate') && isDialogOpen && (
        <ModerateArtisanDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onConfirm={handleDialogConfirm}
          artisanName={artisanName}
          action={variant}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default ModerateArtisanButtonWithDialog;
