import AuthButton from '@/components/common/auth-button';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import { uploadApi } from '@/services/api';
import { useRef, useState } from 'react';
import { FaRegImage } from 'react-icons/fa6';
import { LuVideo } from 'react-icons/lu';
import { TbTrash } from 'react-icons/tb';

function ArtisanStepMedia({ onNext }: { onNext: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<File[]>([]);

  const handleNext = async () => {
    try {
      const uploadedFiles = await Promise.all(
        media.map((file) => uploadApi.uploadFile(file)),
      );
      const attachmentIds = uploadedFiles.map((file) => file.attachmentId);
      useArtisanRegister.getState().update({ attachmentIds });
    } catch (error) {
      console.error('Error uploading media files:', error);
      return;
    }
    onNext();
  };

  const handleCustomClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setMedia((prev) => [...prev, ...Array.from(files as FileList)]);
  };

  const handleRemove = () => {
    setMedia([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveOne = (idxToRemove: number) => {
    setMedia((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <div className="text-midnight">
      <h1 className="text-2xl font-bold mb-2">Mostre suas criações</h1>
      <h2 className="text-md italic mb-1">
        Adicione fotos e/ou vídeos de seus trabalhos.
      </h2>
      <p className="text-md mt-4 italic font-bold">Mídias</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleFilesChange}
      />
      <button
        type="button"
        onClick={handleCustomClick}
        className="flex flex-row w-full mb-4 border-2 mt-4 border-dashed justify-center gap-15 items-center border-sakura rounded-xl p-6 text-midnight text-center hover:bg-sakura-100 transition"
      >
        <div className="flex flex-row items-center text-sakura">
          <FaRegImage size={40} />
          <span>Foto</span>
        </div>
        <div className="flex flex-row items-center text-sakura">
          <LuVideo size={40} />
          <span>Vídeo</span>
        </div>
      </button>

      <div className="flex flex-wrap gap-4 mb-4">
        {media.map((file, idx) => {
          const url = URL.createObjectURL(file);
          if (file.type.startsWith('image/')) {
            return (
              <img
                key={idx}
                src={url}
                alt={file.name}
                className="w-36 h-32 object-cover rounded-lg border"
                onLoad={() => URL.revokeObjectURL(url)}
                onClick={handleRemoveOne.bind(null, idx)}
              />
            );
          }
          if (file.type.startsWith('video/')) {
            return (
              <video
                key={idx}
                src={url}
                controls
                className="w-36 h-32 object-cover rounded-lg border"
                onLoadedData={() => URL.revokeObjectURL(url)}
                onClick={handleRemoveOne.bind(null, idx)}
              />
            );
          }
          return null;
        })}
      </div>
      <AuthButton
        className="mb-4 bg-olivine"
        text=" + Adicionar"
        onClick={handleCustomClick}
      />
      <AuthButton
        className=" bg-sakura hover:bg-salmon mb-15"
        text="Remover todas as mídias"
        onClick={handleRemove}
        icon={<TbTrash size={20} className="inline-block mr-2" />}
      />
      <AuthButton onClick={handleNext} />
    </div>
  );
}

export default ArtisanStepMedia;
