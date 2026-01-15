import Link from 'next/link';
import Image from 'next/image';
import type { Story } from '@/lib/placeholder-data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, MessageSquare } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { BookmarkButton } from '@/components/bookmark-button';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/story/${story.id}`} className="block group h-full">
      <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1">
        <CardHeader className="p-0 relative aspect-[3/4] overflow-hidden">
          <Image
            src={story.coverImageUrl}
            alt={`Cover for ${story.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          <div className="absolute top-3 right-3 z-20">
            <BookmarkButton story={story} className="text-white hover:bg-white/20 hover:text-white" />
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <Badge variant="secondary" className="mb-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-0">
              {story.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow flex flex-col gap-2">
          <CardTitle className="text-xl font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {story.title}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span className="font-medium text-foreground/80">by {story.author}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {story.description}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-0 border-t border-border/30 mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(story.viewCount)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary/80">
              <Heart className="w-4 h-4 fill-primary/20" />
              <span>{formatNumber(story.likeCount)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>{formatNumber(story.comments.length)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
