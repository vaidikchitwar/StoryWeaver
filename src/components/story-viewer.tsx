'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { Eye, Heart, MessageSquare, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { CommentsSection } from '@/app/story/[id]/_components/comments-section';
import { LikeButton } from '@/app/story/[id]/_components/like-button';
import { SubscribeButton } from '@/app/story/[id]/_components/subscribe-button';
import { ShareButton } from '@/app/story/[id]/_components/share-button';
import { formatNumber } from '@/lib/utils';
import { ReadingControls } from '@/components/reading-controls';
import { Story } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReportModal } from '@/components/report-modal';
import { BookmarkButton } from '@/components/bookmark-button';

interface StoryViewerProps {
    story: Story;
}

export function StoryViewer({ story }: StoryViewerProps) {
    const [fontSize, setFontSize] = React.useState(18); // Default font size
    const [isReadingMode, setIsReadingMode] = React.useState(false);

    // Reading History Effect
    React.useEffect(() => {
        const history = JSON.parse(localStorage.getItem('reading-history') || '[]');
        const newEntry = {
            id: story.id,
            title: story.title,
            coverImageUrl: story.coverImageUrl,
            author: story.author,
            viewedAt: new Date().toISOString(),
        };

        // Remove if exists to push to top
        const filteredHistory = history.filter((item: any) => item.id !== story.id);
        const updatedHistory = [newEntry, ...filteredHistory].slice(0, 10); // Keep last 10

        localStorage.setItem('reading-history', JSON.stringify(updatedHistory));
    }, [story]);

    // Estimated Reading Time
    const wordCount = story.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const paragraphs = story.content.split('\n\n');

    if (isReadingMode) {
        return (
            <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in overflow-y-auto">
                <div className="max-w-3xl mx-auto min-h-screen p-8 md:p-16 flex flex-col">
                    <div className="sticky top-4 z-50 flex justify-end mb-8">
                        <ReadingControls
                            fontSize={fontSize}
                            setFontSize={setFontSize}
                            isReadingMode={isReadingMode}
                            setReadingMode={setIsReadingMode}
                        />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">{story.title}</h1>
                    <p className="text-center text-muted-foreground mb-12 italic">by {story.author}</p>

                    <article
                        className="prose prose-lg max-w-none dark:prose-invert"
                        style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                    >
                        {paragraphs.map((paragraph, index) => (
                            <p key={index} className="mb-6">{paragraph}</p>
                        ))}
                    </article>

                    <div className="mt-20 text-center">
                        <p className="text-muted-foreground text-sm">End of Story</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto relative">
            {/* Floating Controls for standard view */}
            <div className="sticky top-20 z-40 flex justify-end mb-4 pointer-events-none">
                <div className="pointer-events-auto">
                    <ReadingControls
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        isReadingMode={isReadingMode}
                        setReadingMode={setIsReadingMode}
                    />
                </div>
            </div>

            <Card className="overflow-hidden mb-8 shadow-lg">
                <div className="relative aspect-[16/7] w-full">
                    <Image
                        src={story.coverImageUrl.replace('/300/450', '/800/350')}
                        alt={`Cover art for ${story.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
                <CardHeader className="relative z-10 -mt-20 md:-mt-24 px-6 pb-6 text-background">
                    <CardTitle className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">
                        {story.title}
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <Link href={`/author/${encodeURIComponent(story.author)}`} className="flex items-center gap-3 group w-fit">
                            <Avatar className="h-10 w-10 border-2 border-background group-hover:ring-2 group-hover:ring-primary transition-all">
                                {story.authorAvatar && <AvatarImage src={story.authorAvatar} alt={story.author} />}
                                <AvatarFallback className="text-black">{story.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-lg drop-shadow-md group-hover:text-primary transition-colors">{story.author}</span>
                        </Link>
                        <SubscribeButton
                            authorId={story.author}
                            authorName={story.author}
                            authorAvatar={story.authorAvatar}
                            className="sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto"
                        />
                        <div className="ml-auto sm:ml-2">
                            <BookmarkButton story={story} />
                        </div>
                    </div>
                    <Badge variant="secondary" className="w-fit text-foreground bg-secondary/90 backdrop-blur-md border-0">{story.category}</Badge>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                    <CardDescription className="text-base text-muted-foreground mb-6">
                        {story.description}
                    </CardDescription>

                    <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-muted-foreground mb-6 text-sm">
                        <div className="flex items-center gap-1.5" title="Views">
                            <Eye className="w-4 h-4" />
                            <span>{formatNumber(story.viewCount)}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Reading Time">
                            <Clock className="w-4 h-4" />
                            <span>{readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Heart className="w-4 h-4" />
                            <span>{formatNumber(story.likeCount)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MessageSquare className="w-4 h-4" />
                            <span>{formatNumber(story.comments.length)}</span>
                        </div>
                        <span className="text-xs ml-auto hidden md:inline">
                            Published {formatDistanceToNow(new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30), { addSuffix: true })}
                        </span>
                    </div>

                    <Separator className="my-6" />

                    <article
                        className="prose prose-lg max-w-none dark:prose-invert text-foreground/90 transition-[font-size]"
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        {paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </article>
                </CardContent>
                <CardFooter className="p-6 bg-muted/50 border-t flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <LikeButton initialLikes={story.likeCount} storyId={story.id} />
                        <ShareButton storyTitle={story.title} storyDescription={story.description} />
                    </div>

                    <span className="text-xs text-muted-foreground md:hidden">
                        Published {formatDistanceToNow(new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30), { addSuffix: true })}
                    </span>
                </CardFooter>
                <div className="bg-muted/30 p-2 flex justify-end px-6 border-t border-border/10">
                    <ReportModal />
                </div>
            </Card>

            <CommentsSection storyId={story.id} initialComments={story.comments} />
        </div>
    );
}
