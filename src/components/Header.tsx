"use client";

import { ChefHat, Heart, House, Info, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border border-border bg-background">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black text-primary"
        >
          <ChefHat size={50} />
          <span>Recipe Finder</span>
        </Link>

        <nav className="hidden gap-8 items-center md:flex">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
          >
            <House size={18} />
            Home
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
          >
            <Heart size={18} />
            Favorites
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
          >
            <Info size={18} />
            About
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-surface-hover md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="mx-auto max-w-7xl flex flex-col gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
            >
              <House size={18} />
              Home
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
            >
              <Heart size={18} />
              Favorites
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
            >
              <Info size={18} />
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
