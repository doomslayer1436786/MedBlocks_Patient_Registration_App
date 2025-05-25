'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Something went wrong!</h3>
        <p className="mt-1 text-sm text-gray-500">{error.message}</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
} 