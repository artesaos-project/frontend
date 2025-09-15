import AuthButton from '@/components/common/auth-button';

function ArtisanStep6({ onNext }: { onNext: () => void }) {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="text-midnight">
      <h1 className="text-2xl font-bold mb-2">Queremos te conhecer!</h1>
      <h2 className="text-md italic mb-1">
        Descreva brevemente sua jornada como artesão.
      </h2>
      <p className="text-md mt-4 italic text-center font-bold">
        Breve histórico profissional como Artesão
      </p>
      <textarea
        className="w-full h-60 border-2 border-midnight rounded-3xl p-4 mt-4 resize-none mb-10"
        placeholder="Escreva aqui..."
      />

      <AuthButton onClick={handleNext} />
    </div>
  );
}

export default ArtisanStep6;
