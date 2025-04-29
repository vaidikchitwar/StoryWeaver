// @/components/layout/header.tsx
'use client';

import Link from 'next/link';
import { BookOpenText, Home, PlusSquare, Search, TrendingUp } from 'lucide-react'; // Added TrendingUp
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils'; // Ensure cn is imported
import { ThemeToggle } from '@/components/theme-toggle'; // Import ThemeToggle

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = React.useState(currentSearch);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    // Navigate to discovery page with search term
    router.push(`/discover?${params.toString()}`);
  };

   React.useEffect(() => {
    // Sync local search term if URL search param changes (e.g., back/forward navigation)
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);


  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <BookOpenText className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Story Weaver</span>
        </Link>

        <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium flex-grow">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-1 transition-colors hover:text-foreground/80',
              isActive('/') ? 'text-foreground font-semibold' : 'text-foreground/60' // Added font-semibold for active
            )}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/discover"
            className={cn(
              'flex items-center gap-1 transition-colors hover:text-foreground/80',
              isActive('/discover') ? 'text-foreground font-semibold' : 'text-foreground/60' // Added font-semibold for active
            )}
          >
            <Search className="h-4 w-4" />
            Discover
          </Link>
          <Link
            href="/trending" // Added Trending link
            className={cn(
              'flex items-center gap-1 transition-colors hover:text-foreground/80',
              isActive('/trending') ? 'text-foreground font-semibold' : 'text-foreground/60' // Added font-semibold for active
            )}
          >
            <TrendingUp className="h-4 w-4" />
            Trending
          </Link>
          <Link
            href="/create"
            className={cn(
              'flex items-center gap-1 transition-colors hover:text-foreground/80',
              isActive('/create') ? 'text-foreground font-semibold' : 'text-foreground/60' // Added font-semibold for active
            )}
          >
            <PlusSquare className="h-4 w-4" />
            Create
          </Link>
        </nav>

        <div className="flex items-center gap-2">
           {/* Show search only on non-discovery pages or when discovery doesn't have search focus */}
           {/* On discovery page, search is handled within the page */}
          {pathname !== '/discover' && (
             <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stories..."
                className="pl-8 sm:w-[200px] md:w-[250px] lg:w-[300px] h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
           )}
           {/* Add Login/Signup/User Avatar later */}
           {/* <Button variant="outline" size="sm">Sign In</Button> */}
            <ThemeToggle /> {/* Add the theme toggle button */}
        </div>
      </div>
    </header>
  );
}

// Removed duplicate cn function as it should be imported from utils
