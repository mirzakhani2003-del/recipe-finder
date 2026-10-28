"use client";

import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const popularSearch = ["Pasta", "Chicken", "Avocado", "Salad"];

const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = searchQuery.trim();

    router.push(`/recipes?query=${encodeURIComponent(query)}`);
  };

  const handlePopularSearch = (query: string) => {
    router.push(`/recipes?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="space-y-7">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3 shadow-sm sm:flex-row sm:items-center"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 px-2">
          <Search size={22} className="shrink-0 text-muted-foreground" />

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredient or recipes"
            aria-label="Search ingredient or recipes"
            className="w-full min-w-0 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Search Recipe
          <ArrowRight size={18} />
        </button>
      </form>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          Popular searches
        </p>

        <div className="flex flex-wrap gap-2">
          {popularSearch.map((item) => (
            <button
              key={item}
              onClick={() => handlePopularSearch(item)}
              type="button"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
