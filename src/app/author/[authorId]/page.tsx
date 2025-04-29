import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StoryCard } from "@/components/story-card";
import { getStories, placeholderStories, AuthorSubscription } from "@/lib/placeholder-data"; // Assuming Author type exists or derive from Story
import { notFound } from 'next/navigation';
import { SubscribeButton } from "@/app/story/[id]/_components/subscribe-button"; // Reuse subscribe button
import { Rss } from "lucide-react";


interface AuthorPageProps {
  params: {
    authorId: string; // Expecting URL-encoded author name/ID
  };
}

// Function to simulate getting author details (could be combined with getStories later)
const getAuthorDetails = async (authorId: string): Promise<AuthorSubscription | null> => {
    await new Promise(resolve => setTimeout(resolve, 150)); // Simulate delay
    // Find the first story by this author to get details
    const story = placeholderStories.find(s => s.author === authorId);
    if (story) {
        return {
            authorId: story.author,
            authorName: story.author,
            authorAvatar: story.authorAvatar,
        };
    }
    // Could also check subscriptions list if needed
    return null;
}


export default async function AuthorPage({ params }: AuthorPageProps) {
  const authorId = decodeURIComponent(params.authorId); // Decode the author ID/name
  const authorDetails = await getAuthorDetails(authorId);
  const authorStories = await getStories(undefined, undefined).then(stories =>
    stories.filter(story => story.author === authorId)
  );

  if (!authorDetails) {
    notFound(); // Or show a generic author not found message
  }

  // Placeholder - Calculate total views/likes across stories
  const totalViews = authorStories.reduce((sum, story) => sum + story.viewCount, 0);
  const totalLikes = authorStories.reduce((sum, story) => sum + story.likeCount, 0);

  return (
    <div className="space-y-8">
      {/* Author Header */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
           <Avatar className="h-24 w-24">
             {authorDetails.authorAvatar && <AvatarImage src={authorDetails.authorAvatar} alt={authorDetails.authorName} />}
             <AvatarFallback className="text-4xl">{authorDetails.authorName.charAt(0)}</AvatarFallback>
           </Avatar>
           <div className="flex-1 text-center sm:text-left">
              <CardTitle className="text-3xl">{authorDetails.authorName}</CardTitle>
              {/* Placeholder bio - fetch from a dedicated author profile later */}
              <CardDescription className="mt-1">Author on Story Weaver.</CardDescription>
              {/* Placeholder Stats */}
              <div className="flex gap-4 justify-center sm:justify-start mt-2 text-sm text-muted-foreground">
                  <span>{authorStories.length} Stories</span>
                  <span>•</span>
                  <span>{totalViews.toLocaleString()} Views</span>
                  <span>•</span>
                  <span>{totalLikes.toLocaleString()} Likes</span>
              </div>
           </div>
            {/* Subscribe Button */}
            <SubscribeButton
               authorId={authorDetails.authorId}
               authorName={authorDetails.authorName}
               authorAvatar={authorDetails.authorAvatar}
               className="w-full mt-4 sm:mt-0 sm:w-auto sm:ml-auto"
            />
        </CardHeader>
        {/* Optional: Add Author Bio in CardContent if available */}
         {/* <CardContent>
           <p className="text-muted-foreground">Author bio goes here...</p>
         </CardContent> */}
      </Card>

      {/* Author's Stories Section */}
      <section>
          <h2 className="text-2xl font-semibold mb-4">Stories by {authorDetails.authorName}</h2>
           {authorStories.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {authorStories.map((story) => (
                 <StoryCard key={story.id} story={story} />
               ))}
             </div>
           ) : (
             <p className="text-center text-muted-foreground py-10">
               {authorDetails.authorName} hasn't published any stories yet.
             </p>
           )}
      </section>

    </div>
  );
}
