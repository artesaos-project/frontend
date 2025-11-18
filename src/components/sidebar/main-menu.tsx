import useStoreUser from '@/hooks/use-store-user';
import { BsGear } from 'react-icons/bs';
import { CgDanger } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';
import { RxPlusCircled } from 'react-icons/rx';
import { TbLogout2 } from 'react-icons/tb';
import { DropdownCategories } from './dropdown-categories';
import { MenuItem, MenuItemNoLink } from './menu-item';

interface MainMenuProps {
  onLogoutClick: () => void;
}

export function MainMenu({ onLogoutClick }: MainMenuProps) {
  const user = useStoreUser((state) => state.user);

  return (
    <>
      {user.isModerator && (
        <MenuItem
          href="/moderator"
          icon={<CgDanger color="#ff8c94" size={30} />}
          label="Moderação"
          endIcon={<IoChevronForward size={25} />}
        />
      )}

      <DropdownCategories />

      {user.isArtisan && (
        <MenuItem
          href="/artisan/add-product"
          icon={<RxPlusCircled color="#ff8c94" size={30} />}
          label="Adicionar Produto"
        />
      )}

      <MenuItem
        href="/favorites"
        icon={<FaRegHeart color="#ff8c94" size={30} />}
        label="Favoritos"
      />

      {user.isAuthenticated && (
        <MenuItem
          href="/settings"
          icon={<BsGear color="#ff8c94" size={30} />}
          label="Configurações"
        />
      )}

      <MenuItemNoLink
        icon={<IoMdHelpCircleOutline color="#ff8c94" size={30} />}
        label="Suporte e Ajuda"
      />

      {user.isAuthenticated && (
        <div
          onClick={onLogoutClick}
          className="w-full cursor-pointer mb-60 bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center"
        >
          <TbLogout2 color="#ff8c94" size={30} />
          <p className="text-midnight font-bold text-lg sm:text-2xl ml-6">
            Sair
          </p>
        </div>
      )}
    </>
  );
}
