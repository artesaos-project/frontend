'use client';

import { Button } from '@/components/ui/button';
import { useFollowContext } from '@/context/follow-context';
import useStoreUser from '@/hooks/use-store-user';
import handleContact from '@/lib/utils/contact-utils';
import { handleShare } from '@/lib/utils/share-utils';
import { artisanApi, artisanReviewsApi } from '@/services/api';
import { ArtisanProfile } from '@/types/artisan';
import { Review } from '@/types/review';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaPlus, FaWhatsapp } from 'react-icons/fa';
import { IoIosArrowDown, IoMdShareAlt } from 'react-icons/io';
import { LuPencil } from 'react-icons/lu';
import { PiPlusCircleLight } from 'react-icons/pi';
import ProductReviews from '../product/product-reviews';
import SearchBar from '../register/search-bar';
import ProductArtisan from './product-artisan';
import ProfileDescription from './product-description';
import ProfileInfo from './profile-info';
import ProfilePicture from './profile-picture';

const ArtisanProfileCard = () => {
  const [activeTab, setActiveTab] = useState<'produtos' | 'avaliacoes'>(
    'produtos',
  );
  const params = useParams();
  const routeUserName = params.id as string;
  const [isArtisan, setIsArtisan] = useState(false);
  const [artisan, setArtisan] = useState<ArtisanProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [totalProducts, setTotalProducts] = useState(0);
  const [search, setSearch] = useState('');
  const { user } = useStoreUser();
  const route = useRouter();
  const { isFollowing, toggleFollow } = useFollowContext();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const getLoggedUserId = useCallback(() => user.userId, [user.userId]);

  useEffect(() => {
    const handleResize = () =>
      setVisibleProducts(window.innerWidth < 768 ? 6 : 25);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchArtisanProfile = async () => {
      try {
        setLoading(true);
        const data = await artisanApi.getProfile(routeUserName);
        setArtisan(data);

        const loggedUserId = getLoggedUserId();
        if (
          loggedUserId &&
          data.userId &&
          String(loggedUserId) === String(data.userId)
        ) {
          setIsArtisan(true);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar perfil',
        );
      } finally {
        setLoading(false);
      }
    };

    if (routeUserName) fetchArtisanProfile();
  }, [routeUserName, getLoggedUserId]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!artisan?.userId || activeTab !== 'avaliacoes') return;
      try {
        setReviewsLoading(true);
        setReviewsError(null);
        const res = await artisanReviewsApi.getByArtisan(artisan.userId, {
          page: 1,
          limit: 10,
        });
        setReviews(res.data);
      } catch {
        setReviewsError('Falha ao carregar avaliações');
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchReviews();
  }, [artisan?.userId, activeTab]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-500 mt-2">Carregando perfil...</p>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="text-center py-8 text-gray-500">
        {'Artesão não encontrado.'}
      </div>
    );
  }

  const bgcolor = 'bg-[#A6E3E9]';
  const textColor = 'text-[#1F3A4D]';

  const artisanInternalId = artisan.userId;
  const artisanDisplayName = artisan.artisanName;

  const handleFollow = () => {
    toggleFollow(artisanInternalId);
  };

  const handleAddProduct = () => {
    if (!user.isAuthenticated)
      return alert('Você precisa estar logado para adicionar produtos');
    route.push(`/artisan/add-product`);
  };

  const handleEditProfile = () => {
    if (!user.isAuthenticated)
      return alert('Você precisa estar logado para editar o perfil');
    route.push(`/artisan/edit-profile`);
  };

  return (
    <div className={`${bgcolor} pt-6 mx-auto shadow-md `}>
      <div className="flex flex-row justify-center gap-6 px-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <ProfilePicture
            artisan={artisan}
            className="w-30 h-30 rounded-full mx-auto border-4 border-white shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <ProfileInfo artisan={artisan} textColor={textColor} />
          {!isArtisan && (
            <Button
              variant={
                isFollowing(artisanInternalId)
                  ? 'outlineSakura'
                  : 'outlineMidnight'
              }
              onClick={handleFollow}
              className="flex gap-2 items-center px-4 py-1 w-full"
            >
              {isFollowing(artisanInternalId) ? 'Seguindo' : 'Seguir'}
              {isFollowing(artisanInternalId) ? (
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
        {isArtisan ? (
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
              onClick={() =>
                handleShare(
                  `${artisanDisplayName}`,
                  `Confira os produtos do ${artisanDisplayName}`,
                  window.location.href,
                )
              }
            >
              Compartilhar perfil
              <IoMdShareAlt size={20} color="#E0001E" />
            </Button>
            <Button
              variant="olivineOutline"
              className="min-w-[300px] border-none font-bold"
              onClick={() =>
                handleContact({ contactInfo: artisan.phoneNumber })
              }
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
            artistId={artisanInternalId}
            visibleCount={visibleProducts}
            onTotalChange={setTotalProducts}
            isEdit={isArtisan}
            search={search}
          />
        </div>

        {visibleProducts < totalProducts && (
          <div className="flex justify-center items-center bg-white">
            <Button
              variant="olivineOutline"
              onClick={() => setVisibleProducts((prev) => prev + 5)}
            >
              Ver mais
            </Button>
          </div>
        )}
      </div>

      <div
        className={`justify-center bg-white ${activeTab === 'avaliacoes' ? 'block' : 'hidden'}`}
      >
        <div className="justify-center items-center mx-auto lg:w-7/12">
          {reviewsLoading && (
            <div className="py-8 text-center text-gray-500">
              Carregando avaliações...
            </div>
          )}
          {reviewsError && (
            <div className="py-8 text-center text-red-500">{reviewsError}</div>
          )}
          {!reviewsLoading && !reviewsError && reviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Este artesão ainda não possui avaliações.</p>
            </div>
          )}
          {!reviewsLoading && !reviewsError && reviews.length > 0 && (
            <ProductReviews reviews={reviews} hideEvaluateButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfileCard;
