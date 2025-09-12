'use client';

import { FiChevronLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import AuthInput from '@/components/common/auth-input';
import AuthButton from '@/components/common/auth-button';
import React from 'react';

function Page() {
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  return (
    <div className="p-12.5 h-screen w-full">
      <div className="w-full max-w-md mx-auto flex flex-col">
        <div className="mb-12.5">
          <FiChevronLeft size={24} />
        </div>
        <div>
          <Image
            src="/horizontal-logo.svg"
            alt={'system-logo'}
            width={120}
            height={60}
          />
        </div>
        <div>
          <h1 className="font-bold text-midnight text-5xl py-8">Olá!</h1>
          <h2 className="italic text-midnight text-xl pb-8">
            Bom te ver de novo!
          </h2>
        </div>
        <form className="flex flex-col gap-4">
          <AuthInput placeholder="Email" type="email" />
          {visiblePassword ? (
            <AuthInput
              placeholder="Senha"
              type="text"
              onToggle={() => setVisiblePassword(!visiblePassword)}
              icon={<FiEye size={20} className="text-salmon" />}
              hasError={true}
              errorMessage="Email ou senha incorretos"
            />
          ) : (
            <AuthInput
              placeholder="Senha"
              type="password"
              onToggle={() => setVisiblePassword(!visiblePassword)}
              icon={<FiEyeOff size={20} className="text-salmon" />}
              hasError={false}
            />
          )}
          <span className="text-xs text-midnight font-light underline text-right mb-6">
            Esqueceu sua senha?
          </span>
          <AuthButton />
        </form>
      </div>
    </div>
  );
}

export default Page;
