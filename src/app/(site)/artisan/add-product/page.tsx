'use client';

import { PhotoGallery } from '@/components/features/artisan/add-product/photo-gallery';
import { PriceStockForm } from '@/components/features/artisan/add-product/price-stock-form';
import { ProductInfoForm } from '@/components/features/artisan/add-product/product-info-form';
import { Button } from '@/components/ui/button';
import { materiaPrima } from '@/constants/materia-prima';
import { tecnicas } from '@/constants/tecnicas';
import { useProductForm } from '@/hooks/use-product-form';
import { productApi } from '@/services/api';
import { ProductForm } from '@/types/product-form';
import { AxiosError } from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAdd } from 'react-icons/io5';
import { toast } from 'sonner';

const AddProductPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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

    if (photoIds.length === 0) {
      toast.error('Adicione pelo menos uma foto ao produto.');
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

    setIsLoading(true);
    try {
      await productApi.create(productData);
      toast.success('Produto adicionado com sucesso!');
      router.back();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || 'Ocorreu um erro desconhecido.';
        toast.error(message);
      } else {
        toast.error('Ocorreu um erro ao criar o produto.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#A6E3E9] text-midnight">
      <div className="w-11/12 md:w-10/12 mx-auto pt-10 pb-10">
        <div className="flex items-center mb-6">
          <ArrowLeft
            className="w-6 h-6 text-gray-700 mr-3 cursor-pointer hover:text-gray-900"
            onClick={() => router.back()}
          />
          <h1 className="text-xl font-bold text-gray-800">Adicionar produto</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-8">
              <div className="lg:col-start-1 lg:row-start-1">
                <ProductInfoForm
                  register={register}
                  control={control}
                  errors={errors}
                  materiaPrima={materiaPrima}
                  tecnicas={tecnicas}
                />
              </div>

              <div className="mt-8 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
                <PhotoGallery
                  photos={photos as File[]}
                  selectedPhotos={selectedPhotos}
                  onPhotoSelect={handlePhotoSelect}
                  onRemoveSelected={removeSelectedPhotos}
                  onSelectAll={selectAllPhotos}
                  onTriggerUpload={triggerFileUpload}
                  isMobile={isMobile}
                />
              </div>

              <div className="mt-6 lg:mt-8 lg:col-start-1 lg:row-start-2">
                <PriceStockForm register={register} errors={errors} />
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

            <div className="flex w-full mt-6">
              <Button
                type="submit"
                variant="primary"
                disabled={isUploading || isLoading}
                className="w-full disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                <span>
                  {isUploading || isLoading
                    ? 'Adicionando...'
                    : 'Adicionar Produto'}
                </span>
                <IoAdd className="h-5 w-5 rounded-full bg-white/25" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
