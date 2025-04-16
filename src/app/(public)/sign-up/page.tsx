'use client'

import React from 'react';
import { Button } from "@/components/ui/button";
import { FiChevronLeft } from "react-icons/fi";
import SignInput from "./components/SignInput";
import Link from 'next/link';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z.object({
  nome: z.string()
    .min(2, { message: "Digite um nome com pelo menos 2 letras." }),

  nomeSocial: z.string().optional(),

  cpf: z.string()
    .min(11, { message: "O CPF deve ter 11 números." })
    .max(11, { message: "O CPF deve ter no máximo 11 números." })
    .regex(/^\d{11}$/, {message: "O cpf deve conter apenas numeros"}),

  email: z.string()
    .nonempty({ message: "O e-mail é obrigatório." })
    .email({ message: "Digite um e-mail válido." }),

  dataAniversario: z.string()
    .nonempty({ message: "A data de nascimento é obrigatória." }),

  senha: z.string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),

  codigoPais: z.string()
    .nonempty({ message: "O código do país é obrigatório." }),

  ddd: z.string()
    .nonempty({ message: "O código de área é obrigatório." })
    .min(2, { message: "O código de área deve ter 2 dígitos." })
    .max(2, { message: "O código de área deve ter 2 dígitos." })
    .regex(/^\d{2}$/, { message: "O código de área deve conter apenas números." }),
  

  telefone: z.string()
    .min(10, { message: "O telefone deve ter no mínimo 10 dígitos (DDD + número)." })
    .max(11, { message: "O telefone deve ter no máximo 11 dígitos." })
    .regex(/^\d{10,11}$/, {message: "O telefone deve possuir apenas numeros"}),
});


type signUpSchemaData = z.infer<typeof signUpSchema>

function SignUp() {
  const {register,
    handleSubmit, 
    formState: {errors}} 
    = useForm<signUpSchemaData>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        nome: "",
        nomeSocial: "",
        cpf: "",
        email: "",
        dataAniversario: "",
        senha: "",
        codigoPais: "+55",
        ddd: "",
        telefone: ""
      },
  });

  async function createUser(data: signUpSchemaData) {
    const telefoneCompleto = `${data.codigoPais}${data.ddd}${data.telefone}`;
  
    const userData = {
      ...data,
      telefone: telefoneCompleto,
    };
  
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao criar usuário.");
      }
  
      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao criar usuário. Tente novamente.");
    }
  }
  
  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="rounded-lg shadow-md p-[44px] min-h-[852px] sm:w-96  w-full border-1">
            <header className="mb-6">
              <Link href="/initial"><FiChevronLeft className="" size={28}/></Link>
            </header>
    
        <div className="mb-6">
          <h1 className="text-5xl md:text-5xl font-bold mb-2">Olá!</h1>
          <p>
            Cadastre-se e <br />descubra o melhor do artesanato.
          </p>
        </div>
        <div>
            <form className="space-y-3 mb-6 text-[#985E00]" onSubmit={handleSubmit(createUser)}>
              <div>
                <SignInput placeholder={"Nome*"} type={"text"} {...register('nome')} hasError={!!errors.nome}/>
                {errors.nome && <span className='text-sm text-red-500'>{errors.nome.message}</span>}
              </div>

              <div>
                <SignInput placeholder={"Nome Social"} type={"text"} {...register('nomeSocial')}/>
              </div>

              <div>
                <SignInput placeholder={"CPF*"} type={"text"} {...register('cpf')} hasError={!!errors.cpf}/>
                {errors.cpf && <span className='text-sm text-red-500'>{errors.cpf.message}</span>}
              </div>

              <div>
                <SignInput placeholder={"Email*"} type={"email"} {...register('email')} hasError={!!errors.email}/>
                {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
              </div>

              <div>
                <SignInput placeholder={"Data de Nascimento"} type={"date"} {...register('dataAniversario')} hasError={!!errors.dataAniversario}/>
                {errors.dataAniversario && <span className='text-sm text-red-500'>{errors.dataAniversario.message}</span>}
              </div>

              <div>
                <SignInput placeholder={"Senha*"} type={"password"} {...register('senha')} hasError={!!errors.senha}/>
                {errors.senha && <span className='text-sm text-red-500'>{errors.senha.message}</span>}
              </div>

              <div>
                <SignInput placeholder={"Confirmação de Senha*"} type={"password"} />
              </div>

              <div className='grid grid-cols-4 gap-2'>
                  <select {...register('codigoPais')} className="p-2 border bg-[#FFF2DE] placeholder:text-[#985E00] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] rounded-[20px] font-bold ">
                    <option value="+55">+55</option>
                  </select>

                <div>
                  <SignInput placeholder={"DDD"} type={"text"} {...register('ddd')} hasError={!!errors.ddd}/>
                </div>

                <div className='col-span-2'>
                  <SignInput placeholder={"Telefone"} type={"tel"} {...register('telefone')} hasError={!!errors.telefone}/>
                </div>
              </div>

              {(errors.telefone || errors.ddd || errors.codigoPais) && (
                <p className='text-sm text-red-500'>
                  {errors.telefone?.message || errors.ddd?.message || errors.codigoPais?.message}
                </p>
              )}


              <div className="text-sm text-gray-600 text-center mb-6">
                <p>
                  Ao continuar, você concorda com os <br />
                  <a href="#" className="text-black underline">
                    Termos de Uso e Privacidade
                  </a>
                </p>
              </div>

              <div className="flex justify-center">
                  <Button className="w-[191px] h-[42px] bg-[#E05D00] hover:bg-[#c05000] text-white py-2 px-6 rounded-[20px] border-b-4 border-[#a04500] " type='submit'>
                      Continuar
                  </Button>
              </div>
            </form>
        </div>
      </div>
    </div>
    

  );
}

export default SignUp;