import { Recipe } from "@/types/Recipe";
import DOMPurify from "isomorphic-dompurify";
import { ArrowRight, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type RacipeCardProps = {
  recipe: Recipe;
  url: string;
};

const RecipeCard = ({ recipe, url }: RacipeCardProps) => {
  const safeSummary = DOMPurify.sanitize(recipe.summary ?? "", {
    USE_PROFILES: { html: true },
  });

  return (
    <article
      key={recipe.id}
      className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={800}
          height={500}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {recipe.cuisine?.[0] ?? "Recipe"}
        </span>

        <h2 className="text-xl font-semibold text-foreground">
          {recipe.title}
        </h2>

        <p
          className="min-h-12 line-clamp-2 text-sm leading-6 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: safeSummary }}
        />

        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Clock size={17} />
            {recipe.readyInMinutes} Min
          </span>

          <span className="flex items-center gap-2">
            <User size={17} />
            {recipe.servings} servings
          </span>
        </div>

        <Link
          href={url}
          className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Details
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
};

export default RecipeCard;
