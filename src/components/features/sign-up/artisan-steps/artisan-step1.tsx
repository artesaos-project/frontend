import AuthButton from '@/components/common/auth-button';
import AuthInput from '@/components/common/auth-input';

function ArtisanStep1({ onNext }: { onNext: () => void }) {
  const handleNext = () => {
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bem-vindo Artesão!</h2>
      <p className="text-md text-midnight mt-4">
        Vamos continuar seu cadastro...
      </p>
      <form className="flex flex-col gap-4 mt-4">
        <AuthInput placeholder="Nome Comercial" type="text" />
        <AuthInput placeholder="CEP" type="text" />
        <AuthInput placeholder="Endereço" type="text" />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <AuthInput placeholder="Nº" type="text" className="pr-0 pl-5" />
          </div>
          <div className="col-span-2">
            <AuthInput placeholder="Bairro" type="text" />
          </div>
        </div>
        <AuthInput placeholder="Complemento" type="text" />
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="col-span-2">
            <AuthInput placeholder="Cidade" type="text" />
          </div>
          <div className="col-span-1">
            <AuthInput
              placeholder="Estado"
              type="text"
              className="p-0 text-center"
            />
          </div>
        </div>
        <AuthButton text="Continuar" onClick={handleNext} />
      </form>
    </div>
  );
}

export default ArtisanStep1;
