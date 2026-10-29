import { RecipeDetails } from "./RecipeDetails";

export type RecipeDetailsResult =
  | { success: true; data: RecipeDetails }
  | { success: false; message: string; status: number };
