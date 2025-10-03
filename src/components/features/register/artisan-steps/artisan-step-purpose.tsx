import { finalidades } from '@/constants/finalidades';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import MultiSelectStep from '../multi-select';

function ArtisanStepPurpose({ onNext }: { onNext: () => void }) {
  const artisanStore = useArtisanRegister();

  return (
    <MultiSelectStep
      title="Finalidade"
      subtitle="Qual é a finalidade das suas peças?"
      description="Escolha as opções que se aplicam. É possível selecionar mais de uma."
      items={finalidades}
      initialValue={artisanStore.finalidades || []}
      onSubmit={(sel) => artisanStore.update({ finalidades: sel })}
      onNext={onNext}
      min={1}
      minMessage="Selecione ao menos uma finalidade"
      emptyLabel="Nenhum resultado encontrado."
    />
  );
}

export default ArtisanStepPurpose;
