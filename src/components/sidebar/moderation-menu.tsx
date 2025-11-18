import { BsGear } from 'react-icons/bs';
import { CgDanger } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';
import { TbLogout2 } from 'react-icons/tb';
import { MenuItem, MenuItemNoLink } from './menu-item';

interface ModerationMenuProps {
  onLogoutClick: () => void;
}

export function ModerationMenu({ onLogoutClick }: ModerationMenuProps) {
  return (
    <>
      <MenuItem
        href="/moderator"
        icon={<FaHome color="#ff8c94" size={30} />}
        label="Início"
      />
      <MenuItem
        href="/moderator/artisans"
        icon={<IoPerson color="#ff8c94" size={30} />}
        label="Artesãos"
      />
      <MenuItem
        href="/moderator/reports"
        icon={<CgDanger color="#ff8c94" size={30} />}
        label="Denúncias"
      />
      <MenuItem
        href="/settings"
        icon={<BsGear color="#ff8c94" size={30} />}
        label="Configurações"
      />
      <MenuItemNoLink
        icon={<IoMdHelpCircleOutline color="#ff8c94" size={30} />}
        label="Suporte e Ajuda"
      />
      <MenuItemNoLink
        icon={<TbLogout2 color="#ff8c94" size={30} />}
        label="Sair"
        onClick={onLogoutClick}
      />
    </>
  );
}
