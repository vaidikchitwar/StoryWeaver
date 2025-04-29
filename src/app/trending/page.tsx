import { Suspense } from 'react';
import { getTrendingStoriesByGenre, type TrendingStories } from '@/lib/placeholder-data';
import { StoryCard } from '@/components/story-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const STORIES_PER_GENRE = 4; // Number of trending stories to show per genre

export default function TrendingPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold tracking-tight">Trending Stories</h1>

      <Suspense fallback={<TrendingSkeleton />}>
        <TrendingList />
      </Suspense>
    </div>
  );
}

async function TrendingList() {
  const trendingData = await getTrendingStoriesByGenre(STORIES_PER_GENRE);
  const genres = Object.keys(trendingData);

  if (genres.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No trending stories available right now.</p>;
  }

  return (
    <div className="space-y-10">
      {genres.map((genre, index) => (
        <section key={genre}>
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">{`Trending in ${genre}`}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingData[genre].map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
          {index < genres.length - 1 && <Separator className="mt-10" />}
        </section>
      ))}
    </div>
  );
}

function TrendingSkeleton() {
    const placeholderGenres = ['Fantasy', 'Science Fiction', 'Romance']; // Example genres for skeleton
    return (
      <div className="space-y-10">
        {placeholderGenres.map((genre, index) => (
          <section key={genre}>
             <Skeleton className="h-8 w-1/3 mb-4 pb-2" /> {/* Skeleton for Genre Title */}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(STORIES_PER_GENRE)].map((_, i) => (
                    <StoryCardSkeleton key={i} />
                ))}
             </div>
              {index < placeholderGenres.length - 1 && <Skeleton className="h-px w-full mt-10" />} {/* Skeleton for Separator */}
          </section>
        ))}
      </div>
    );
}


// Reusable Skeleton for a single story card
function StoryCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-6 w-1/3" />
    </div>
  );
}
