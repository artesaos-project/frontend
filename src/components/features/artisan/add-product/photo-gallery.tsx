import { Button } from '@/components/ui/button';
import { PhotoType } from '@/hooks/use-photo';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { TbSelect, TbTrash } from 'react-icons/tb';
import { PhotoSlot } from './photo-slot';

interface PhotoGalleryProps {
  photos: PhotoType[];
  selectedPhotos: number[];
  isMobile?: boolean;
  onPhotoSelect: (index: number) => void;
  onRemoveSelected: () => void;
  onSelectAll: () => void;
  onTriggerUpload: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  selectedPhotos,
  isMobile = false,
  onPhotoSelect,
  onRemoveSelected,
  onSelectAll,
  onTriggerUpload,
}) => {
  const handleSlotClick = (index: number) => {
    if (photos[index]) {
      onPhotoSelect(index);
    } else if (photos.length < 5) {
      onTriggerUpload();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-salmon">Mídias</h2>
          <h3 className="text-sm text-midnight font-bold">Foto(s)</h3>
        </div>
        {selectedPhotos.length > 0 && (
          <button
            type="button"
            onClick={onRemoveSelected}
            className="flex items-center space-x-1 text-salmon hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Remover ({selectedPhotos.length})</span>
          </button>
        )}
      </div>

      {isMobile ? (
        <div className="mb-4">
          <div className="mb-3">
            <PhotoSlot
              index={0}
              photo={photos[0] as File}
              onClick={() => handleSlotClick(0)}
              isSelected={selectedPhotos.includes(0)}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => {
              const index = i + 1;
              return (
                <PhotoSlot
                  key={index}
                  index={index}
                  photo={photos[index] as File}
                  onClick={() => handleSlotClick(index)}
                  isSelected={selectedPhotos.includes(index)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 grid-rows-2 gap-3 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <PhotoSlot
              key={index}
              index={index}
              photo={photos[index] as File}
              onClick={() => handleSlotClick(index)}
              isSelected={selectedPhotos.includes(index)}
            />
          ))}
        </div>
      )}

      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 mb-4`}>
        Adicione até 5 fotos do seu produto. As fotos devem ser adicionadas na
        ordem (clique no próximo slot vazio).
      </p>

      <div className="flex mb-2 text-xs font-semibold">
        <Button
          type="button"
          variant="primary"
          className="p-2 w-full disabled:bg-gray-400 disabled:border-none rounded-lg"
          onClick={onTriggerUpload}
          disabled={photos.length >= 5}
        >
          + Adicionar Foto (Máximo 5)
        </Button>
      </div>

      <div
        className={`flex ${isMobile ? 'flex-col' : 'grid grid-cols-2'} ${isMobile ? 'mb-4' : 'mb-10'} text-xs gap-2 font-semibold`}
      >
        <Button
          type="button"
          variant="outlineSakura"
          className="p-2"
          onClick={onSelectAll}
          disabled={photos.length === 0}
        >
          <TbSelect className="mr-1" />
          Selecionar Fotos
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="p-2"
          onClick={onRemoveSelected}
        >
          <TbTrash className="mr-1" />
          Remover Fotos Selecionadas
        </Button>
      </div>
    </div>
  );
};
