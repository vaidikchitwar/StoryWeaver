'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Rss, Check, Loader2 } from 'lucide-react';
import { toggleSubscription, getUserSubscriptions, type AuthorSubscription } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SubscribeButtonProps {
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  className?: string;
}

export function SubscribeButton({ authorId, authorName, authorAvatar, className }: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null); // null indicates loading state
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check initial subscription status on mount
    const checkSubscription = async () => {
      try {
        const subscriptions = await getUserSubscriptions();
        setIsSubscribed(subscriptions.some(sub => sub.authorId === authorId));
      } catch (error) {
        console.error("Failed to check subscription status:", error);
        setIsSubscribed(false); // Assume not subscribed on error
      }
    };
    checkSubscription();
  }, [authorId]);

  const handleSubscribeToggle = async () => {
    if (isLoading || isSubscribed === null) return;
    setIsLoading(true);

    try {
      const newSubscriptionState = await toggleSubscription(authorId, authorName, authorAvatar);
      setIsSubscribed(newSubscriptionState);
      toast({
        title: newSubscriptionState ? "Subscribed!" : "Unsubscribed",
        description: newSubscriptionState
          ? `You are now subscribed to ${authorName}.`
          : `You have unsubscribed from ${authorName}.`,
      });
      // Optionally, trigger a refresh of the sidebar or relevant data
      // This might involve a global state management or context update
      // window.location.reload(); // Simple but heavy-handed refresh
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
      toast({
        title: "Error",
        description: "Could not update subscription status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed === null) {
    // Loading state
    return (
      <Button variant="outline" size="sm" disabled className={cn(className)}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <Button
      variant={isSubscribed ? "secondary" : "default"}
      size="sm"
      onClick={handleSubscribeToggle}
      disabled={isLoading}
      className={cn(className)}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : isSubscribed ? (
        <Check className="mr-2 h-4 w-4" />
      ) : (
        <Rss className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Updating...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  );
}
