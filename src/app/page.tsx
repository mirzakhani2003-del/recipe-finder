import HomeSearch from "@/components/HomeSearch";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Pasta",
    description: "Comforting classics for every occasion.",
    image: "/images/image1.png",
    query: "pasta",
  },
  {
    title: "Fresh and Healthy",
    description: "Fresh ideas for a balance meal.",
    image: "/images/image2.png",
    query: "healthy",
  },
  {
    title: "Quick Meals",
    description: "Delicious meals when time is short.",
    image: "/images/image3.png",
    query: "quick meals",
  },
];
export default function Home() {
  return (
    <div>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl grid items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={17} />
              Your next favorite meal
            </div>

            <div className="space-y-5">
              <h1 className="max-w-xl text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Find recipes, cook something amazing.
              </h1>

              <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                Discover delicious recipes using the ingredients you already
                have. Your next favorite meal starts here.
              </p>
            </div>

            <HomeSearch />
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-4xl bg-secondary/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/images/image1.png"
                alt="Fresh pasta with tomato and basil"
                width={1200}
                height={1200}
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="h-72 w-full object-cover sm:h-96 lg:h-125"
              />

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/30 bg-background/95 p-4 shadow-lg sm:inset-x-6 sm:bottom-6 sm:p-5">
                <p className="text-sm text-muted-foreground">
                  A little inspiration
                </p>

                <p className="mt-1 text-lg font-semibold text-foreground">
                  Make something delicious today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8">
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-wide text-primary">
                FIND YOUR INSPIRATION
              </p>

              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                What are you craving?
              </h2>

              <p className="max-w-xl text-muted-foreground">
                Explore food ideas and discover something new to cook.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => (
              <Link
                key={item.title}
                href={`recipes?query${encodeURIComponent(item.query)}`}
                className="group overflow-hidden border border-border rounded-2xl bg-background transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={520}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 20vw, 33vw"
                    className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 p-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={20}
                    className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
