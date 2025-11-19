import { uploadApi } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
export type PhotoType = File | { id: string; url: string };
export const useProductForm = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<string[]>([]);
  const [coverPhotoId, setCoverPhotoId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);

  const addApiPhotos = useCallback(
    (apiPhotos: { id: string; url: string }[], coverPhotoUrl?: string) => {
      let coverPhoto: { id: string; url: string } | undefined;
      let otherPhotos = apiPhotos;

      if (coverPhotoUrl) {
        coverPhoto = apiPhotos.find((photo) => photo.url === coverPhotoUrl);
        otherPhotos = apiPhotos.filter((photo) => photo.url !== coverPhotoUrl);
      }

      const orderedPhotos = coverPhoto
        ? [coverPhoto, ...otherPhotos]
        : apiPhotos;
      setPhotos(orderedPhotos.slice(0, 5));
      setCoverPhotoId(coverPhoto ? coverPhoto.id : null);
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
    const removed = photos
      .map((photo, index) => (selectedPhotos.includes(index) ? photo : null))
      .filter(Boolean)
      .map((photo) =>
        photo && typeof photo === 'object' && 'id' in photo ? photo.id : '',
      );
    setDeletedPhotos((prev) => [...prev, ...removed]);

    const isCoverBeingRemoved = selectedPhotos.some((index) => {
      const photo = photos[index];
      return (
        photo &&
        typeof photo === 'object' &&
        'id' in photo &&
        photo.id === coverPhotoId
      );
    });

    if (isCoverBeingRemoved) {
      setCoverPhotoId(null);
    }

    setPhotos((prev) =>
      prev.filter((_, index) => !selectedPhotos.includes(index)),
    );
    setSelectedPhotos([]);
    setPhotoIds((prev) =>
      prev.filter((_, index) => !selectedPhotos.includes(index)),
    );
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
        setNewPhotos(uploadedPhotoIds);
        if (!coverPhotoId && uploadedPhotoIds.length > 0) {
          setCoverPhotoId(uploadedPhotoIds[0]);
        }
      } catch (error) {
        console.error('Erro ao fazer upload das fotos:', error);
      } finally {
        setIsUploading(false);
      }
    };

    uploadPhotos();
  }, [photos, coverPhotoId]);

  return {
    photos,
    setPhotos,
    addApiPhotos,
    selectedPhotos,
    newPhotos,
    deletedPhotos,
    coverPhotoId,
    photoIds,
    isUploading,
    handlePhotoUpload,
    handlePhotoSelect,
    removeSelectedPhotos,
    selectAllPhotos,
  };
};
