'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce'; // Assuming a debounce hook exists

export function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce input by 300ms

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set('q', debouncedSearchTerm);
    } else {
      params.delete('q');
    }
    // Use replace to avoid pushing duplicate history entries while typing
    router.replace(`/discover?${params.toString()}`);
  }, [debouncedSearchTerm, searchParams, router]);

   // Update local state if initialQuery changes (e.g., page load with query)
  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);


  return (
    <div className="relative flex-grow">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by title or author..."
        className="pl-8 w-full h-10" // Adjusted height to match filter
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
