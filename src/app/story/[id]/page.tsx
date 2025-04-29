import { getStoryById, Story } from '@/lib/placeholder-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { Eye, Heart, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { CommentsSection } from './_components/comments-section';
import { LikeButton } from './_components/like-button';
import { formatNumber } from '@/lib/utils'; // Import formatting utility


interface StoryPageProps {
  params: {
    id: string;
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getStoryById(params.id);

  if (!story) {
    notFound(); // Redirect to 404 if story doesn't exist
  }

  // Basic paragraph splitting for display
  const paragraphs = story.content.split('\n\n');

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden mb-8 shadow-lg">
        <div className="relative aspect-[16/7] w-full">
          {/* Use a wider aspect ratio for the header image */}
          <Image
            src={story.coverImageUrl.replace('/300/450', '/800/350')} // Request a wider image
            alt={`Cover art for ${story.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            className="object-cover"
            priority // Prioritize loading the main story image
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <CardHeader className="relative z-10 -mt-20 md:-mt-24 px-6 pb-6 text-background">
          <CardTitle className="text-3xl md:text-4xl font-bold mb-2 text-shadow">
            {story.title}
          </CardTitle>
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 border-2 border-background">
              {/* Placeholder for author image */}
              <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-lg">{story.author}</span>
          </div>
          <Badge variant="secondary" className="w-fit text-foreground bg-secondary/90">{story.category}</Badge>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <CardDescription className="text-base text-muted-foreground mb-6">
            {story.description}
          </CardDescription>

          {/* Stats Section */}
          <div className="flex items-center gap-6 text-muted-foreground mb-6 text-sm">
             <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{formatNumber(story.viewCount)} views</span>
             </div>
             <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                <span>{formatNumber(story.likeCount)} likes</span>
             </div>
             <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>{formatNumber(story.comments.length)} comments</span>
             </div>
          </div>


          <Separator className="my-6" />

          <article className="prose prose-lg max-w-none dark:prose-invert text-foreground/90">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </CardContent>
        <CardFooter className="p-6 bg-muted/50 border-t">
            {/* Interactive Like Button */}
           <LikeButton initialLikes={story.likeCount} storyId={story.id} />
            {/* Placeholder for Share button */}
             {/* <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Share
             </Button> */}
        </CardFooter>
      </Card>

       {/* Comments Section */}
       <CommentsSection storyId={story.id} initialComments={story.comments} />
    </div>
  );
}

// Add basic text shadow utility if needed in globals.css or here via style
// Add prose styles to globals.css or tailwind config if needed
// Ensure globals.css has readable font styles
