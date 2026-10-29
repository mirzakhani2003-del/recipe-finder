"use client";

import { FavoriteRecipe, FAVORITES_STORAGE_KEY } from "@/types/Favorite";
import { BookBookmark, Heart } from "lucide-react";
import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  recipe: FavoriteRecipe;
};

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

const FavoriteButton = ({ recipe }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsFavorite(readFavorites().some((item) => item.id === recipe.id));

    setIsReady(true);
  }, [recipe.id]);

  const toggleFavorite = () => {
    const favorites = readFavorites();

    const alreadySaved = favorites.some((item) => item.id === recipe.id);

    const updatedFavorites = alreadySaved
      ? favorites.filter((item) => item.id !== recipe.id)
      : [...favorites, recipe];

    if (saveFavorites(updatedFavorites)) {
      setIsFavorite(!alreadySaved);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={!isReady}
      aria-pressed={isFavorite}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-wait disabled:opacity-70"
    >
      {isFavorite ? (
        <Heart size={19} fill="currentColor" />
      ) : (
        <BookBookmark size={19} />
      )}
      {isFavorite ? "Remove from favorites" : "Save to favorites"}
    </button>
  );
};

export default FavoriteButton;
