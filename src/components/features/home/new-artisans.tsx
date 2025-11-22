'use client';
import BaseSwiper from '@/components/base-swiper';
import { ArtisanCardBody, BaseCard } from '@/components/card';
import SectionStructure from '@/components/section-structure';
import Image from 'next/image';
import { NewArtisanCardProps } from '@/types/artisan';

function NewArtisans({
  artisans,
  loading,
}: {
  artisans: NewArtisanCardProps[];
  loading: boolean;
}) {
  // if (!artisans || artisans.length === 0) {
  //   return (
  //     <SectionStructure title="Novos Artistas">
  //       <p className="py-14 text-center bg-gray-50 border border-black/2 m-2 rounded-lg text-gray-500">
  //         Nenhum artista novo no momento.
  //       </p>
  //     </SectionStructure>
  //   );
  // }
  return (
    <SectionStructure title="Novos Artistas">
      <BaseSwiper
        key={'aa'}
        navElId="new-artisans"
        cards={artisans}
        loading={loading}
      >
        {(artisan) => {
          if (artisan)
            return (
              <BaseCard>
                <div className="w-full h-34 md:h-40">
                  <Image
                    width={200}
                    height={100}
                    src={artisan.avatar || '/placeholder-avatar.svg'}
                    alt="Imagem do Produto"
                    className="rounded-lg object-cover h-34 md:h-40 w-full"
                    quality={75}
                  />
                </div>
                <ArtisanCardBody
                  id={artisan.id}
                  userName={artisan.userName}
                  name={artisan.name}
                  type={'Acessórios'}
                />
              </BaseCard>
            );
        }}
      </BaseSwiper>
    </SectionStructure>
  );
}

export default NewArtisans;
