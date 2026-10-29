import { RecipeDetails } from "@/types/RecipeDetails";
import { RecipeDetailsResult } from "@/types/RecipeDetailsResult";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChefHat,
  Clock,
  Lightbulb,
  Users,
} from "lucide-react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

type RecipeDetailsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ returnTo: string }>;
};

const getRecipeDetails = async (id: string): Promise<RecipeDetailsResult> => {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      message: "Spoonacular API Key is not configured",
      status: 500,
    };
  }

  const apiUrl = new URL(
    `https://api.spoonacular.com/recipes/${id}/information`,
  );

  apiUrl.searchParams.set("apiKey", apiKey);

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

      if (response.status === 404) {
        return {
          success: false,
          status: 404,
          message: "Recipe not found. Please choose another recipe.",
        };
      }

      return {
        success: false,
        message: "Failed to fetch recipe from Spoonacular.",
        status: response.status,
      };
    }

    const data = (await response.json()) as RecipeDetails;

    return { success: true, data: data };
  } catch {
    return {
      success: false,
      message: "Failed to fetch recipe from Spoonacular.",
      status: 502,
    };
  }
};

const RecipeDetailsPage = async ({
  params,
  searchParams,
}: RecipeDetailsPageProps) => {
  const [{ id }, queryParams] = await Promise.all([params, searchParams]);

  const requstedReturnTo = queryParams.returnTo;

  const backHref =
    requstedReturnTo === "/recipes" || requstedReturnTo?.startsWith("/recipes?")
      ? requstedReturnTo
      : "recipes";

  const isValid = /^\d+$/.test(id) && Number(id) > 0;

  const result = isValid ? await getRecipeDetails(id) : null;

  if (!result) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:py-12">
          <Link
            href={backHref}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-hover"
          >
            <ArrowLeft size={18} />
            Back to recipes
          </Link>

          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Recipe not found
            </h1>
            <p className="mt-3 text-muted-foreground">
              We could not, load this recipe. Please try again or choose another
              recipe.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const recipe = result.success ? result.data : null;

  const ingredients = recipe?.extendedIngredients ?? [];

  const safeSummary = DOMPurify.sanitize(
    recipe?.summary ?? "No description is available.",
    {
      USE_PROFILES: { html: true },
    },
  );

  const instructions =
    recipe?.analyzedInstructions?.flatMap((instruction) =>
      instruction.steps.map((step) => ({
        number: step.number,
        description: step.step,
      })),
    ) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:py-12">
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to recipes
        </Link>

        {!result.success ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Unable to load recipe
            </h2>
            <p className="mt-3 text-muted-foreground">{result.message}</p>
            <p className="text-muted-foreground">{result.status}</p>
            <Link
              href={backHref}
              className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Back to recipes
            </Link>
          </div>
        ) : (
          recipe && (
            <>
              <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-5">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                    {recipe?.cuisines?.[0] ?? "recipe"}
                  </span>

                  <h1 className="text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    {recipe?.title}
                  </h1>

                  <p
                    className="max-w-2xl leading-7 text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: safeSummary }}
                  />

                  <div className="flex flex-wrap gap-5 p-2">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Clock size={21} />
                      </span>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Time
                        </p>
                        <p className="font-semibold text-foreground">
                          {recipe?.readyInMinutes ?? "Not available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Users size={21} />
                      </span>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Servings
                        </p>
                        <p className="font-semibold text-foreground">
                          {recipe?.servings ?? "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96 lg:h-110">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </section>

              <section className="mt-14 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <ChefHat size={22} />
                    </span>

                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        Ingredients
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Everything you will need
                      </p>
                    </div>
                  </div>

                  {ingredients.length > 0 ? (
                    <ul className="space-y-4">
                      {ingredients.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          className="flex items-center gap-3 text-sm leading-6 text-foreground"
                        >
                          <CheckCircle
                            size={19}
                            className="mt-0.5 shrink-0 text-secondary"
                          />
                          <span>{ingredient.original}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-6 text-muted-foreground">
                      Ingredient information is not available for this recipe.
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Instructions
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Follow these simple steps to prepare your meal
                    </p>
                  </div>

                  {instructions.length > 0 ? (
                    <ol className="space-y-5">
                      {instructions.map((step) => (
                        <li
                          key={step.number}
                          className="flex gap-4 rounded-2xl border border-border bg-surface p-5 sm:p-6"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                            {step.number}
                          </span>

                          <p className="text-sm leading-7 text-muted-foreground">
                            {step.description}
                          </p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="rounded-2xl border border-border bg-surface p-6">
                      <p className="text-sm leading-7 text-muted-foreground">
                        Cooking instructions are not available for this recipe.
                      </p>

                      {recipe.sourceUrl && (
                        <a
                          href={recipe.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex font-semibold text-primary hover:text-primary-hover"
                        >
                          View original recipe
                          <ArrowLeft size={17} className="ml-2" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </section>

              <section className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Lightbulb size={22} />
                  </span>

                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Tips & Notes
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A few tips to make your recipe even better
                    </p>
                  </div>
                </div>

                {recipe.sourceUrl ? (
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-semibold text-primary transition-colors hover:text-primary-hover"
                  >
                    View original recipe
                    <ArrowRight size={17} className="ml-2" />
                  </a>
                ) : (
                  <p className="text-sm leading-7 text-muted-foreground">
                    No additional tips are available for this recipe.
                  </p>
                )}
              </section>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
