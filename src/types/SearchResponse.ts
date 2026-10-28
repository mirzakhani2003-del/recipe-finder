import { Recipe } from "./Recipe";

export type SearchResponse = {
  results: Recipe[];
  totalResults: number;
};
