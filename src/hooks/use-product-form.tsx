import { uploadApi } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
export type PhotoType = File | { id: string; url: string };
export const useProductForm = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addApiPhotos = useCallback(
    (apiPhotos: { id: string; url: string }[]) => {
      setPhotos((prev) => [...apiPhotos, ...prev].slice(0, 5));
    },
    [],
  );

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      setPhotos((prev) => [...prev, ...newPhotos].slice(0, 5));
    }
  };

  const handlePhotoSelect = (index: number) => {
    setSelectedPhotos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const removeSelectedPhotos = () => {
    setPhotos((prev) =>
      prev.filter((_, index) => !selectedPhotos.includes(index)),
    );
    setSelectedPhotos([]);
  };

  const selectAllPhotos = () => {
    setSelectedPhotos(photos.map((_, index) => index));
  };

  const uploadImage = async (file: File): Promise<{ attachmentId: string }> => {
    try {
      const result = await uploadApi.uploadFile(file);
      return result;
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
      throw error;
    }
  };

  useEffect(() => {
    const uploadPhotos = async () => {
      const filesToUpload = photos.filter(
        (photo) => photo instanceof File,
      ) as File[];

      if (filesToUpload.length === 0) {
        setPhotoIds([]);
        return;
      }

      setIsUploading(true);
      const uploadedPhotoIds: string[] = [];

      try {
        for (const file of filesToUpload) {
          const result = await uploadImage(file);
          uploadedPhotoIds.push(result.attachmentId);
        }
        setPhotoIds(uploadedPhotoIds);
      } catch (error) {
        console.error('Erro ao fazer upload das fotos:', error);
      } finally {
        setIsUploading(false);
      }
    };

    uploadPhotos();
  }, [photos]);

  return {
    photos,
    addApiPhotos,
    selectedPhotos,
    photoIds,
    isUploading,
    handlePhotoUpload,
    handlePhotoSelect,
    removeSelectedPhotos,
    selectAllPhotos,
  };
};
