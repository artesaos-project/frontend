'use client';

import DropdownDenuncia from '@/components/common/dropdown-denuncia';
import { Button } from '@/components/ui/button';
import { reportApi } from '@/services/api';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa';
import { IoIosArrowDown, IoMdClose, IoMdShareAlt } from 'react-icons/io';
import { TbDotsVertical } from 'react-icons/tb';
import { toast } from 'sonner';

interface ProductInfoProps {
  productId: string;
  title: string;
  price: string;
  description?: string;
  onShare?: () => void;
  onAddToFavorites?: () => void;
  onContact?: () => void;
  isFavorited?: boolean;
}

const ProductInfo = ({
  productId,
  title,
  price,
  description,
  onShare,
  onAddToFavorites,
  onContact,
  isFavorited,
}: ProductInfoProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-9 my-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-[#1B7132] text-2xl font-bold mt-2">{price}</p>
        </div>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div className="p-2 rounded-full hover:outline-none hover:ring-2 hover:ring-gray-300">
              <TbDotsVertical size={24} className="cursor-pointer" />
            </div>
          </DropdownMenuTrigger>
          <DropdownDenuncia
            onClose={() => setOpen(false)}
            targetId={productId}
            onSubmit={async (data) => {
              try {
                await reportApi.reportProduct({
                  ...data,
                  productId,
                });

                toast.success('Denúncia enviada com sucesso!');
              } catch (error: unknown) {
                if (error instanceof AxiosError) {
                  if (error.response?.status === 401) {
                    toast.error(
                      'Você precisa estar logado para enviar uma denúncia.',
                    );
                    return;
                  }
                  const message = error.response?.data?.message;
                  toast.error(message);
                }
              }
            }}
          />
        </DropdownMenu>
      </div>

      <div className="pt-2 w-full">
        <Button variant="olivineOutline" onClick={onShare} className="w-full">
          Compartilhar
          <IoMdShareAlt size={20} color="#E0001E" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 items-center w-full">
        <Button
          variant={isFavorited ? 'secondary' : 'outlineSakura'}
          onClick={onAddToFavorites}
        >
          {isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          {isFavorited ? <IoMdClose size={18} /> : <CiHeart size={18} />}
        </Button>
        <Button variant="primary" onClick={onContact}>
          Entrar em contato
          <FaWhatsapp size={18} />
        </Button>
      </div>

      {description && (
        <details className="group">
          <summary className="cursor-pointer text-[#1B7132] hover:text-[#156029] transition-colors flex items-center gap-2">
            Ver mais detalhes do produto
            <span className="transition-transform group-open:rotate-180">
              <IoIosArrowDown />
            </span>
          </summary>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </details>
      )}
    </div>
  );
};

export default ProductInfo;
