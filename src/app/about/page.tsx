import {
  ArrowRight,
  BookOpen,
  ChefHat,
  Heart,
  Search,
  Sparkle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Search,
    title: "Discover New Recipes",
    description:
      "Explore meal ideas and find recipes that match your taste and ingredients.",
  },
  {
    icon: Heart,
    title: "Save Your Favorites",
    description:
      "Keep your favorite recipes together so you can easily find them again.",
  },
  {
    icon: BookOpen,
    title: "Easy-to-Follow Instructions",
    description:
      "Find ingredients and clear cooking steps to help you prepare each meal.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkle size={17} />A little more about use
            </div>

            <h1 className="text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Making everyday cooking more inspiring
            </h1>

            <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Recipe Finder helps you discover delicious meal ideas, explore new
              dishes, and keep the recipes you love close at hand. We believe
              that cooking should feel enjoyable, approachable, and full of
              possibilities.
            </p>

            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:text-primary-hover"
            >
              Explore Recipes
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative h-72 sm:h-96 lg:h-115">
            <div className="absolute -inset-4 rounded-4xl bg-secondary/10 blur-2xl" />

            <Image
              src="/images/image-about.png"
              alt="A bright kitchen ready for cooking"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <ChefHat size={28} />
          </span>

          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Our Mission
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            Our goal is to make finding your next meal easier. Whether you are
            looking for a quick weekday dinner, a fresh lunch, or inspiration to
            try something new, Recipe Finder is here to help you get started.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
          <p className="text-sm font-semibold tracking-wider text-primary">
            WHAT YOU CAN DO
          </p>

          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            A little help for your kitchen
          </h2>

          <p className="leading-7 text-muted-foreground">
            Everything starts with finding a recipe you are excited to cook.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-lg sm:p-7"
              >
                <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </span>

                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-14 sm:pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-secondary px-6 py-10 text-center sm:px-12 sm:py-14">
          <h2 className="text-2xl font-bold text-secondary-foreground sm:text-3xl">
            Ready to find your next favorite meal?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-secondary-foreground/80">
            Explore recipes, discover new ideas, and bring something delicious
            to your table.
          </p>

          <Link
            href="/recipes"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-surface-hover"
          >
            Browse Recipes
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
