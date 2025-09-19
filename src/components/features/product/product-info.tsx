'use client';

import { CiHeart } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa';
import { IoIosArrowDown, IoMdShareAlt } from 'react-icons/io';
import Button from './button';

interface ProductInfoProps {
  title: string;
  price: string;
  description?: string;
  onShare?: () => void;
  onAddToFavorites?: () => void;
  onContact?: () => void;
}

const ProductInfo = ({
  title,
  price,
  description,
  onShare,
  onAddToFavorites,
  onContact,
}: ProductInfoProps) => {
  return (
    <div className="mx-9 my-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-[#1B7132] text-2xl font-bold mt-2">{price}</p>
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

      <div className="pt-2">
        <Button
          text="Compartilhar"
          Icon={<IoMdShareAlt size={20} color="#E0001E" />}
          variant="outline"
          className="rounded-full p-2"
          onClick={onShare}
        />
      </div>

      <div className="flex gap-3 items-center">
        <Button
          text="Adicionar aos favoritos"
          Icon={<CiHeart size={18} />}
          variant="secondary"
          size="md"
          width="171px"
          className="rounded-lg"
          onClick={onAddToFavorites}
        />
        <Button
          text="Entrar em contato"
          Icon={<FaWhatsapp size={18} />}
          variant="primary"
          size="md"
          width="141px"
          className="rounded-lg"
          onClick={onContact}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
