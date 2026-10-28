export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: string;
  servings?: string;
  summary?: string;
  cuisine?: string[];
};
