'use client';

import { PhotoGallery } from '@/components/features/artisan/add-product/photo-gallery';
import { PriceStockForm } from '@/components/features/artisan/add-product/price-stock-form';
import { ProductInfoForm } from '@/components/features/artisan/add-product/product-info-form';
import { materiaPrima } from '@/constants/materia-prima';
import { tecnicas } from '@/constants/tecnicas';
import { useProductForm } from '@/hooks/use-product-form';
import { productApi } from '@/services/api';
import { ProductForm } from '@/types/product-form';
import { AxiosError } from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAdd } from 'react-icons/io5';
import { toast, Toaster } from 'sonner';

const AddProductPage = () => {
  const router = useRouter();
  const {
    photos,
    selectedPhotos,
    photoIds,
    isUploading,
    handlePhotoUpload,
    handlePhotoSelect,
    removeSelectedPhotos,
    selectAllPhotos,
  } = useProductForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      name: '',
      description: '',
      category: [],
      technical: [],
      unitPrice: '',
      stock: '',
      isCustomOrder: false,
      necessaryDays: '',
    },
  });

  const triggerFileUpload = () => {
    document.getElementById('photo-upload')?.click();
  };

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    if (isUploading) {
      toast.warning('Por favor, aguarde o término do upload das fotos.');
      return;
    }

    const productData = {
      title: data.name.trim(),
      description: data.description.trim(),
      priceInCents: Math.round(parseFloat(data.unitPrice) * 100),
      photosIds: photoIds,
      rawMaterialIds: data.category.map((c) => parseInt(c)),
      techniqueIds: data.technical.map((t) => parseInt(t)),
      stock: parseInt(data.stock),
      isCustomOrder: data.isCustomOrder,
      necessaryDays: data.isCustomOrder ? parseInt(data.necessaryDays) || 0 : 0,
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-10">
            {/* Mobile */}
            <div className="lg:hidden">
              <ProductInfoForm
                register={register}
                control={control}
                errors={errors}
                materiaPrima={materiaPrima}
                tecnicas={tecnicas}
              />

              <div className="mb-8 mt-8">
                <PhotoGallery
                  photos={photos as File[]}
                  selectedPhotos={selectedPhotos}
                  isMobile={true}
                  onPhotoSelect={handlePhotoSelect}
                  onRemoveSelected={removeSelectedPhotos}
                  onSelectAll={selectAllPhotos}
                  onTriggerUpload={triggerFileUpload}
                />
              </div>

              <PriceStockForm
                register={register}
                errors={errors}
                isDesktop={false}
              />
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-2 gap-8">
              <div>
                <ProductInfoForm
                  register={register}
                  control={control}
                  errors={errors}
                  materiaPrima={materiaPrima}
                  tecnicas={tecnicas}
                />

                <div className="mt-6">
                  <PriceStockForm
                    register={register}
                    errors={errors}
                    isDesktop={true}
                  />
                </div>
              </div>

              <div>
                <PhotoGallery
                  photos={photos as File[]}
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
                    : 'bg-[#2AAA4C] hover:bg-green-600 cursor-pointer'
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
