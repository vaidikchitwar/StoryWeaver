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
    mode: "onChange",
  });

  async function onSubmit(data: StoryFormValues) {
    setIsSubmitting(true);
    console.log('Submitting story:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);

    toast({
      title: "Story Published!",
      description: `"${data.title}" has been successfully published.`,
      variant: "default",
    });

    router.push('/discover');
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="border-border/60 bg-card/60 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-4 pb-8 border-b border-border/40 bg-muted/20">
          <div>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Create Your Story
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Share your imagination with the world. Fill in the details efficiently to publish your masterpiece.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="text-base font-medium">Title</FormLabel>
                      <FormControl>
                        <Input placeholder="The Chronicles of..." {...field} className="h-12 bg-background/50 border-input/60 focus:bg-background focus:ring-primary/20 transition-all font-medium text-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="text-base font-medium">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 bg-background/50 border-input/60 focus:ring-primary/20 transition-all">
                            <SelectValue placeholder="Select a genre" />
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
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Synopsis</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief summary that hooks the reader..."
                        className="resize-y min-h-[100px] bg-background/50 border-input/60 focus:bg-background focus:ring-primary/20 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex justify-between items-center">
                      <span>Story Content</span>
                      <span className="text-xs text-muted-foreground font-normal">Markdown supported</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Once upon a time..."
                        className="resize-y min-h-[400px] font-serif text-lg leading-relaxed bg-background/50 border-input/60 focus:bg-background focus:ring-primary/20 transition-all p-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSubmitting} size="lg" className="min-w-[150px] text-base font-medium shadow-lg shadow-primary/20">
                  {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {isSubmitting ? 'Publishing...' : 'Publish Story'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
