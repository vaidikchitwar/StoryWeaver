'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils'; // Import cn and formatNumber

interface LikeButtonProps {
  initialLikes: number;
  storyId: string;
  // Add initialLiked state if we know if the current user liked it
  // initialLiked?: boolean;
}

export function LikeButton({ initialLikes, storyId }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false); // Assume not liked initially
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const newLikedState = !isLiked;
    const newLikeCount = newLikedState ? likes + 1 : likes - 1;

    // Optimistic UI update
    setIsLiked(newLikedState);
    setLikes(newLikeCount);

    console.log(`Toggling like for story ${storyId}. New state: ${newLikedState}`);

    try {
      // Simulate API call to update like status
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, you'd make an API request here
      // await api.likeStory(storyId, newLikedState);
      console.log('API call successful');

    } catch (error) {
      console.error('Failed to update like status:', error);
      // Revert UI changes on error
      setIsLiked(!newLikedState);
      setLikes(likes);
      // Show error toast to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isLiked ? 'default' : 'outline'}
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      aria-pressed={isLiked} // Accessibility
      aria-label={isLiked ? 'Unlike this story' : 'Like this story'}
    >
      <Heart
        className={cn('mr-2 h-4 w-4', isLiked && 'fill-current text-primary-foreground')} // Fill heart when liked
      />
      {formatNumber(likes)} {likes === 1 ? 'Like' : 'Likes'}
    </Button>
  );
}
