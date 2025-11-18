import { SheetClose } from '@/components/ui/sheet';
import Link from 'next/link';
import { ReactNode } from 'react';

interface MenuItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  endIcon?: ReactNode;
  onClick?: () => void;
}

export function MenuItem({
  href,
  icon,
  label,
  endIcon,
  onClick,
}: MenuItemProps) {
  return (
    <SheetClose asChild>
      <Link href={href} onClick={onClick}>
        <div className="w-full cursor-pointer mb-5 bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center">
          {icon}
          <p className="text-midnight font-bold text-lg sm:text-2xl ml-6 mr-auto">
            {label}
          </p>
          {endIcon}
        </div>
      </Link>
    </SheetClose>
  );
}

interface MenuItemNoLinkProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export function MenuItemNoLink({ icon, label, onClick }: MenuItemNoLinkProps) {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer mb-5 bg-white shadow-md shadow-black/40 rounded-lg p-4 flex items-center"
    >
      {icon}
      <p className="text-midnight font-bold text-lg sm:text-2xl ml-6">
        {label}
      </p>
    </div>
  );
}
