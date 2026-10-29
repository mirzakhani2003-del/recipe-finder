import FavoritesList from "@/components/FavoriteList";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Heart size={16} />
            Your collection
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Your Favorite Recipes
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            All your saved recipes in one place. Keep the dishes you love close
            at hand.
          </p>
        </div>

        <FavoritesList />
      </section>
    </div>
  );
};

export default FavoritesPage;
