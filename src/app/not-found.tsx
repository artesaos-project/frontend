function NotFound() {
  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-[70vh] text-midnight px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Página não encontrada</p>
      <a
        href="/"
        className="text-sakura hover:text-sakura/80 underline text-lg"
      >
        Voltar para a página inicial
      </a>
    </div>
  );
}

export default NotFound;
