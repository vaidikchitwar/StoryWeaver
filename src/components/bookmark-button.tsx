'use client';

import * as React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Story } from '@/lib/placeholder-data';

interface BookmarkButtonProps {
    story: Story;
    className?: string;
}

export function BookmarkButton({ story, className }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const { toast } = useToast();

    React.useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        setIsBookmarked(bookmarks.some((b: any) => b.id === story.id));
    }, [story.id]);

    const toggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a card
        e.stopPropagation();

        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        let newBookmarks;
        let message;

        if (isBookmarked) {
            newBookmarks = bookmarks.filter((b: any) => b.id !== story.id);
            message = "Removed from bookmarks";
        } else {
            newBookmarks = [story, ...bookmarks];
            message = "Saved to bookmarks";
        }

        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setIsBookmarked(!isBookmarked);

        toast({
            description: message,
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("hover:bg-background/50 hover:text-primary transition-colors", isBookmarked && "text-primary fill-primary", className)}
            onClick={toggleBookmark}
        >
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
        </Button>
    );
}
