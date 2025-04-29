
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Share2, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  storyTitle: string;
  storyDescription: string;
  className?: string;
}

export function ShareButton({ storyTitle, storyDescription, className }: ShareButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Check if Web Share API is supported
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleShare = async () => {
    const shareData = {
      title: storyTitle,
      text: storyDescription,
      url: window.location.href,
    };

    if (canShare) {
      try {
        await navigator.share(shareData);
        console.log('Story shared successfully');
      } catch (err) {
        // Handle errors, e.g., user cancelled share
        console.error('Error sharing:', err);
        // If share fails (e.g., on desktop), fallback to copy link
        if (err instanceof DOMException && err.name === 'AbortError') {
            // User cancelled share, do nothing or show subtle feedback
            console.log('Share cancelled by user.');
        } else {
            // Other error, fallback to copy
             handleCopyLink();
             toast({
                 title: 'Could not open share dialog',
                 description: 'Link copied to clipboard instead.',
                 variant: 'default', // Use default or a warning variant
             });
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: 'Link Copied!',
        description: 'Story link copied to your clipboard.',
      });
      // Reset copied state after a delay
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
      toast({
        title: 'Error Copying Link',
        description: 'Could not copy the link to your clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn(className)}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {/* Conditionally render Web Share API option */}
        {canShare && (
           <DropdownMenuItem onSelect={handleShare} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share via...</span>
           </DropdownMenuItem>
        )}
        {/* Always show Copy Link option */}
        <DropdownMenuItem onSelect={handleCopyLink} className="cursor-pointer">
           {copied ? <Check className="mr-2 h-4 w-4 text-green-600" /> : <LinkIcon className="mr-2 h-4 w-4" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </DropdownMenuItem>
         {/* Potential future option: Share within app (if messaging exists) */}
         {/* <DropdownMenuItem disabled>
            <Send className="mr-2 h-4 w-4" />
            <span>Share to a friend (soon)</span>
         </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
