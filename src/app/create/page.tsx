'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categories } from '@/lib/placeholder-data'; // Reuse categories
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


const storyFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }).max(500),
  category: z.string({ required_error: 'Please select a category.' }),
  content: z.string().min(50, { message: 'Story content must be at least 50 characters.' }),
  // coverImageUrl: z.string().url().optional(), // Optional for now
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

export default function CreateStoryPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: undefined,
      content: '',
    },
    mode: "onChange", // Validate on change for better UX
  });

  async function onSubmit(data: StoryFormValues) {
    setIsSubmitting(true);
    console.log('Submitting story:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would send `data` to your backend API here
    // to save the story.

    setIsSubmitting(false);

    toast({
      title: "Story Published!",
      description: `"${data.title}" has been successfully published.`,
      variant: "default", // Or use a success variant if defined
    });

    // Redirect to the discovery page or the newly created story page
    // For now, redirecting to discover
    router.push('/discover');
    // Example redirect to a story page (if ID is returned from backend):
    // router.push(`/story/${newStoryId}`);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
         <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Your Story</CardTitle>
            <CardDescription>Fill in the details below to publish your masterpiece.</CardDescription>
         </CardHeader>
         <CardContent>
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your captivating story title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a story category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description / Synopsis</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your story to entice readers..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               {/* Add Cover Image Upload later */}
               {/* <FormItem>
                   <FormLabel>Cover Image (Optional)</FormLabel>
                   <FormControl>
                     <Input type="file" accept="image/*" />
                   </FormControl>
                   <FormMessage />
               </FormItem> */}

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Story Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Start writing your story here... You can use simple formatting like line breaks."
                        className="resize-y min-h-[300px] font-serif text-lg" // Use serif for writing area
                        {...field}
                      />
                    </FormControl>
                     <p className="text-sm text-muted-foreground">
                        Write your story content. Use double line breaks for paragraphs. Basic formatting is supported.
                     </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 {isSubmitting ? 'Publishing...' : 'Publish Story'}
              </Button>
            </form>
          </Form>
         </CardContent>
      </Card>
    </div>
  );
}
