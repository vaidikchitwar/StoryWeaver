'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory?: string;
    className?: string;
}

export function CategoryFilter({ categories, selectedCategory = 'All', className }: CategoryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category === 'All') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        router.push(`/discover?${params.toString()}`);
    };

    const allCategories = ['All', ...categories];

    return (
        <div className={cn("w-full relative", className)}>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40 p-2">
                <div className="flex w-max space-x-2 p-1">
                    {allCategories.map((category) => (
                        <Badge
                            key={category}
                            variant={category === selectedCategory ? 'default' : 'outline'}
                            className={cn(
                                "cursor-pointer hover:bg-primary/90 hover:text-primary-foreground transition-colors px-4 py-1.5 text-sm",
                                category === selectedCategory ? "bg-primary text-primary-foreground shadow-sm" : "bg-transparent text-muted-foreground hover:bg-muted"
                            )}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </Badge>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
            {/* Fade overlay for overflowing content indication could go here */}
        </div>
    );
}
