'use client';

import { PhotoGallery } from '@/components/features/artisan/add-product/photo-gallery';
import { PriceStockForm } from '@/components/features/artisan/add-product/price-stock-form';
import { ProductInfoForm } from '@/components/features/artisan/add-product/product-info-form';
import { materiaPrima } from '@/constants/materia-prima';
import { tecnicas } from '@/constants/tecnicas';
import { useProductForm } from '@/hooks/use-product-form';
import { productApi } from '@/services/api';
import { ArrowLeft } from 'lucide-react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoAdd } from 'react-icons/io5';
import { toast, Toaster } from 'sonner';

const AddProductPage = () => {
  const router = useRouter();
  const {
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
  } = useProductForm();

  const triggerFileUpload = () => {
    document.getElementById('photo-upload')?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categories = Array.isArray(form.category)
      ? form.category
      : form.category
        ? [form.category]
        : [];
    const techniques = Array.isArray(form.technical)
      ? form.technical
      : form.technical
        ? [form.technical]
        : [];

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.unitPrice ||
      categories.length === 0 ||
      !form.stock
    ) {
      toast.warning('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (isUploading) {
      toast.warning('Por favor, aguarde o término do upload das fotos.');
      return;
    }

    const productData = {
      title: form.name.trim(),
      description: form.description.trim(),
      priceInCents: Math.round(parseFloat(form.unitPrice) * 100),
      photosIds: photoIds,
      rawMaterialIds: categories.map((c) => parseInt(c)),
      techniqueIds: techniques.map((t) => parseInt(t)),
      stock: parseInt(form.stock),
      isCustomOrder: form.isCustomOrder,
      necessaryDays: form.isCustomOrder ? parseInt(form.necessaryDays) || 0 : 0,
    };

    try {
      await productApi.create(productData);
      toast.success('Produto adicionado com sucesso!');
      router.back();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#A6E3E9] text-midnight">
      <Toaster richColors position="bottom-right" />
      <div className="w-10/12 mx-auto pt-10">
        <div className="flex items-center mb-6">
          <ArrowLeft
            className="w-6 h-6 text-gray-700 mr-3 cursor-pointer hover:text-gray-900"
            onClick={() => router.back()}
          />
          <h1 className="text-xl font-bold text-gray-800">Adicionar produto</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-10">
            {/* Mobile */}
            <div className="lg:hidden">
              <ProductInfoForm
                form={form}
                materiaPrima={materiaPrima}
                tecnicas={tecnicas}
                onInputChange={handleInputChange}
              />

              <div className="mb-8 mt-8">
                <PhotoGallery
                  photos={photos}
                  selectedPhotos={selectedPhotos}
                  isMobile={true}
                  onPhotoSelect={handlePhotoSelect}
                  onRemoveSelected={removeSelectedPhotos}
                  onSelectAll={selectAllPhotos}
                  onTriggerUpload={triggerFileUpload}
                />
              </div>

              <PriceStockForm
                form={form}
                onInputChange={handleInputChange}
                isDesktop={false}
              />
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-2 gap-8">
              <div>
                <ProductInfoForm
                  form={form}
                  materiaPrima={materiaPrima}
                  tecnicas={tecnicas}
                  onInputChange={handleInputChange}
                />

                <div className="mt-6">
                  <PriceStockForm
                    form={form}
                    onInputChange={handleInputChange}
                    isDesktop={true}
                  />
                </div>
              </div>

              <div>
                <PhotoGallery
                  photos={photos}
                  selectedPhotos={selectedPhotos}
                  isMobile={false}
                  onPhotoSelect={handlePhotoSelect}
                  onRemoveSelected={removeSelectedPhotos}
                  onSelectAll={selectAllPhotos}
                  onTriggerUpload={triggerFileUpload}
                />
              </div>
            </div>

            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <div className="flex w-full text-sm space-x-4 mt-4">
              <button
                type="submit"
                disabled={isUploading}
                className={`flex px-6 gap-2 py-2 w-full justify-center items-center rounded-lg transition-all ${
                  isUploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#2AAA4C] hover:bg-green-600'
                } text-white`}
              >
                {isUploading ? 'Enviando fotos...' : 'Adicionar Produto'}
                <IoAdd className="bg-gray-200/50 rounded-2xl" color="white" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
