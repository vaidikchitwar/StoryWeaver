'use client';

import * as React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

type Notification = {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'system';
    message: string;
    isRead: boolean;
    createdAt: Date;
};

const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'like',
        message: 'Alice liked your story "The Last Dragon".',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    },
    {
        id: '2',
        type: 'comment',
        message: 'Bob commented on "Echoes of Mars": "Amazing twist!"',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
        id: '3',
        type: 'follow',
        message: 'Charlie started following you.',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
        id: '4',
        type: 'system',
        message: 'Welcome to Story Weaver! Start writing your first story.',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    },
];

export function NotificationsDropdown() {
    const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" className="h-auto text-xs font-normal" onClick={markAllAsRead}>
                            Mark all as read
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px]">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={`flex flex-col items-start gap-1 p-3 cursor-pointer ${!notification.isRead ? 'bg-muted/50' : ''}`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex justify-between w-full">
                                    <span className="font-sm leading-snug">{notification.message}</span>
                                    {!notification.isRead && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />}
                                </div>
                                <span className="text-xs text-muted-foreground">{formatDistanceToNow(notification.createdAt, { addSuffix: true })}</span>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No notifications.
                        </div>
                    )}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
