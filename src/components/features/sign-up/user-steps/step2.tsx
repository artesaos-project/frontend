import AuthButton from '@/components/common/auth-button';
import { FaCheck } from 'react-icons/fa6';

function Step2({ onNext, goHome }: { onNext: () => void; goHome: () => void }) {
  const handleArtisan = () => {
    onNext();
  };

  return (
    <div>
      <FaCheck size={100} className="text-olivine-600 mx-auto" />
      <div className="text-center mt-4 text-midnight">
        <h1 className="font-bold text-4xl">Parabéns!</h1>
        <h2 className="text-md">Seu cadastro foi concluído com sucesso.</h2>
      </div>
      <div className="mt-6 text-midnight text-center px-4">
        <span className="font-bold text-2xl">Voce é Artesão?</span>
        <p className="text-md mt-2">
          Ao ativar essa opção, você poderá divulgar suas criações, exibir
          preços e alcançar mais pessoas interessadas no seu trabalho.
        </p>
        <AuthButton
          text="Sim, sou artesão"
          className="bg-olivine-600 mt-4 hover:bg-midnight"
          onClick={handleArtisan}
        />
        <AuthButton
          text="Não sou artesão"
          className="bg-sakura mt-4 hover:bg-salmon"
          onClick={goHome}
        />
      </div>
    </div>
  );
}

export default Step2;
