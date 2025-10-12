import { Upload } from 'lucide-react';
import React from 'react';
import { FaRegImage } from 'react-icons/fa6';

interface PhotoSlotProps {
  index: number;
  photo?: File;
  onClick: () => void;
  isSelected: boolean;
}

export const PhotoSlot: React.FC<PhotoSlotProps> = ({
  index,
  photo,
  onClick,
  isSelected,
}) => {
  const isMainPhoto = index === 0;

  return (
    <div
      className={`${
        isMainPhoto
          ? 'lg:col-span-2 lg:row-span-2 lg:w-full lg:h-66 col-span-4 row-span-1 w-full h-40'
          : 'lg:col-span-1 lg:row-span-1 lg:w-full lg:h-30 col-span-1 row-span-1 w-full h-20'
      } border-2 rounded-lg cursor-pointer transition-all flex items-center justify-center
        ${photo ? 'border-gray-300 bg-gray-50' : 'border-sakura bg-white hover:bg-gray-50'}
        ${isSelected ? 'ring-2 ring-red-400 border-red-400' : ''}
      `}
      onClick={onClick}
    >
      {photo ? (
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img
            src={URL.createObjectURL(photo)}
            alt={`Preview ${index}`}
            className="w-full h-full object-cover"
          />
          {isSelected && (
            <div className="bg-salmon rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-salmon rounded-full" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {isMainPhoto ? (
            <Upload className="w-6 h-6 text-sakura" />
          ) : (
            <FaRegImage className="w-6 h-6 text-sakura" />
          )}
        </div>
      )}
    </div>
  );
};
