import { getStories } from '@/lib/placeholder-data';
import { StoryCard } from '@/components/story-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/hero-section';

export default async function Home() {
  // Fetch a few featured stories (e.g., the first 6 for a better grid)
  const featuredStories = (await getStories()).slice(0, 6);

  return (
    <div className="space-y-16 pb-16">

      <HeroSection />

      <section className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Featured Stories</h2>
            <p className="text-muted-foreground">Hand-picked tales for you to enjoy today.</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex group">
            <Link href="/discover">
              Explore All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {featuredStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No featured stories available right now.</p>
          </div>
        )}

        <div className="mt-8 flex justify-center sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/discover">
              Explore All Stories
            </Link>
          </Button>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-16 sm:px-12 sm:py-24 md:col-span-2 lg:col-span-3">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f46e5,#8b5cf6)] opacity-90" />
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-soft-light" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
            <Sparkles className="h-12 w-12 text-yellow-300 mb-2" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Unleash Your Inner Author
            </h2>
            <p className="text-lg text-white/90">
              Join thousands of writers sharing their stories with the world.
              Our easy-to-use editor helps you focus on what matters most: your words.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-4 rounded-full px-8 shadow-xl">
              <Link href="/create">
                Start Writing Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
