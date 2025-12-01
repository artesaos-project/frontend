'use client';

import AlertDialog from '@/components/common/alert-dialog';
import { PhotoGallery } from '@/components/features/artisan/add-product/photo-gallery';
import { PriceStockForm } from '@/components/features/artisan/add-product/price-stock-form';
import { ProductInfoForm } from '@/components/features/artisan/add-product/product-info-form';
import { Button } from '@/components/ui/button';
import { usePhoto } from '@/hooks/use-photo';
import { productApi } from '@/services/api';
import { ProductForm } from '@/types/product-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { toast } from 'sonner';

const EditProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = use(params);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    photos,
    addApiPhotos,
    newPhotos,
    deletedPhotos,
    coverPhotoId,
    selectedPhotos,
    photoIds,
    isUploading,
    handlePhotoUpload,
    handlePhotoSelect,
    removeSelectedPhotos,
    selectAllPhotos,
  } = usePhoto();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
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

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      const formValues: ProductForm = {
        name: product.title,
        description: product.description,
        category: [product.categoryId].toLocaleString().split(','),
        technical: [1, 2, 3].toLocaleString().split(','),
        unitPrice: (product.priceInCents / 100).toFixed(2),
        stock: product.stock.toString(),
        isCustomOrder: false,
        necessaryDays: '',
      };
      reset(formValues);
      const apiPhotos = (product.photos || []).map((url, index) => ({
        id: String((product.photosIds || [])[index] || ''),
        url,
      }));
      addApiPhotos(apiPhotos, product.coverPhoto);
    }
  }, [product, reset, addApiPhotos]);

  const updateProductMutation = useMutation({
    mutationFn: (productData: {
      title: string;
      description: string;
      priceInCents: number;
      photosIds: string[];
      newPhotos: string[];
      deletedPhotos: string[];
      coverPhotoId: string;
      rawMaterialIds: number[];
      techniqueIds: number[];
      stock: number;
      isCustomOrder: boolean;
      necessaryDays: number;
    }) => productApi.update(id, productData),
    onSuccess: () => {
      toast.success('Produto atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      router.back();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || 'Erro ao atualizar o produto.';
        toast.error(message);
      } else {
        toast.error('Erro ao atualizar o produto.');
      }
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: () => productApi.delete(id),
    onSuccess: () => {
      toast.success('Produto excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.back();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || 'Erro ao excluir o produto.';
        toast.error(message);
      } else {
        toast.error('Erro ao excluir o produto.');
      }
    },
    onSettled: () => {
      setIsAlertOpen(false);
    },
  });

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    if (isUploading) {
      toast.warning('Por favor, aguarde o término do upload das fotos.');
      return;
    }
    if (photos.length === 0 || !coverPhotoId) {
      toast.error('Selecione uma foto de capa antes de salvar o produto.');
      return;
    }

    const productData = {
      title: data.name.trim(),
      description: data.description.trim(),
      priceInCents: Math.round(parseFloat(data.unitPrice) * 100),
      photosIds: photoIds,
      newPhotos,
      deletedPhotos,
      coverPhotoId: photoIds[0] || coverPhotoId,
      rawMaterialIds: data.category.map((c) => parseInt(c)),
      techniqueIds: data.technical.map((t) => parseInt(t)),
      stock: parseInt(data.stock),
      isCustomOrder: data.isCustomOrder,
      necessaryDays: data.isCustomOrder ? parseInt(data.necessaryDays) || 0 : 0,
    };

    updateProductMutation.mutate(productData);
  };

  const handleDelete = () => {
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    deleteProductMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#A6E3E9] text-midnight">
        <div className="w-10/12 mx-auto pt-10">
          <div className="flex items-center mb-6">
            <ArrowLeft
              className="w-6 h-6 text-gray-700 mr-3 cursor-pointer hover:text-gray-900"
              onClick={() => router.back()}
            />
            <h1 className="text-xl font-bold text-gray-800">Editar produto</h1>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center">
            <p className="text-gray-600">Carregando produto...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#A6E3E9] text-midnight">
      <div className="w-10/12 mx-auto pt-10">
        <div className="flex items-center mb-6">
          <ArrowLeft
            className="w-6 h-6 text-gray-700 mr-3 cursor-pointer hover:text-gray-900"
            onClick={() => router.back()}
          />
          <h1 className="text-xl font-bold text-gray-800">Editar produto</h1>
        </div>

        <AlertDialog
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onConfirm={confirmDelete}
          dialogTitle="Você tem certeza?"
          dialogMessage={{
            text: 'Essa ação não pode ser desfeita. O produto será excluído permanentemente.',
            color: 'text-red-500',
          }}
          textButton1="Sim"
          textButton2="Cancelar"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-10">
            {/* Mobile */}
            <div className="lg:hidden">
              <ProductInfoForm
                register={register}
                control={control}
                errors={errors}
              />

              <div className="mb-8 mt-8">
                <PhotoGallery
                  photos={photos as []}
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
                  photos={photos as []}
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

            <div className="grid grid-cols-1 w-full text-sm mt-4 gap-2">
              <Button
                type="submit"
                disabled={isUploading || updateProductMutation.isPending}
                variant="primary"
                className={`w-full ${
                  isUploading || updateProductMutation.isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-olivine-600 hover:bg-white hover:text-olivine-600'
                } text-white`}
              >
                <FaCheck />
                {isUploading
                  ? 'Enviando fotos...'
                  : updateProductMutation.isPending
                    ? 'Atualizando...'
                    : 'Atualizar Produto'}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleDelete}
                disabled={deleteProductMutation.isPending}
              >
                <FaRegTrashAlt />
                {deleteProductMutation.isPending
                  ? 'Excluindo...'
                  : 'Excluir Produto'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
