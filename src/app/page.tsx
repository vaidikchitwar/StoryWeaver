import { getStories } from '@/lib/placeholder-data';
import { StoryCard } from '@/components/story-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  // Fetch a few featured stories (e.g., the first 3)
  const featuredStories = (await getStories()).slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-secondary rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to Story Weaver</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Discover captivating stories from talented authors or unleash your own creativity and start writing today.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/discover">
              Explore Stories <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
           <Button asChild variant="outline" size="lg">
            <Link href="/create">Start Writing</Link>
          </Button>
        </div>
      </section>

       <section>
         <h2 className="text-2xl font-semibold mb-6">Featured Stories</h2>
         {featuredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
         ) : (
            <p className="text-muted-foreground">No featured stories available right now.</p>
         )}

       </section>

        <section className="text-center py-10">
            <Button asChild variant="link">
                <Link href="/discover">
                    See All Stories <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </Button>
       </section>
    </div>
  );
}
