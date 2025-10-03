import { materiaPrima } from '@/constants/materia-prima';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import MultiSelectStep from '../multi-select';

function ArtisanStepRawMaterial({ onNext }: { onNext: () => void }) {
  const artisanStore = useArtisanRegister();

  return (
    <MultiSelectStep
      title="Matéria-prima"
      subtitle="Qual é a matéria-prima do seu trabalho?"
      description="Selecione as opções que melhor representam suas criações. Você pode escolher mais de uma."
      items={materiaPrima}
      initialValue={artisanStore.materiasPrimas || []}
      onSubmit={(sel) => artisanStore.update({ materiasPrimas: sel })}
      onNext={onNext}
      min={1}
      minMessage="Selecione ao menos uma matéria-prima"
      emptyLabel="Nenhum resultado encontrado."
    />
  );
}

export default ArtisanStepRawMaterial;
