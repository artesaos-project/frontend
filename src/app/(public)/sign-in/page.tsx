import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import SignInput from "./components/SignInput";
import { z } from "zod";


const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha Inválida - minimo de 8')
    .regex(/[!@#$%*&^(),.?":{}|<>]/, 'Senha Inválida - caractere especial')
    .regex(/[A-Z]/, 'Senha Inválida - letra maiuscula')
    .regex(/[a-z]/, 'Senha Inválida - letra minuscula')
    .regex(/[0-9]/, 'Senha Inválida - numero')
});

type LoginFormData = z.infer<typeof loginSchema>;


function page() {

  return (
    <div className="flex flex-col items-center md:justify-center h-screen">
      <div className="rounded-lg p-[44px] min-w-[393px] md:border-1  md:shadow-md ">
        <header>
          <Link href="/initial"><FiChevronLeft className="" size={28} /></Link>
        </header>
        <div className="mt-28 mb-14 md:mt-14">
          <h1 className="text-5xl md:text-[45px] font-bold">Olá!</h1>
          <p className="text-xl italic mt-2">Bom te ver de novo!</p>
        </div>
        <div>
          <form className="space-y-3 mb-3">
            <SignInput placeholder={"Email"} type={"email"} />
            <SignInput placeholder={"Senha"} type={"password"} />
          </form>
        </div>

        <Link className="underline italic text-sm text-end block" href="/#">Esqueceu sua senha?</Link>
        <div className="w-full flex justify-center mt-10">
          <Link href="/">
            <Button className="bg-[#E05D00] w-[191px] h-[42px] rounded-2xl border-b-3 border-[#c04500] hover:bg-[#c04500] cursor-pointer">
              Continuar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;