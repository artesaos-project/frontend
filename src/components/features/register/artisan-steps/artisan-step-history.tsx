import { Button } from '@/components/ui/button';
import { useArtisanRegister } from '@/hooks/use-artisan-register';

function ArtisanStepHistory({ onNext }: { onNext: () => void }) {
  const artisanStore = useArtisanRegister();
  const handleNext = () => {
    artisanStore.update({
      historico: artisanStore.historico || '',
    });
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
        value={artisanStore.historico || ''}
        onChange={(e) => artisanStore.update({ historico: e.target.value })}
        maxLength={255}
      />

      <Button onClick={handleNext} className="w-full">
        Continuar
      </Button>
    </div>
  );
}

export default ArtisanStepHistory;
