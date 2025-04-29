import { Suspense } from 'react';
import { getStories, getCategories } from '@/lib/placeholder-data';
import { StoryCard } from '@/components/story-card';
import { SearchBar } from './_components/search-bar';
import { CategoryFilter } from './_components/category-filter';
import { Skeleton } from '@/components/ui/skeleton';

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

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        {/* Wrap Filters in Suspense for better UX */}
        <Suspense fallback={<Skeleton className="h-10 w-full md:w-1/3 lg:w-1/4" />}>
           <CategoryFilterWrapper selectedCategory={selectedCategory} />
        </Suspense>
        <SearchBar initialQuery={searchTerm} />
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
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
           <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ))}
    </div>
  );
}
