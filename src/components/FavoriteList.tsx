"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Heart, Trash2, Users } from "lucide-react";
import { FAVORITES_STORAGE_KEY, type FavoriteRecipe } from "../types/Favorite";
import Image from "next/image";

const readFavorites = (): FavoriteRecipe[] => {
  const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  const favoriteRecipes: FavoriteRecipe[] = JSON.parse(stored);

  return favoriteRecipes;
};

const saveFavorites = (favorites: FavoriteRecipe[]): boolean => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch {
    return false;
  }
};

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setIsReady(true);
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);

    if (saveFavorites(updatedFavorites)) {
      setFavorites(updatedFavorites);
    }
  }

  if (!isReady) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading your favorite recipes...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-surface px-6 py-16 text-center">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Heart size={30} />
        </div>

        <h2 className="text-2xl font-bold text-foreground">No favorites yet</h2>

        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Explore our recipes and save the ones you love to find them here.
        </p>

        <Link
          href="/recipes"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Explore Recipes
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((recipe) => (
        <article
          key={recipe.id}
          className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-lg"
        >
          <div className="relative aspect-4/3 overflow-hidden">
            <Link href={`/recipes/${recipe.id}`} className="block size-full">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <button
              type="button"
              onClick={() => removeFavorite(recipe.id)}
              aria-label={`Remove ${recipe.title} from favorites`}
              className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-surface/95 border border-red-400 text-red-400 shadow-sm transition-colors hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>

            <span className="absolute bottom-3 left-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold text-foreground">
              {recipe.cuisines[0] ?? "Recipe"}
            </span>
          </div>

          <div className="p-5">
            <Link href={`/recipes/${recipe.id}`}>
              <h2 className="line-clamp-2 text-lg font-bold text-foreground transition-colors hover:text-primary">
                {recipe.title}
              </h2>
            </Link>

            <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock3 size={16} />
                {recipe.readyInMinutes ?? "—"} min
              </span>

              <span className="flex items-center gap-1.5">
                <Users size={16} />
                {recipe.servings} servings
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FavoritesList;
