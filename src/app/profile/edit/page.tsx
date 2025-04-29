'use client';

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email.' }), // Keep email, maybe make read-only or handle verification separately
  bio: z.string().max(300, { message: 'Bio cannot exceed 300 characters.' }).optional(),
  // avatarUrl: z.string().url().optional(), // Add later if implementing image upload
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Placeholder data - replace with actual user data fetching
const currentUser = {
    name: "Placeholder User",
    email: "user@example.com",
    bio: "Avid reader and aspiring writer. Loves fantasy and sci-fi.",
    avatarUrl: undefined, // "https://github.com/shadcn.png",
};

export default function EditProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser.name || '',
      email: currentUser.email || '', // Pre-fill email
      bio: currentUser.bio || '',
    },
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    console.log('Updating profile:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would send `data` to your backend API here
    // to update the user's profile.

    setIsSubmitting(false);

    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });

    router.push('/profile'); // Redirect back to profile view
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
         <CardHeader>
            <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
            <CardDescription>Update your profile information below.</CardDescription>
         </CardHeader>
         <CardContent>
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Avatar Section - Placeholder for upload */}
              <div className="flex items-center gap-4 mb-6">
                 <Avatar className="h-20 w-20">
                   {currentUser.avatarUrl && <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />}
                   <AvatarFallback className="text-3xl">{currentUser.name?.charAt(0) || 'U'}</AvatarFallback>
                 </Avatar>
                 <Button type="button" variant="outline" disabled>Change Avatar (Soon)</Button>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your display name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      {/* Usually email is not directly editable or requires verification */}
                      <Input placeholder="your.email@example.com" {...field} readOnly disabled />
                    </FormControl>
                     <p className="text-sm text-muted-foreground">Email cannot be changed here.</p>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little about yourself..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="flex justify-end gap-2">
                   <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                        Cancel
                   </Button>
                   <Button type="submit" disabled={isSubmitting}>
                     {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                     {isSubmitting ? 'Saving...' : 'Save Changes'}
                   </Button>
              </div>

            </form>
          </Form>
         </CardContent>
      </Card>
    </div>
  );
}
