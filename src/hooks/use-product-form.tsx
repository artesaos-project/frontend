import { uploadApi } from '@/services/api';
import { ProductForm } from '@/types/product-form';
import { useEffect, useState } from 'react';

export const useProductForm = () => {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    category: [],
    technical: [],
    unitPrice: '',
    stock: '',
    isCustomOrder: false,
    necessaryDays: '',
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    field: keyof ProductForm,
    value: string | boolean | string[],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
      if (photos.length === 0) {
        setPhotoIds([]);
        return;
      }

      setIsUploading(true);
      const uploadedPhotoIds: string[] = [];

      try {
        for (const photo of photos) {
          const result = await uploadImage(photo);
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
    form,
    photos,
    selectedPhotos,
    photoIds,
    isUploading,
    handleInputChange,
    handlePhotoUpload,
    handlePhotoSelect,
    removeSelectedPhotos,
    selectAllPhotos,
  };
};
