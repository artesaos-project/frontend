'use client';

import { Button } from '@/components/ui/button';
import { useFollowContext } from '@/context/follow-context';
import { useArtisanProfile } from '@/hooks/use-artisan-profile';
import { useArtisanReviews } from '@/hooks/use-artisan-reviews';
import useStoreUser from '@/hooks/use-store-user';
import handleContact from '@/lib/utils/contact-utils';
import { handleShare } from '@/lib/utils/share-utils';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FaPlus, FaWhatsapp } from 'react-icons/fa';
import { IoIosArrowDown, IoMdShareAlt } from 'react-icons/io';
import { LuPencil } from 'react-icons/lu';
import { PiPlusCircleLight } from 'react-icons/pi';
import ProductArtisan from '../../../../components/features/artisan/product-artisan';
import ProfileDescription from '../../../../components/features/artisan/product-description';
import ProfileInfo from '../../../../components/features/artisan/profile-info';
import ProfilePicture from '../../../../components/features/artisan/profile-picture';
import ProductReviews from '../../../../components/features/product/product-reviews';
import SearchBar from '../../../../components/features/register/search-bar';
import { GoArrowLeft } from 'react-icons/go';

type TabType = 'produtos' | 'avaliacoes';

const ArtisanPage = () => {
  const params = useParams();
  const router = useRouter();
  const userName = params.id as string;
  const { user } = useStoreUser();
  const { isFollowing, toggleFollow } = useFollowContext();

  const [activeTab, setActiveTab] = useState<TabType>('produtos');
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [totalProducts, setTotalProducts] = useState(0);
  const [search, setSearch] = useState('');

  const {
    data: artisan,
    isLoading: isLoadingProfile,
    isError: isProfileError,
  } = useArtisanProfile(userName);

  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    isError: isReviewsError,
  } = useArtisanReviews({
    artisanId: artisan?.userId,
    page: 1,
    limit: 10,
    enabled: activeTab === 'avaliacoes',
  });

  const isOwnProfile = useMemo(() => {
    if (!user.userId || !artisan?.userId) return false;
    return String(user.userId) === String(artisan.userId);
  }, [user.userId, artisan?.userId]);

  const artisanDisplayName = artisan?.artisanName ?? '';
  const reviews = reviewsData?.data ?? [];

  useEffect(() => {
    const handleResize = () => {
      setVisibleProducts(window.innerWidth < 768 ? 6 : 25);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFollowClick = () => {
    if (!artisan?.userId) return;
    toggleFollow(artisan.userId);
  };

  const handleAddProduct = () => {
    if (!user.isAuthenticated) {
      alert('Você precisa estar logado para adicionar produtos');
      return;
    }
    router.push('/artisan/add-product');
  };

  const handleEditProfile = () => {
    if (!user.isAuthenticated) {
      alert('Você precisa estar logado para editar o perfil');
      return;
    }
    router.push('/settings/edit-profile');
  };

  const handleShareProfile = () => {
    handleShare(
      artisanDisplayName,
      `Confira os produtos do ${artisanDisplayName}`,
      window.location.href,
    );
  };

  const handleContactClick = () => {
    if (!artisan?.phoneNumber) return;
    handleContact({ contactInfo: artisan.phoneNumber });
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 5);
  };

  if (isLoadingProfile) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-500 mt-4 text-lg">Carregando perfil...</p>
      </div>
    );
  }

  if (isProfileError || !artisan) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-semibold mb-2">
            Artesão não encontrado
          </h2>
          <p className="text-sm">
            O perfil que você está procurando não existe ou foi removido.
          </p>
        </div>
      </div>
    );
  }

  const bgColor = 'bg-[#A6E3E9]';
  const textColor = 'text-[#1F3A4D]';

  return (
    <div className={`${bgColor} pt-6 mx-auto shadow-md`}>
      <div className="md:w-7/12 mx-auto">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push('/');
            }
          }}
          className="p-2 hover:bg-gray-300 rounded-full ml-4 mt-6 transition-colors"
        >
          <GoArrowLeft size={30} />
        </button>
      </div>
      <div className="flex flex-row justify-center gap-6 px-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <ProfilePicture
            artisan={artisan}
            className="w-30 h-30 rounded-full mx-auto border-4 border-white shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <ProfileInfo artisan={artisan} textColor={textColor} />
          {!isOwnProfile && (
            <Button
              variant={
                isFollowing(artisan.userId)
                  ? 'outlineSakura'
                  : 'outlineMidnight'
              }
              onClick={handleFollowClick}
              className="flex gap-2 items-center px-4 py-1 w-full"
            >
              {isFollowing(artisan.userId) ? 'Seguindo' : 'Seguir'}
              {isFollowing(artisan.userId) ? (
                <IoIosArrowDown size={16} />
              ) : (
                <FaPlus size={16} />
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <div className={`${textColor} lg:w-2/3 flex justify-center mt-4 px-4`}>
          <ProfileDescription description={artisan.bio} />
        </div>
      </div>

      <div className="flex flex-col gap-y-4 md:flex-row justify-center items-center mt-6 md:space-x-4 font-bold text-midnight">
        {isOwnProfile ? (
          <>
            <Button
              variant="outlineMidnight"
              onClick={handleEditProfile}
              className="min-w-[300px] border-none font-bold"
            >
              <LuPencil size={20} color="green" />
              Editar perfil
            </Button>
            <Button
              variant="outlineMidnight"
              onClick={handleAddProduct}
              className="min-w-[300px] border-none font-bold"
            >
              <PiPlusCircleLight size={20} color="salmon" />
              Adicionar Produtos
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="olivineOutline"
              className="min-w-[300px] border-none font-bold"
              onClick={handleShareProfile}
            >
              Compartilhar perfil
              <IoMdShareAlt size={20} color="#E0001E" />
            </Button>
            <Button
              variant="olivineOutline"
              className="min-w-[300px] border-none font-bold"
              onClick={handleContactClick}
            >
              <FaWhatsapp size={20} />
              Contato WhatsApp
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-row w-full items-center justify-center mt-6 font-bold">
        <div className="w-full grid grid-cols-2 md:w-7/12 text-olivine-600">
          <Button
            variant={activeTab === 'produtos' ? 'outlineSalmon' : 'ghost'}
            onClick={() => setActiveTab('produtos')}
            className={`mt-4 rounded-t-3xl rounded-b-none font-bold ${activeTab === 'produtos' ? 'border-t-3 border-salmon' : 'border-t-3 border-transparent'}`}
          >
            Produtos
          </Button>
          <Button
            variant={activeTab === 'avaliacoes' ? 'outlineSalmon' : 'ghost'}
            onClick={() => setActiveTab('avaliacoes')}
            className={`mt-4 rounded-t-3xl rounded-b-none font-bold ${activeTab === 'avaliacoes' ? 'border-t-3 border-salmon' : 'border-t-3 border-transparent'}`}
          >
            Avaliações
          </Button>
        </div>
      </div>

      <div
        className={`${activeTab === 'produtos' ? 'flex flex-col bg-white justify-center items-center' : 'hidden'}`}
      >
        <div className="flex bg-white items-center justify-center p-4 w-full md:w-1/2">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="flex w-full bg-white items-center justify-center p-4">
          <ProductArtisan
            artistId={artisan.userId}
            visibleCount={visibleProducts}
            onTotalChange={setTotalProducts}
            isEdit={isOwnProfile}
            search={search}
          />
        </div>

        {visibleProducts < totalProducts && (
          <div className="flex justify-center items-center bg-white pb-6">
            <Button variant="olivineOutline" onClick={handleLoadMore}>
              Ver mais
            </Button>
          </div>
        )}
      </div>

      <div
        className={`justify-center bg-white ${activeTab === 'avaliacoes' ? 'block' : 'hidden'}`}
      >
        <div className="justify-center items-center mx-auto lg:w-7/12 min-h-[300px]">
          {isLoadingReviews && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-gray-500 mt-4">Carregando avaliações...</p>
            </div>
          )}
          {isReviewsError && (
            <div className="py-12 text-center">
              <p className="text-red-500 font-medium">
                Erro ao carregar avaliações
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Tente novamente mais tarde
              </p>
            </div>
          )}
          {!isLoadingReviews && !isReviewsError && reviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Este artesão ainda não possui avaliações.
              </p>
            </div>
          )}
          {!isLoadingReviews && !isReviewsError && reviews.length > 0 && (
            <ProductReviews reviews={reviews} hideEvaluateButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanPage;
