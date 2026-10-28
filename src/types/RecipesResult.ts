import { SearchResponse } from "./SearchResponse";

export type RecipesResult =
  | { success: true; data: SearchResponse }
  | { success: false; message: string; status: number };
