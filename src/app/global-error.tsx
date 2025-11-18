'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Erro Fatal
            </h2>
            <p className="mb-6 text-gray-600">
              Ocorreu um erro crítico na aplicação. Por favor, recarregue a
              página.
            </p>
            {error.message && (
              <p className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-800">
                {error.message}
              </p>
            )}
            <button
              onClick={reset}
              className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
            >
              Recarregar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
