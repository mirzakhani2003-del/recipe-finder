type RecipeIngredient = {
  id: number;
  original: string;
};

type RecipeInstructionStep = {
  number: number;
  step: string;
};

export type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  summary?: string;
  readyInMinutes?: string;
  servings: number;
  cuisines?: string[];
  extendedIngredients?: RecipeIngredient[];
  analyzedInstructions?: {
    steps: RecipeInstructionStep[];
  }[];
  sourceUrl?: string;
};
