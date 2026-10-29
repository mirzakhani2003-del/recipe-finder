const RecipeLoading = () => {
  return (
    <main
      className="min-h-screen bg-background"
      aria-busy="true"
      aria-label="Loading recipes"
    >
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <div className="h-4 w-36 animate-pulse rounded-full bg-border" />
          <div className="h-10 w-64 max-w-full animate-pulse rounded-lg bg-border" />
          <div className="h-10 w-64 max-w-2xl animate-pulse rounded-lg bg-border" />
        </div>

        <div className="mb-8 grid gap-4 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="h-4 w-20 animate-pulse rounded bg-border" />
              <div className="h-12 animate-pulse rounded-xl bg-border" />
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="aspect-4/3 animate-pulse bg-border"></div>

              <div className="space-y-4 p-5">
                <div className="h-6 w-4/5 animate-pulse rounded bg-border" />
                <div className="h-4 w-2/5 animate-pulse rounded bg-border" />
                <div className="h-4 w-full animate-pulse rounded bg-border" />
                <div className="h-10 w-28 animate-pulse rounded-xl bg-border" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default RecipeLoading;
