"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">⚠</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Something Went Wrong</h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-background rounded-lg font-semibold hover:bg-gold/90 transition-all"
        >
          Try Again
        </button>
      </div>
    </main>
  )
}
