import Link from 'next/link';
import Image from 'next/image';
import type { Story } from '@/lib/placeholder-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, MessageSquare } from 'lucide-react'; // Import icons
import { formatNumber } from '@/lib/utils'; // Import number formatter

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/story/${story.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-shadow duration-200 group-hover:shadow-md">
        <CardHeader className="p-0 relative aspect-[2/3] w-full">
           <Image
            src={story.coverImageUrl}
            alt={`Cover for ${story.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false} // Avoid making all cards priority
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold mb-1 leading-tight group-hover:text-primary transition-colors">
            {story.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-1 mb-2">
            by {story.author}
          </CardDescription>
           <p className="text-sm text-foreground/80 line-clamp-3 mb-3">
             {story.description}
           </p>
           {/* Stats Row */}
           <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{formatNumber(story.viewCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{formatNumber(story.likeCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{formatNumber(story.comments.length)}</span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-2"> {/* Adjusted padding */}
          <Badge variant="secondary">{story.category}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
