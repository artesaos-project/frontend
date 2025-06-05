"use client";

import React, { useState } from 'react';
import { FiUser, FiPlus, FiUserCheck } from 'react-icons/fi';

interface AuthorProfileProps {
    name: string;
    avatar?: string;
    followers: number;
    totalProducts: number;
    isFollowing?: boolean;
    onFollow?: () => void;
    onViewProfile?: () => void;
}

const AuthorProfile = ({ 
    name, 
    avatar, 
    followers, 
    totalProducts,
    isFollowing = false,
    onFollow,
    onViewProfile
}: AuthorProfileProps) => {
    const [following, setFollowing] = useState(isFollowing);

    const handleFollow = () => {
        setFollowing(!following);
        onFollow && onFollow();
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };

    return (
        <div className="bg-[#E4F5E9] border border-gray-200 shadow-sm">
           <div className="flex items-center justify-between px-8 py-6 lg:py-9 sm:px-8 md:px-16 lg:px-45 ">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        {avatar ? (
                            <img 
                                src={avatar} 
                                alt={name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-[#1B7132] flex items-center justify-center">
                                <FiUser className="text-white text-xl" />
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <button 
                                onClick={onViewProfile}
                                className="text-left hover:text-[#1B7132] transition-colors"
                            >
                                <h3 className="font-semibold text-[#1F3A4D] text-lg">{name}</h3>
                            </button>
                            
                            <div className="flex md:hidden items-center space-x-1 text-xs text-black font-bold">
                                <span>{formatNumber(followers)} Seguidores</span>
                                <span>{totalProducts} Produtos</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-row gap-2 justify-center">
                    <div className="flex items-center space-x-2 text-xs text-black font-bold">
                        <span className="flex items-center">
                            <span>{formatNumber(followers)} Seguidores</span>
                        </span>
                        
                        <span className="flex items-center">
                            <span>{totalProducts} Produtos</span>
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleFollow}
                    className={`
                        flex items-center space-x-1 px-5 py-2 rounded-full text-xs font-medium transition-all
                        ${following 
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-[#4D7558]' 
                            : 'bg-white text-[#4D7558] hover:bg-[#ABCFB5] hover:text-white text-xs rounded-2xl border border-[#ABCFB5] shadow-[0px_2px_0px_0px_#82BC92]'
                        }
                    `}
                >
                    {following ? (
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
    );
};

export default AuthorProfile;