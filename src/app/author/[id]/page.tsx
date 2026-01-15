import { getStories, placeholderStories } from '@/lib/placeholder-data';
import { StoryCard } from '@/components/story-card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { BookOpen, UserPlus, Users, Link as LinkIcon, Twitter, Globe, MapPin } from 'lucide-react';

interface AuthorPageProps {
    params: {
        id: string;
    };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const authorName = decodeURIComponent(params.id);

    // Simulate fetching author data
    // In a real app, we'd fetch author details by ID
    const authorStories = placeholderStories.filter(story => story.author === authorName);

    if (authorStories.length === 0) {
        // In a real app we might redirect or show a generic profile, but here we assume if no stories, maybe not found or just empty
        // But keeping it simple: if author name exists in our "db" (stories), we show it.
        // If purely random name, maybe 404? 
        // Let's allow empty profiles if we had a list of authors independent of stories.
        // For now, if no stories found, we might assume author doesn't exist for this demo.
        // However, to be safe, let's just show the profile with 0 stories.
    }

    // Mock Author Details
    const authorDetails = {
        name: authorName,
        bio: "Passionate storyteller weaving dreams into words. Lover of coffee, rainy days, and epic adventures.",
        followers: 1205,
        following: 45,
        location: "New York, USA",
        website: "https://example.com",
        twitter: "@" + authorName.replace(' ', ''),
        avatar: authorStories[0]?.authorAvatar
    };

    return (
        <div className="container py-10 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
                {/* Author Sidebar / Info */}
                <div className="w-full md:w-1/3 flex flex-col items-center text-center p-6 rounded-2xl border bg-card/50 backdrop-blur-sm sticky top-24">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl mb-4">
                        {authorDetails.avatar && <AvatarImage src={authorDetails.avatar} alt={authorDetails.name} />}
                        <AvatarFallback className="text-4xl">{authorDetails.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold mb-2">{authorDetails.name}</h1>
                    <p className="text-muted-foreground text-sm mb-6">{authorDetails.bio}</p>

                    <div className="flex gap-4 mb-6 w-full justify-center">
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-lg">{authorDetails.followers}</span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Followers</span>
                        </div>
                        <div className="w-px h-10 bg-border" />
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-lg">{authorDetails.following}</span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Following</span>
                        </div>
                    </div>

                    <Button className="w-full mb-6 gap-2">
                        <UserPlus className="h-4 w-4" /> Follow
                    </Button>

                    <Separator className="mb-6" />

                    <div className="w-full space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> <span>{authorDetails.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" /> <a href={authorDetails.website} className="hover:text-primary transition-colors">Website</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Twitter className="h-4 w-4" /> <a href="#" className="hover:text-primary transition-colors">{authorDetails.twitter}</a>
                        </div>
                    </div>
                </div>

                {/* Author Content */}
                <div className="w-full md:w-2/3 space-y-8">
                    <div className="flex items-center gap-2 mb-6">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">Published Stories</h2>
                        <Badge variant="secondary" className="ml-2">{authorStories.length}</Badge>
                    </div>

                    {authorStories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {authorStories.map(story => (
                                <StoryCard key={story.id} story={story} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                            <p className="text-muted-foreground">No stories published yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
