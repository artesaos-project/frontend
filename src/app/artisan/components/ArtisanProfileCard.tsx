"use client";

import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import ProfileInfo from "./ProfileInfo";
import ActionButtons from "./ActionButtons";
import ProfileDescription from "./ProfileDescription";
import ContactButtons from "./ContactButtons";
import { FaWhatsapp, FaPlus } from "react-icons/fa";
import { IoMdShareAlt, IoIosArrowDown } from "react-icons/io";
import { CiCircleMore } from "react-icons/ci";
import SearchBar from "./SearchBar";
import { useParams } from 'next/navigation';
import ProductArtisan from "./ProductArtisan";
import ProductReviews from "@/app/product/components/ProductReviews";
import artisanProductMock from "./artisanProductMock.json";
import { LuPencil } from "react-icons/lu";

const ArtisanProfileCard = () => {
  const [activeTab, setActiveTab] = useState<"produtos" | "avaliacoes">(
    "produtos"
  );
  const params = useParams();
  const Id = params.id as string;
  const [follow, setFollow ] = useState(false);
  const [isArtisan, setIsArtisan] = useState(false);

  const artisan =  artisanProductMock.artisans?.find(a => a.id === Id);
  if(!artisan) {
    return <div className="text-center py-8 text-gray-500">Artesão não encontrado.</div>;
  }

  const filteredReviews = Id
    ? artisanProductMock.productReviews.filter((review) => review.authorId === Id)
    : artisanProductMock.productReviews;

  const [visibleProducts, setVisibleProducts] = useState(25);
  const [totalProducts, setTotalProducts] = useState(0);

  const bgcolor = "bg-[#A6E3E9]";
  const textColor = "text-[#1F3A4D]";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
      title: `${artisan.name}`,
      text: `Confira os produtos do ${artisan.name}`,
      url: window.location.href,
    }).catch(error => {
        console.log('Erro ao compartilhar:', error);
        navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
    });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.body.removeChild(textArea);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleFollow = () => {
    setFollow(!follow);
    alert(follow ? "Você começou a seguir o artista." : "Você deixou de seguir o artista." );
  }

  return (
    <div className={`${bgcolor} pt-6 mx-auto shadow-md`}>
      <div className="flex flex-row justify-center gap-5">
        <div className="flex flex-col justify-center items-center gap-2">
          <ProfilePicture
            artist={artisan}
            className={`w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md`}
          />
          
        {!isArtisan && (
          <ActionButtons
            nameButton={follow ?  "Seguir" : "Seguindo"}
            icon={follow ? <FaPlus size={16} /> : <IoIosArrowDown size={16}/> }
            className={ follow ? `px-4 py-1 font-bold bg-white ${textColor} ring-1 shadow-[0_4px_0_0_#1F3A4D] ring-[#1F3A4D] rounded-2xl hover:text-white hover:bg-[#1F3A4D] hover:shadow-none` : `px-2 py-1 font-bold bg-white text-[#FF8C94] ring-1 shadow-[0_4px_0_0_#E33A46] ring-[#FF8C94] rounded-2xl hover:text-white hover:bg-[#FF8C94] hover:shadow-none`}
            onClick={handleFollow}
          />
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <ProfileInfo artist={artisan} textColor={textColor} />
          <ActionButtons
            nameButton="Compartilhar"
            icon={<IoMdShareAlt size={20} />}
            className="px-6 py-1 font-bold bg-green-500 text-white rounded-2xl hover:bg-green-600"
            onClick={handleShare}
          />
        </div>
      </div>

      <div className={`${textColor}`}>
        <ProfileDescription description={artisan.description} />
      </div>

      <div className="flex flex-col gap-y-4 md:flex-row justify-center items-center mt-6 md:space-x-4 font-bold text-[#1F3A4D]">
        { isArtisan ? (
          <>
            <ActionButtons
              nameButton="Editar perfil"
              iconPosition="left"
              icon={<LuPencil size={20} color="#2AAA4C" />}
              className="flex justify-center items-center  px-10 min-w-[300px] ring-1 ring-[#2AAA4C] text-[#2AAA4C] py-2 bg-[#B9FFCC80]/50 rounded-lg hover:bg-white"
            />
            <ActionButtons
              nameButton="Editar história do artista"
              iconPosition="left"
              icon={<LuPencil size={20}color="red" />}
              className="px-10 min-w-[300px]  py-2 bg-white rounded-lg hover:bg-[#1F3A4D] hover:text-white"
            />
          </>
          ) : (
          <>
            <ContactButtons
              contactInfo={artisan.contactInfo}
              icon={<FaWhatsapp />}
              className="flex min-w-[300px] px-10 py-2 ring ring-[#1F3A4D] justify-center items-center rounded-2xl hover:bg-[#1F3A4D] hover:text-white"
            />
            <ActionButtons
              nameButton="Saber mais sobre o artista"
              iconPosition="left"
              icon={<CiCircleMore size={20} color="red" />}
              className="px-10 min-w-[300px]  py-2 bg-white rounded-lg hover:bg-[#1F3A4D] hover:text-white"
            />
          </>
        )}
      </div>

      <div className="flex flex-row w-full items-center justify-center mt-6 font-bold">
        <div className="flex w-full lg:w-7/12 justify-center">
          <ActionButtons
            nameButton="Produtos"
            className={`flex w-full justify-center items-center mt-4 px-4 py-2 rounded-t-3xl hover:bg-white ${
              activeTab === "produtos"
                ? "bg-white text-[#E33A46] shadow-[0_-2px_0_0_#E33A46]"
                : `${bgcolor} text-[#4D7558]`
            }`}
            onClick={() => setActiveTab("produtos")}
          />
          <ActionButtons
            nameButton="Avaliações"
            className={`flex w-full justify-center items-center mt-4 px-4 py-2 rounded-t-3xl hover:bg-white ${
              activeTab === "avaliacoes"
                ? "bg-white text-[#E33A46] shadow-[0_-2px_0_0_#E33A46]"
                : `${bgcolor} text-[#4D7558]`
            }`}
            onClick={() => setActiveTab("avaliacoes")}
          />
        </div>
      </div>

      <div
        className={`${
          activeTab === "produtos" ? "block" : "hidden"
        }`}
      >
        <div className="flex bg-white items-center justify-center p-4">
          <SearchBar />
        </div>

        <div className="flex bg-white items-center justify-center p-4 ">
          <ProductArtisan artistId={Id} visibleCount={visibleProducts} onTotalChange={setTotalProducts} />
        </div>

        {visibleProducts < totalProducts && (
          <div className="flex justify-center items-center bg-white">
            <ActionButtons
              nameButton="Ver mais"
              className={`flex justify-center items-center px-4 py-2 rounded-2xl ring-2 m-2 ring-green-700 text-[#2AAA4C]`}
              onClick={() => setVisibleProducts((prev) => prev + 5)}
            />
          </div>
        )}

      </div>

      <div
        className={`justify-center bg-white ${
          activeTab === "avaliacoes" ? "block" : "hidden"
        }`}
      >
        <div className="justify-center items-center mx-auto lg:w-7/12">
          {filteredReviews.length > 0 && (
          <div>
            <ProductReviews reviews={filteredReviews}/>
           </div>
        )}

        {filteredReviews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Este artesão ainda não possui avaliações.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfileCard;
