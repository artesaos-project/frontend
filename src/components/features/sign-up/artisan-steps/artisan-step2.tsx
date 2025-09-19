import AuthButton from '@/components/common/auth-button';
import AuthInput from '@/components/common/auth-input';
import { useDateInput } from '@/hooks/useDateInput';
import { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

function ArtisanStep2({ onNext }: { onNext: () => void }) {
  const [dateCadastro, setDateCadastro] = useState('');
  const [dateValidade, setDateValidade] = useState('');
  const { validateAndFormatDate: validateCadastro } = useDateInput({
    onFormattedChange: setDateCadastro,
  });
  const { validateAndFormatDate: validateValidade } = useDateInput({
    onFormattedChange: setDateValidade,
  });

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="text-midnight">
      <h2 className="text-2xl font-bold mb-4">
        Complete seu perfil de artesão
      </h2>
      <p className="text-md mt-4">
        Para que seu perfil seja completo e atraente, preencha suas informações
        profissionais.
      </p>
      <form className="flex flex-col gap-4 mt-4">
        <AuthInput placeholder="Sicab*" type="text" />
        <AuthInput
          placeholder="Data de Cadastro Sicab*"
          type="text"
          value={dateCadastro}
          maxLength={10}
          onChange={(e) => validateCadastro(e.target.value)}
          icon={<FaRegCalendarAlt />}
        />
        <AuthInput
          placeholder="Data de Validade Sicab*"
          type="text"
          value={dateValidade}
          maxLength={10}
          onChange={(e) => validateValidade(e.target.value)}
          icon={<FaRegCalendarAlt />}
        />
        <AuthButton text="Continuar" className="mt-10" onClick={handleNext} />
      </form>
    </div>
  );
}

export default ArtisanStep2;
