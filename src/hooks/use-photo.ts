import { uploadApi } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export type PhotoType = File | { id: string; url: string };

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_PHOTOS = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const usePhoto = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<string[]>([]);
  const [coverPhotoId, setCoverPhotoId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);

  const validateFiles = useCallback((files: File[]): File[] => {
    const validFiles: File[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(
          `${file.name}: Tipo de arquivo não suportado. Use JPG, PNG ou WebP.`,
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        toast.error(
          `${file.name}: Arquivo muito grande (${sizeMB}MB). Máximo: 5MB.`,
        );
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  }, []);

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
      setPhotos(orderedPhotos.slice(0, MAX_PHOTOS));
      setCoverPhotoId(coverPhoto ? coverPhoto.id : null);
    },
    [],
  );

  const handlePhotoUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const validFiles = validateFiles(fileArray);

      if (validFiles.length === 0) return;

      setPhotos((prev) => {
        const currentCount = prev.length;
        const availableSlots = MAX_PHOTOS - currentCount;

        if (availableSlots <= 0) {
          toast.warning(`Máximo de ${MAX_PHOTOS} fotos atingido.`);
          return prev;
        }

        if (validFiles.length > availableSlots) {
          toast.warning(
            `Apenas ${availableSlots} foto(s) podem ser adicionadas.`,
          );
          return [...prev, ...validFiles.slice(0, availableSlots)];
        }

        return [...prev, ...validFiles];
      });

      event.target.value = '';
    },
    [validateFiles],
  );

  const handlePhotoSelect = useCallback((index: number) => {
    setSelectedPhotos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }, []);

  const removeSelectedPhotos = useCallback(() => {
    if (selectedPhotos.length === 0) {
      toast.warning('Selecione ao menos uma foto para remover.');
      return;
    }

    const removed = photos
      .map((photo, index) => (selectedPhotos.includes(index) ? photo : null))
      .filter(Boolean)
      .map((photo) =>
        photo && typeof photo === 'object' && 'id' in photo ? photo.id : '',
      )
      .filter((id) => id !== '');

    if (removed.length > 0) {
      setDeletedPhotos((prev) => [...prev, ...removed]);
    }

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
      toast.info('Foto de capa removida. Selecione uma nova foto de capa.');
    }

    setPhotos((prev) =>
      prev.filter((_, index) => !selectedPhotos.includes(index)),
    );
    setPhotoIds((prev) =>
      prev.filter((_, index) => !selectedPhotos.includes(index)),
    );
    setSelectedPhotos([]);

    toast.success(`${selectedPhotos.length} foto(s) removida(s) com sucesso.`);
  }, [selectedPhotos, photos, coverPhotoId]);

  const selectAllPhotos = useCallback(() => {
    setSelectedPhotos(photos.map((_, index) => index));
  }, [photos]);

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
          const result = await uploadApi.uploadFile(file);
          uploadedPhotoIds.push(result.attachmentId);
        }
        setPhotoIds(uploadedPhotoIds);
        setNewPhotos(uploadedPhotoIds);
        if (!coverPhotoId && uploadedPhotoIds.length > 0) {
          setCoverPhotoId(uploadedPhotoIds[0]);
        }
      } catch (error) {
        console.error('Erro ao fazer upload das fotos:', error);
        toast.error('Erro ao fazer upload das fotos. Tente novamente.');
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
