export type FavoriteRecipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number | null;
  servings: number;
  cuisines: string[];
};

export const FAVORITES_STORAGE_KEY = "recipe-finder-favorites";
