import { tecnicas } from '@/constants/tecnicas';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import MultiSelectStep from '../multi-select';

function ArtisanStepTechnique({ onNext }: { onNext: () => void }) {
  const artisanStore = useArtisanRegister();

  return (
    <MultiSelectStep
      title="Técnica"
      subtitle="Qual técnica você utiliza?"
      description="Marque todas as técnicas que fazem parte do seu trabalho."
      items={tecnicas}
      initialValue={artisanStore.tecnicas || []}
      onSubmit={(sel) => artisanStore.update({ tecnicas: sel })}
      onNext={onNext}
      min={1}
      minMessage="Selecione ao menos uma técnica"
      emptyLabel="Nenhum resultado encontrado."
    />
  );
}

export default ArtisanStepTechnique;
