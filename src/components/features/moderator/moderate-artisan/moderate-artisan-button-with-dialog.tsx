'use client';

import { useState } from 'react';
import ModerateArtisanButton from './moderate-artisan-button';
import ModerateArtisanDialog from './moderate-artisan-dialog';

interface ModerateArtisanButtonWithDialogProps {
  variant: 'reject';
  artisanName: string;
  onAction: (reason?: string) => void;
  isLoading?: boolean;
}

function ModerateArtisanButtonWithDialog({
  artisanName,
  onAction,
  isLoading = false,
  variant,
}: ModerateArtisanButtonWithDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    // Apenas botões que precisam de confirmação abrem o dialog
    setIsDialogOpen(true);
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

      {isDialogOpen && (
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
