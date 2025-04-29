'use client'; // This page might become interactive

import { useState } from 'react';
import { ConversationList } from './_components/conversation-list';
import { ChatView } from './_components/chat-view';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

// Placeholder type, replace with real data structure
export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string; // Or Date
  unreadCount: number;
}

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  // Placeholder conversations - replace with actual data fetching
  const conversations: Conversation[] = [
    { id: '1', participantName: 'Jane Doe', participantAvatar: 'https://picsum.photos/seed/author_jane/40/40', lastMessage: 'Thanks for reading!', lastMessageTime: '10m ago', unreadCount: 0 },
    { id: '2', participantName: 'John Smith', participantAvatar: 'https://picsum.photos/seed/author_john/40/40', lastMessage: 'Did you like the ending?', lastMessageTime: '1h ago', unreadCount: 2 },
    { id: '3', participantName: 'ReaderFan', lastMessage: 'Great story!', lastMessageTime: '3d ago', unreadCount: 0 },
  ];

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-10rem)] gap-4"> {/* Adjust height as needed */}
      <Card className="w-full md:w-1/3 lg:w-1/4 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Messages</CardTitle>
           <CardDescription>Your recent conversations.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-0">
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={setSelectedConversationId}
          />
        </CardContent>
      </Card>

      <Card className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
        {selectedConversation ? (
          <ChatView conversation={selectedConversation} />
        ) : (
          <div className="flex-grow flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting.
          </div>
        )}
      </Card>
    </div>
  );
}
