import { Suspense } from 'react';
import { getStories, getCategories } from '@/lib/placeholder-data';
import { StoryCard } from '@/components/story-card';
import { SearchBar } from '@/components/search-bar';
import { CategoryFilter } from '@/components/category-filter';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Heart, MessageSquare } from 'lucide-react';

interface DiscoverPageProps {
  searchParams?: {
    category?: string;
    q?: string;
  };
}

export default function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const selectedCategory = searchParams?.category || 'All';
  const searchTerm = searchParams?.q || '';

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Discover Stories</h1>

      <div className="flex flex-col gap-6 mb-8">
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <SearchBar placeholder="Search for stories, authors, or genres..." className="max-w-xl mx-auto" />
        </Suspense>

        {/* Wrap Filters in Suspense for better UX */}
        <Suspense fallback={<Skeleton className="h-14 w-full" />}>
          <CategoryFilterWrapper selectedCategory={selectedCategory} />
        </Suspense>
      </div>

      {/* Wrap StoryList in Suspense for loading state */}
      <Suspense key={selectedCategory + searchTerm} fallback={<StoryGridSkeleton />}>
        <StoryList category={selectedCategory} searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}

// Wrapper component to fetch categories for the filter
async function CategoryFilterWrapper({ selectedCategory }: { selectedCategory: string }) {
  const categories = await getCategories();
  return <CategoryFilter categories={categories} selectedCategory={selectedCategory} />;
}


// Component to fetch and display stories
async function StoryList({ category, searchTerm }: { category: string; searchTerm: string }) {
  const stories = await getStories(category, searchTerm);

  return (
    <div>
      {stories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          No stories found matching your criteria. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}

// Skeleton loader for the story grid
function StoryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden flex flex-col">
          <Skeleton className="aspect-[2/3] w-full" />
          <div className="p-4 flex-grow space-y-2">
            <Skeleton className="h-5 w-3/4" /> {/* Title */}
            <Skeleton className="h-4 w-1/2" /> {/* Author */}
            <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
            {/* Stats Skeleton */}
            <div className="flex items-center gap-4 pt-1">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
          <div className="p-4 pt-2"> {/* Footer */}
            <Skeleton className="h-5 w-1/4" /> {/* Badge */}
          </div>
        </div>
      ))}
    </div>
  );
}