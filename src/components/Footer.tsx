import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  newsSubscription: boolean;
}

function Footer({ newsSubscription }: FooterProps) {
  return (
    <footer>
      {newsSubscription && (
        <div className="bg-midnight flex py-6">
          <div className="mx-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-5">
              Receba as nossas novidades
            </h2>
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Digite seu email..."
                className="bg-sakura text-white rounded-xl px-4 py-5 drop-shadow-lg shadow-black/40 border-none placeholder:text-white placeholder:italic lg:w-xl md:w-lg sm:w-sm"
              />
              <Button className="bg-white text-sakura hover:bg-white/80 cursor-pointer font-bold text-lg py-5 rounded-xl">
                Cadastrar
              </Button>
            </div>
            <div className="flex gap-2 mt-4">
              <Checkbox id="terms" className="checked:bg-white border-2" />
              <Label htmlFor="terms" className="text-white">
                Concordo com a{" "}
                <Link href="/" className="underline underline-offset-2">
                  Política de Privacidade
                </Link>{" "}
                e aceito receber comunicações
              </Label>
            </div>
          </div>
        </div>
      )}
      <div className="bg-dust-500 flex flex-col items-center text-sm py-6">
        <p className="text-midnight font-bold">Central de atendimento</p>
        <Link href="#" className="text-midnight underline">
          sac@criarte.com.br
        </Link>
      </div>
      <div className="bg-dust-300 flex flex-col items-center text-sm py-6">
        <Link href="#" className="text-midnight">
          Endereço físico
        </Link>
        <Link href="#" className="text-midnight">
          E-mail
        </Link>
        <Link href="#" className="text-midnight">
          Telefone
        </Link>
      </div>
      <div className="py-6 flex flex-col md:flex-row justify-center items-center gap-3">
        <Image
          src="/horizontal-logo-azul.svg"
          alt="Logo Criarte"
          width={100}
          height={50}
        />
        <div className="text-midnight text-sm flex flex-col items-center">
          <p className="font-bold">
            {" "}
            ® 2025 Arteiros Caraguá. Todos os direitos reservados.
          </p>
          <Link href="#" className="text-midnight underline">
            Política de Privacidade
          </Link>
          <Link href="#" className="text-midnight underline">
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
