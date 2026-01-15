'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function SearchBar({ className, ...props }: SearchBarProps) {
    const router = useRouter();
    const [query, setQuery] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/discover?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className={cn("relative w-full max-w-sm", className)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search stories, authors..."
                className="pl-9 bg-background/50 border-input/60 focus:bg-background transition-colors h-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                {...props}
            />
        </form>
    );
}
