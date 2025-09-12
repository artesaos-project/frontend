import { FiChevronLeft } from "react-icons/fi"
import Image from "next/image"
import AuthInput from "@/components/ui/auth-input"
import AuthButton from "@/components/ui/auth-button"

function page() {
  return (
    <div className="p-12.5 h-screen w-full">
      <div className="w-full max-w-md mx-auto flex flex-col">
        <div className="mb-12.5">
          <FiChevronLeft size={24} />
        </div>
        <div>
          <Image src="/horizontal-logo.svg" alt={"system-logo"} width={120} height={60} />
        </div>
        <div>
          <h1 className="font-bold text-midnight text-5xl py-8">Olá!</h1>
          <h2 className="italic text-midnight text-xl pb-8">Bom te ver de novo!</h2>
        </div>
        <form className="flex flex-col gap-4">
          <AuthInput placeholder="Email" type="email" />
          <AuthInput placeholder="Senha" type="password" />
          <span className="text-xs text-midnight font-light underline text-right mb-6">
            Esqueceu sua senha?
          </span>
          <AuthButton />
        </form>
      </div>
    </div>
  )
}

export default page