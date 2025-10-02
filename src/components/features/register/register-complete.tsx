import { Clock } from 'lucide-react';
import AuthButton from '@/components/common/auth-button';
import { LiaClipboardSolid } from 'react-icons/lia';
import { useRouter } from 'next/navigation';

function SignUpComplete() {
  const route = useRouter();

  return (
    <div className="text-midnight text-center">
      <span className="relative inline-block mx-auto mb-4">
        <LiaClipboardSolid size={64} className="text-midnight" />
        <Clock
          size={24}
          className="absolute bottom-4 right-0 text-salmon bg-white rounded-full m-1"
        />
      </span>
      <h1 className="text-2xl font-bold mb-2">Cadastro em análise</h1>
      <p className="text-md mt-4 mb-15">
        Seu cadastro foi enviado com sucesso e está em análise. Você receberá
        uma notificação assim que for aprovado.
      </p>
      <AuthButton onClick={() => route.push('/')} />
    </div>
  );
}

export default SignUpComplete;
