import AuthButton from '@/components/common/auth-button';

function Step3({ onNext, goHome }: { onNext: () => void; goHome: () => void }) {
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
      <AuthButton
        text="Sim, quero responder agora"
        className="bg-olivine-600 mt-10 hover:bg-midnight"
        onClick={onNext}
      />
      <AuthButton
        text="Prefiro deixar para depois"
        className="bg-sakura mt-4 hover:bg-salmon"
        onClick={goHome}
      />
    </div>
  );
}

export default Step3;
