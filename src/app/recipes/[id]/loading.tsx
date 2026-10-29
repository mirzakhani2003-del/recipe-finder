const RecipeDetailsLoading = () => {
  return (
    <main
      className="min-h-screen bg-background"
      aria-busy="true"
      aria-label="Loading recipe details"
    >
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 h-5 w-36 animate-pulse rounded bg-border" />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="h-4 w-32 animate-pulse rounded bg-border" />

            <div className="space-y-3">
              <div className="h-10 w-full max-w-lg animate-pulse rounded-lg bg-border" />
              <div className="h-10 w-3/4 max-w-md animate-pulse rounded-lg bg-border" />
            </div>

            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 w-28 animate-pulse rounded-xl bg-border"
                />
              ))}
            </div>

            <div className="space-y-3 pt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-4 animate-pulse rounded bg-border ${
                    index === 4 ? "w-2/3" : "w-full"
                  }`}
                />
              ))}
            </div>

            <div className="h-12 w-52 animate-pulse rounded-xl bg-border" />
          </div>

          <div className="aspect-4/3 animate-pulse overflow-hidden rounded-3xl bg-border lg:aspect-square" />
        </div>
      </section>
    </main>
  );
};

export default RecipeDetailsLoading;
