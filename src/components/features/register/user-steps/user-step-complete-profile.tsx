import { Button } from '@/components/ui/button';
import { useArtisanRegister } from '@/hooks/use-artisan-register';
import { authApi } from '@/services/api';

function StepComplete({
  onNext,
  goHome,
}: {
  onNext: () => void;
  goHome: () => void;
}) {
  const handleSubmit = async () => {
    const artisanStore = useArtisanRegister.getState();
    try {
      const response = await authApi.initiate(true);
      artisanStore.update({ applicationId: response.applicationId });
      onNext();
    } catch (error) {
      console.error('Error submitting profile completion:', error);
    }
  };
  return (
    <div>
      <h1 className="font-bold text-2xl text-midnight text-center">
        Quer completar seu perfil de artesão agora?
      </h1>
      <p className="text-md text-midnight text-center mt-4">
        Ao responder algumas perguntas, você poderá divulgar seus trabalhos de
        forma mais personalizada e atrair mais interessados.
      </p>
      <p className="text-md text-midnight text-center mt-4">
        Se preferir, pode fazer isso depois.
      </p>
      <div className="flex flex-col">
        <Button
          variant="primary"
          className="mt-10 rounded-2xl p-5"
          onClick={handleSubmit}
        >
          Sim, quero responder agora
        </Button>
        <Button
          variant="secondary"
          className="mt-4 rounded-2xl p-5"
          onClick={goHome}
        >
          Prefiro deixar para depois
        </Button>
      </div>
    </div>
  );
}

export default StepComplete;
