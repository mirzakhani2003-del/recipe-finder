import { ChefHat, Copyright, Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-bold text-primary"
            >
              <ChefHat size={26} />
              Recip Finder
            </Link>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Discover delicious recipes, explore new flavors, and find
              inspiration for your next meal.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">Quick Links</h2>

            <nav className="flex flex-col items-start gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/favorites"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Favorites
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                About
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground">
              Made for Food Lovers
            </h2>

            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <Heart size={16} className="text-primary" /> for
              everyone who loves cooking
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Copyright size={10} /> {new Date().getFullYear()} Recipe Finder. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
