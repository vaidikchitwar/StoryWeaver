'use client';

import * as React from 'react';
import { Story } from '@/lib/placeholder-data';
import { StoryCard } from '@/components/story-card';
import { Bookmark, Clock, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SavedStories() {
    const [bookmarks, setBookmarks] = React.useState<Story[]>([]);
    const [history, setHistory] = React.useState<any[]>([]);

    React.useEffect(() => {
        setBookmarks(JSON.parse(localStorage.getItem('bookmarks') || '[]'));
        setHistory(JSON.parse(localStorage.getItem('reading-history') || '[]'));
    }, []);

    return (
        <div className="mt-8">
            <Tabs defaultValue="bookmarks" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="bookmarks" className="gap-2"><Bookmark className="h-4 w-4" /> Bookmarks</TabsTrigger>
                    <TabsTrigger value="history" className="gap-2"><Clock className="h-4 w-4" /> Recently Viewed</TabsTrigger>
                </TabsList>

                <TabsContent value="bookmarks">
                    {bookmarks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {bookmarks.map((story) => (
                                <StoryCard key={story.id} story={story} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                            <p className="text-muted-foreground">No bookmarked stories yet.</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history">
                    {history.length > 0 ? (
                        <div className="space-y-4">
                            {history.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
                                    {/* Simplified card for history */}
                                    <div className="h-16 w-16 bg-muted rounded overflow-hidden relative shrink-0">
                                        {/* Image would come from item.coverImageUrl but need Next Image */}
                                        {/* <img src={item.coverImageUrl} className="w-full h-full object-cover" /> */}
                                        <div className="w-full h-full bg-primary/20" /> {/* Placeholder */}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">by {item.author}</p>
                                        <span className="text-xs text-muted-foreground">Viewed {new Date(item.viewedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                            {/* Reuse StoryCard for history if data is complete enough? */}
                            {/* The history logic saved a partial object in StoryViewer. Let's assume it saves full Story or enough props. */}
                            {/* Actually, I should update StoryViewer to save full story object to history if I want to reuse StoryCard. */}
                            {/* For now, just a list is fine. */}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                            <p className="text-muted-foreground">No recently viewed stories.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
