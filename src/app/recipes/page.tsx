import { RecipeFilter } from "@/types/RecipeFilter";
import { SearchResponse } from "@/types/SearchResponse";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { RecipesResult } from "@/types/RecipesResult";

const PAGE_SIZE = 6;

type RecipesPageProps = {
  searchParams: Promise<{
    query?: string;
    cuisine?: string;
    diet?: string;
    sort?: string;
    page?: string;
  }>;
};

const cuisineOptions = [
  { value: "", label: "All cuisines" },
  { value: "Italian", label: "Italian" },
  { value: "Mediterranean", label: "Mediterranean" },
  { value: "Asian", label: "Asian" },
  { value: "Mexican", label: "Mexican" },
  { value: "American", label: "American" },
];

const dietOptions = [
  { value: "", label: "All diets" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "ketogenic", label: "Ketogenic" },
  { value: "paleo", label: "Paleo" },
];

const sortOptions = [
  { value: "", label: "Recommended" },
  { value: "popularity", label: "Most popular" },
  { value: "time", label: "Quickest first" },
];

const getRecipes = async (filters: RecipeFilter): Promise<RecipesResult> => {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      message: "Spoonacular API Key is not configured",
      status: 500,
    };
  }

  const apiUrl = new URL("https://api.spoonacular.com/recipes/complexSearch");

  if (filters.query) {
    apiUrl.searchParams.set("query", filters.query);
  }

  if (filters.cuisine) {
    apiUrl.searchParams.set("cuisine", filters.cuisine);
  }

  if (filters.diet) {
    apiUrl.searchParams.set("diet", filters.diet);
  }

  if (filters.sort) {
    apiUrl.searchParams.set("sort", filters.sort);
    apiUrl.searchParams.set(
      "sortDirection",
      filters.sort === "time" ? "asc" : "desc",
    );
  }

  apiUrl.searchParams.set("number", String(PAGE_SIZE));
  apiUrl.searchParams.set("offset", String((filters.page - 1) * PAGE_SIZE));

  apiUrl.searchParams.set("addRecipeInformation", "true");
  apiUrl.searchParams.set("apiKey", apiKey);

  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) {
      if (response.status === 402) {
        return {
          success: false,
          message:
            "Your daily points limit of 50 has been reached. Please upgrade your plan to continue using the API.",
          status: response.status,
        };
      }

      return {
        success: false,
        message: "Failed to fetch recipe from Spoonacular.",
        status: response.status,
      };
    }

    const data = (await response.json()) as SearchResponse;

    if (filters.sort === "time") {
      data.results.sort(
        (a, b) => Number(a.readyInMinutes) - Number(b.readyInMinutes),
      );
    }

    return { success: true, data: data };
  } catch {
    return {
      success: false,
      message: "Failed to fetch recipe from Spoonacular.",
      status: 502,
    };
  }
};

const RecipesPage = async ({ searchParams }: RecipesPageProps) => {
  const params = await searchParams;

  const query = params.query?.trim() ?? "";
  const diet = params.diet?.trim() ?? "";
  const cuisine = params.cuisine?.trim() ?? "";
  const sort = params.sort?.trim() ?? "";

  const requestPage = Number(params.page ?? "1");
  const page =
    Number.isFinite(requestPage) && requestPage > 0 ? requestPage : 1;

  const result = await getRecipes({ query, cuisine, diet, sort, page });

  const data = result.success ? result.data : null;

  const recipes = data?.results ?? [];

  const totalPages = data ? Math.ceil(data.totalResults / PAGE_SIZE) : 0;

  const createPageUrl = (pageNumber: number) => {
    const pageParams = new URLSearchParams();

    if (query) {
      pageParams.set("query", query);
    }

    if (cuisine) {
      pageParams.set("cuisine", cuisine);
    }

    if (diet) {
      pageParams.set("diet", diet);
    }

    if (sort) {
      pageParams.set("sort", sort);
    }

    pageParams.set("page", String(pageNumber));

    return `/recipes?${pageParams.toString()}`;
  };

  const createDetailsUrl = (recipeId: number) => {
    const returnTo = createPageUrl(page);

    const params = new URLSearchParams({ returnTo });

    return `/recipes/${recipeId}?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Explore recipes
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Discover delicious recipe
          </h1>

          <p className="max-w-2xl leading-7 text-muted-foreground">
            Find inspiration for your next meal, from quick weekday dishes to
            fresh and healthy favorites.
          </p>
        </div>

        <div className="mb-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {data ? recipes.length : 0} recipes
              </span>
              {query && (
                <span className="font-semibold text-foreground">
                  For &quot;{query}&quot;
                </span>
              )}
            </p>
          </div>

          <form
            action="/recipes"
            method="GET"
            className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:flex-wrap sm:items-end"
          >
            <div className="min-w-0 flex-1 space-y-2 sm:basis-full">
              <label
                htmlFor="query"
                className="block text-sm font-semibold text-foreground"
              >
                Search recipes
              </label>

              <input
                type="search"
                id="query"
                name="query"
                defaultValue={query}
                placeholder="Search by recipe name or ingredients..."
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
              />
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="cuisine"
                className="block text-sm font-semibold text-foreground"
              >
                Cuisine
              </label>

              <select
                name="cuisine"
                id="cuisine"
                defaultValue={cuisine}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20"
              >
                {cuisineOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="diet"
                className="block text-sm font-semibold text-foreground"
              >
                Diet
              </label>

              <select
                id="diet"
                name="diet"
                defaultValue={diet}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20"
              >
                {dietOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="sort"
                className="block text-sm font-semibold text-foreground"
              >
                Sort by
              </label>

              <select
                id="sort"
                name="sort"
                defaultValue={sort}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20"
              >
                {sortOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:min-w-32"
            >
              Apply Filters
            </button>
          </form>
        </div>

        {!result.success ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Unable to load recipes
            </h2>
            <p className="mt-3 text-muted-foreground">{result.message}</p>
            <p className="text-muted-foreground">{result.status}</p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Back to Home
            </Link>
          </div>
        ) : recipes.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              No recipes found
            </h2>
            <p className="mt-3 text-muted-foreground">
              Try a different recipe name or ingredient.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                url={createDetailsUrl(recipe.id)}
              />
            ))}
          </div>
        )}

        {data && totalPages > 1 && (
          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
            aria-label="Recipe results pages"
          >
            {page > 1 && (
              <Link
                href={createPageUrl(page - 1)}
                className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
              >
                Previous
              </Link>
            )}

            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>

            {page < totalPages && (
              <Link
                href={createPageUrl(page + 1)}
                className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </section>
    </div>
  );
};

export default RecipesPage;
