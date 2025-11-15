export default function AnalyticsErrorState({
  errorMessage,
  onRetry,
}: {
  errorMessage: string | undefined
  onRetry: () => void
}) {
  return (
    <div className="py-12 text-center">
      <div className="mb-4 text-red-400">
        <svg
          className="mx-auto size-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="mb-2 font-mono text-lg text-slate-200">
        ERROR_LOADING_ANALYTICS
      </h3>
      <p className="mb-4 text-slate-400">
        {errorMessage ?? "Failed to load analytics data"}
      </p>
      <button
        onClick={onRetry}
        className="rounded bg-purple-600 px-4 py-2 font-mono text-sm text-white transition-colors hover:bg-purple-700"
      >
        RETRY
      </button>
    </div>
  )
}
