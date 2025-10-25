'use client';

import { useFollowContext } from '@/context/follow-context';
import { FiPlus, FiUser, FiUserCheck } from 'react-icons/fi';

interface AuthorProfileProps {
  name: string;
  authorUserName: string;
  avatar?: string;
  followers: number;
  totalProducts: number;
  authorId: string;
  onViewProfile?: () => void;
}

const AuthorProfile = ({
  name,
  authorUserName,
  avatar,
  followers,
  totalProducts,
  authorId,
  onViewProfile,
}: AuthorProfileProps) => {
  const { isFollowing, toggleFollow } = useFollowContext();

  const handleFollow = () => {
    toggleFollow(authorId);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="bg-baby-blue md:rounded-t-4xl">
      <div className="flex flex-wrap items-center justify-between px-8 py-6 lg:py-9 sm:px-8 md:px-16 lg:px-45 ">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#1B7132] flex items-center justify-center">
                <FiUser className="text-white text-2xl" />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <button
                onClick={onViewProfile}
                className="text-left transition-colors"
              >
                <h1 className="font-semibold text-midnight text-lg">{name}</h1>
                <p className="text-midnight text-md">@{authorUserName}</p>
              </button>

              <div className="flex md:hidden items-center space-x-1 text-xs text-midnight font-bold">
                <span>{formatNumber(followers)} Seguidores</span>
                <span>{totalProducts} Produtos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex gap-2 justify-center">
          <div className="flex items-center space-x-2 text-md text-midnight font-normal">
            <span className="flex items-center">
              <span>
                <span className="font-bold ">{formatNumber(followers)}</span>{' '}
                Seguidores
              </span>
            </span>

            <span className="flex items-center">
              <span>
                <span className="font-bold ">{totalProducts}</span> Produtos
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-full md:w-auto">
          <button
            onClick={handleFollow}
            className={`flex items-center mt-2 gap-2 px-10 py-2 border-2 rounded-4xl font-bold transition-colors ${
              isFollowing(authorId)
                ? 'bg-white text-sakura border-sakura hover:bg-sakura hover:text-white'
                : 'bg-white text-midnight border-midnight hover:bg-midnight hover:text-white'
            }`}
          >
            {isFollowing(authorId) ? (
              <>
                <FiUserCheck className="text-sm" />
                <span>Seguindo</span>
              </>
            ) : (
              <>
                <span>Seguir</span>
                <FiPlus className="text-sm" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
