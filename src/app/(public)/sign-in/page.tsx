'use client'

import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import SignInput from "./components/SignInput";
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";


const loginSchema = z.object({
  email: z.string().email('Email e/ou senha Inválidos'),
  password: z
    .string()
    .min(8, 'Email e/ou senha Inválidos')
    .regex(/[!@#$%*&^(),.?":{}|<>]/, 'Email e/ou senha Inválidos')
    .regex(/[A-Z]/, 'Email e/ou senha Inválidos')
    .regex(/[a-z]/, 'Email e/ou senha Inválidos')
    .regex(/[0-9]/, 'Email e/ou senha Inválidos')
});

type LoginFormData = z.infer<typeof loginSchema>;

function page() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  
  const onSubmit = async (data: LoginFormData) => {
    try{
      const response = await fetch('https://nest-api-fork.onrender.com/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if(!response.ok) {
        throw new Error('Erro ao fazer login')
      }
    

      const result = await response.json();
      console.log('Resposta da API:', result);
      router.push('/');

    }catch(error){
    console.error('Erro:', error);
    }
  }

  

  return (
    <div className="flex flex-col items-center md:justify-center h-screen">
      <div className="rounded-lg p-[44px] min-w-[393px] md:border-1  md:shadow-md w-">
        <header>
          <Link href="/initial"><FiChevronLeft className="" size={28} /></Link>
        </header>
        <div className="mt-28 mb-14 md:mt-14">
          <h1 className="text-5xl md:text-[45px] font-bold">Olá!</h1>
          <p className="text-xl italic mt-2">Bom te ver de novo!</p>
        </div>
        <div>
          <form className="space-y-3 mb-3 text-end" onSubmit={handleSubmit(onSubmit)}>
            <SignInput 
              hasError={!!errors.email}
              placeholder={"Email"} 
              type={"email"} 
              {...register('email')} 
            />
            <SignInput
              hasError={!!errors.password}
              placeholder={"Senha"} 
              type={"password"} 
              {...register('password')}
            />
            {(errors.email || errors.password) &&(
              <p className="ml-3 text-sm text-magenta text-bold text-start font-semibold">
                {errors.email?.message || errors.password?.message}</p>
            )}
            <Link className="underline italic text-sm text-end" href="/#">Esqueceu sua senha?</Link>
            <div className="w-full flex justify-center mt-10">
            <Button
              type="submit"
              className="bg-solar-700 w-[191px] h-[42px] rounded-2xl border-b-3 border-[#c04500] 
              hover:bg-[#c04500] cursor-pointer">
              Continuar
            </Button>
            </div>
          </form>
        </div> 
      </div>
    </div>
  );
}

export default page;