'use client';
import AuthButton from '@/components/common/auth-button';
import { PhotoSlot } from '@/components/features/artisan/add-product/photo-slot';
import InputField from '@/components/features/artisan/input-field';
import { useProductForm } from '@/hooks/use-product-form';
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
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<GetMyProfile>({
    defaultValues: {},
  });
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
    if (photos[index]) {
      handlePhotoSelect(index);
    } else if (photos.length < 5) {
      document.getElementById('photo-upload')?.click();
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authApi.getMe();
        if (profile) {
          const phone = profile.user.phone || '';
          let ddd = '';
          let numero = '';
          const match = phone.match(/^\+55(\d{2})(\d{4,5})(\d{4})$/);
          if (match) {
            ddd = match[1];
            numero = `${match[2]}-${match[3]}`;
          }
          const mappedData = {
            ...profile.user,
            ddd,
            phone: numero,
          };
          reset(mappedData);
          if (profile.user.avatar) {
            setPhotos([
              {
                id: '1',
                url: profile.user.avatar,
              },
            ]);
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
      toast.success('Perfil atualizado com sucesso!');
      if (data.artisan?.artisanUserName) {
        router.push(`/artisan/${data.artisan.artisanUserName}`);
      }
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
          <h1 className="text-xl font-bold text-midnight">Editar perfil</h1>
        </div>
        <div className="bg-white p-10 rounded-3xl text-midnight">
          <form action="submit" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-bold text-salmon text-2xl mb-2">
              Dados Pessoais
            </h2>
            <div className="grid grid-cols-3 gap-5 mb-5 h-auto">
              <div className="h-full flex flex-col">
                <div className="px-2 h-full flex flex-col">
                  <label
                    htmlFor="photo-upload"
                    className="block font-semibold text-sm mb-2"
                  >
                    Foto de Perfil
                  </label>
                  <input
                    aria-label="Foto de Perfil"
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
                    className="h-55 w-full mb-2"
                  />
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="w-full p-2 bg-olivine text-white rounded-lg hover:bg-green-600 transition-all disabled:bg-gray-400"
                      onClick={() => handleSlotClick(0)}
                      disabled={photos.length >= 1}
                    >
                      + Adicionar Nova Foto
                    </button>
                    <button
                      type="button"
                      className="flex p-2 justify-center items-center w-full bg-sakura text-white rounded-lg hover:bg-salmon transition-all"
                      onClick={removeSelectedPhotos}
                    >
                      <TbTrash className="mr-1" />
                      Remover Foto Selecionada
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col col-span-2 gap-5.5 px-2">
                <InputField
                  label="Nome Artistico / Marca"
                  type="text"
                  required={true}
                  {...register('artisan.artisanUserName', {
                    required: 'Nome do produto é obrigatório',
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
                  required={true}
                  {...register('name', {
                    required: 'Nome é obrigatório',
                  })}
                />
                <InputField
                  label="Email"
                  type="text"
                  required={true}
                  {...register('email', {
                    required: 'Email é obrigatório',
                  })}
                />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-sm">
                    Telefone / WhatsApp
                  </span>
                  <div className="flex flex-row gap-2">
                    <InputField
                      type="text"
                      required={true}
                      {...register('ddd', {
                        required: 'Telefone é obrigatório',
                      })}
                      className="w-20"
                    />
                    <InputField
                      type="text"
                      required={true}
                      {...register('phone', {
                        required: 'Telefone é obrigatório',
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-10/12 gap-5 mb-6">
              <div className="flex flex-row gap-5">
                <InputField
                  label="CEP"
                  type="text"
                  required={true}
                  {...register('artisan.zipCode', {
                    required: 'CEP é obrigatório',
                  })}
                  className="w-2/8"
                />
                <InputField
                  label="Estado"
                  type="text"
                  required={true}
                  {...register('artisan.state', {
                    required: 'Estado é obrigatório',
                  })}
                  className="w-2/8"
                />
                <InputField
                  label="Cidade"
                  type="text"
                  required={true}
                  {...register('artisan.city', {
                    required: 'Cidade é obrigatória',
                  })}
                  className="w-4/8"
                />
              </div>
              <div>
                <InputField
                  label="Endereço"
                  type="text"
                  required={true}
                  {...register('artisan.address', {
                    required: 'Endereço é obrigatório',
                  })}
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <InputField
                  label="Nome de usuário"
                  type="text"
                  required={true}
                  {...register('artisan.artisanUserName', {
                    required: 'Nome de usuário é obrigatório',
                  })}
                  className="w-2/8"
                />
                <ul className="flex flex-col list-disc text-xs font-bold px-6">
                  <li>Ter pelo menos 5 caracteres</li>
                  <li>Começar com uma letra</li>
                  <li>Usar apenas letras e números, sem espaços ou símbolos</li>
                </ul>
              </div>
            </div>
            <div>
              <span className="font-semibold text-sm">Biografia</span>
              <textarea
                className="w-full border-2 border-sakura rounded-lg h-40 p-4 font-normal"
                {...register('artisan.bio')}
              />
            </div>
            <AuthButton
              className="bg-olivine-600 rounded-lg hover:border-olivine-600 hover:text-olivine-600"
              text="Salvar"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
