function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight mx-auto mb-4" />
        <p className="text-midnight font-semibold">Carregando...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
