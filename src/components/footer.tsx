import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (

    <footer>
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
      <div className="py-6 bg-white flex flex-col md:flex-row justify-center items-center gap-3">
        <Image
          src="/horizontal-logo-azul.svg"
          alt="Logo Criarte"
          width={100}
          height={50}
        />
        <div className="text-midnight text-sm flex flex-col items-center">
          <p className="font-bold">
            {' '}
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
