'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Comment } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommentsSectionProps {
  storyId: string;
  initialComments: Comment[];
}

const commentFormSchema = z.object({
  comment: z.string().min(3, { message: 'Comment must be at least 3 characters.' }).max(500, { message: 'Comment cannot exceed 500 characters.' }),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

export function CommentsSection({ storyId, initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: CommentFormValues) {
    setIsSubmitting(true);
    console.log('Submitting comment:', data.comment, 'for story:', storyId);

    // Simulate API call to post comment
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random()}`, // Temporary unique ID
      author: 'CurrentUser', // Replace with actual logged-in user
      avatarUrl: undefined, // Add avatar if user has one
      timestamp: new Date(),
      text: data.comment,
    };

    // Update comments state optimistically (add to the top)
    setComments([newComment, ...comments]);

    setIsSubmitting(false);
    form.reset(); // Clear the form

    toast({
      title: 'Comment Added',
      description: 'Your comment has been posted successfully.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
           <MessageSquare className="w-5 h-5" /> Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Add a comment</FormLabel> {/* Screen reader label */}
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts..."
                      className="resize-y min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>
        </Form>

        {/* Separator */}
        {comments.length > 0 && <hr className="border-border" />}

        {/* Display Comments */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                   {comment.avatarUrl && <AvatarImage src={comment.avatarUrl} alt={comment.author} />}
                  <AvatarFallback>{comment.author.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <span className="font-semibold">{comment.author}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">
                      {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-foreground/90">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Be the first to leave a comment!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
