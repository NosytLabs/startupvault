'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-destructive mb-4">500</div>
        <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="space-x-4">
          <button onClick={reset} className="btn btn-primary">
            Try Again
          </button>
          <a href="/" className="btn btn-secondary">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
