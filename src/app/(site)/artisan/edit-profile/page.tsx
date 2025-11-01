'use client';
import { PhotoSlot } from '@/components/features/artisan/add-product/photo-slot';
import InputField from '@/components/features/artisan/input-field';
import { Button } from '@/components/ui/button';
import { useProductForm } from '@/hooks/use-product-form';
import useStoreUser from '@/hooks/use-store-user';
import { authApi } from '@/services/api';
import { GetMyProfile } from '@/types/artisan';
import { AxiosError } from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TbTrash } from 'react-icons/tb';
import { toast, Toaster } from 'sonner';

function EditProfilePage() {
  const setUser = useStoreUser((state) => state.setUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<GetMyProfile>({ defaultValues: {} });
  const {
    photos,
    selectedPhotos,
    handlePhotoSelect,
    removeSelectedPhotos,
    handlePhotoUpload,
    photoIds,
    setPhotos,
  } = useProductForm();
  const router = useRouter();

  const handleSlotClick = (index: number) => {
    if (photos[index]) handlePhotoSelect(index);
    else if (photos.length < 5)
      document.getElementById('photo-upload')?.click();
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');

    if (!digits) return '';

    if (digits.length <= 4) {
      return digits;
    }

    if (digits.length <= 8) {
      return digits.replace(/(\d{4})(\d{1,4})/, '$1-$2');
    }

    return digits.replace(/(\d{5})(\d{1,4})/, '$1-$2');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authApi.getMe();
        if (profile) {
          const phone = profile.user.phone || '';
          let ddd = '';
          let numero = '';
          const match =
            phone.match(/^\+55(\d{2})(\d{4,5})(\d{4})$/) ||
            phone.match(/^\(?(\d{2})\)?[\s-]?(\d{4,5})[\s-]?(\d{4})$/);
          if (match) {
            ddd = match[1];
            numero = `${match[2]}-${match[3]}`;
          }
          const mappedData = { ...profile.user, ddd, phone: numero };
          reset(mappedData);
          if (profile.user.avatar) {
            setPhotos([{ id: '1', url: profile.user.avatar }]);
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message);
        }
      }
    };
    fetchProfile();
  }, [reset, setPhotos]);

  const onSubmit: SubmitHandler<GetMyProfile> = async (data) => {
    try {
      const updatedData: Partial<GetMyProfile> = {
        ...data,
        phone: data.ddd && data.phone ? `(${data.ddd}) ${data.phone}` : '',
        avatarId: photoIds[0] || null,
      };
      delete updatedData.ddd;
      await authApi.updateMe(updatedData);
      const updatedProfile = await authApi.getMe();
      setUser({
        userId: updatedProfile.user.id,
        userName: updatedProfile.user.name,
        userPhoto: updatedProfile.user.avatar,
        artisanUserName: updatedProfile.user.artisan?.artisanUserName,
      });
      toast.success('Perfil atualizado com sucesso!');
      if (data.artisan?.artisanUserName)
        router.push(`/artisan/${data.artisan.artisanUserName}`);
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
      <div className="w-11/12 md:w-10/12 mx-auto pt-6 md:pt-10">
        <div className="flex items-center mb-6">
          <ArrowLeft
            className="w-6 h-6 text-gray-700 mr-3 cursor-pointer hover:text-gray-900"
            onClick={() => router.back()}
          />
          <h1 className="text-lg md:text-xl font-bold text-midnight">
            Editar perfil
          </h1>
        </div>
        <div className="bg-white p-6 md:p-10 rounded-3xl text-midnight">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <h2 className="font-bold text-salmon text-xl md:text-2xl">
              Dados Pessoais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
              <div className="flex flex-col items-center md:items-start">
                <label
                  htmlFor="photo-upload"
                  className="font-semibold text-sm mb-2 self-start"
                >
                  Foto de Perfil
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <PhotoSlot
                  key={1}
                  index={1}
                  photo={photos[0] as File}
                  onClick={() => handleSlotClick(0)}
                  isSelected={selectedPhotos.includes(0)}
                  isPersonalized={true}
                  className="h-55 w-full mb-4"
                />
                <div className="flex flex-col gap-2 w-full mb-4">
                  <Button
                    type="button"
                    variant="primary"
                    className="transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white disabled:border-gray-400 cursor-pointer"
                    onClick={() => handleSlotClick(0)}
                    disabled={photos.length >= 1}
                  >
                    + Adicionar Nova Foto
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex justify-center items-center cursor-pointer"
                    onClick={removeSelectedPhotos}
                    disabled={selectedPhotos.length === 0}
                  >
                    <TbTrash className="mr-1" size={14} />
                    Remover Foto
                  </Button>
                </div>
              </div>

              <div className="flex flex-col col-span-2 gap-4">
                <InputField
                  label="Nome Artístico / Marca"
                  type="text"
                  required
                  {...register('artisan.artisanUserName', {
                    required: 'Nome é obrigatório',
                  })}
                />
                {errors.artisan?.artisanUserName && (
                  <span className="text-red-500 text-xs">
                    {errors.artisan.artisanUserName.message}
                  </span>
                )}
                <InputField
                  label="Nome Completo"
                  type="text"
                  required
                  {...register('name', { required: 'Nome é obrigatório' })}
                />
                <InputField
                  label="Email"
                  type="text"
                  required
                  {...register('email', { required: 'Email é obrigatório' })}
                />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-sm">
                    Telefone / WhatsApp
                  </span>
                  <div className="flex flex-row gap-2">
                    <InputField
                      type="text"
                      required
                      {...register('ddd', {
                        required: 'Telefone é obrigatório',
                      })}
                      className="w-16"
                      maxLength={3}
                    />
                    <InputField
                      type="text"
                      required
                      {...register('phone', {
                        required: 'Telefone é obrigatório',
                        onChange: (e) => {
                          e.target.value = formatPhone(e.target.value);
                        },
                      })}
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 w-11/12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="CEP"
                  type="text"
                  required
                  {...register('artisan.zipCode', {
                    required: 'CEP é obrigatório',
                  })}
                />
                <InputField
                  label="Estado"
                  type="text"
                  required
                  {...register('artisan.state', {
                    required: 'Estado é obrigatório',
                  })}
                />
                <InputField
                  label="Cidade"
                  type="text"
                  required
                  {...register('artisan.city', {
                    required: 'Cidade é obrigatória',
                  })}
                />
              </div>
              <InputField
                label="Endereço"
                type="text"
                required
                {...register('artisan.address', {
                  required: 'Endereço é obrigatório',
                })}
              />
              <div className="flex flex-col gap-2">
                <InputField
                  label="Nome de usuário"
                  type="text"
                  required
                  {...register('artisan.artisanUserName', {
                    required: 'Nome de usuário é obrigatório',
                  })}
                />
                <ul className="list-disc text-xs font-bold px-6">
                  <li>Ter pelo menos 5 caracteres</li>
                  <li>Começar com uma letra</li>
                  <li>Usar apenas letras e números, sem espaços ou símbolos</li>
                </ul>
              </div>
            </div>

            <div>
              <span className="font-semibold text-sm">Biografia</span>
              <textarea
                className="w-full border-2 border-sakura rounded-lg h-32 md:h-40 p-4 font-normal"
                {...register('artisan.bio')}
              />
            </div>

            <Button type="submit" variant="primary">
              Salvar Alterações
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
