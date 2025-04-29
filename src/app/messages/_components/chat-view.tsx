'use client';

import { useState } from 'react';
import type { Conversation } from '../page';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns'; // For timestamp formatting

// Placeholder type for messages
interface Message {
  id: string;
  sender: 'me' | 'them'; // Simple sender identification
  text: string;
  timestamp: Date;
}

// Placeholder message data - replace with actual fetching
const placeholderMessages: Message[] = [
  { id: 'm1', sender: 'them', text: 'Hey, thanks for reading my story!', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 'm2', sender: 'me', text: 'No problem, I really enjoyed it!', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
  { id: 'm3', sender: 'them', text: 'Glad to hear that! Did you like the ending?', timestamp: new Date(Date.now() - 1000 * 60 * 9) },
  { id: 'm4', sender: 'me', text: 'Yeah, it was unexpected but fit well.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 'm5', sender: 'me', text: 'When is the next chapter coming out?', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
  { id: 'm6', sender: 'them', text: 'Working on it! Hopefully next week.', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
];

interface ChatViewProps {
  conversation: Conversation;
  // Add function to go back on mobile?
}

export function ChatView({ conversation }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(placeholderMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageToSend: Message = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: newMessage,
      timestamp: new Date(),
    };

    // Simulate sending message and update UI optimistically
    console.log('Sending message:', messageToSend);
    setMessages([...messages, messageToSend]);
    setNewMessage('');

    // In a real app, you'd send the message to the backend here.
    // You might also receive messages via WebSocket or polling.
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-3 border-b border-border">
        {/* Add back button for mobile view later */}
         {/* <Button variant="ghost" size="icon" className="md:hidden mr-2">
             <ArrowLeft />
         </Button> */}
        <Avatar className="h-10 w-10">
          {conversation.participantAvatar && <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />}
          <AvatarFallback>{conversation.participantName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{conversation.participantName}</span>
        {/* Add online status indicator later */}
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2 items-end",
              msg.sender === 'me' ? 'justify-end' : 'justify-start'
            )}
          >
            {msg.sender === 'them' && (
              <Avatar className="h-7 w-7 hidden sm:flex"> {/* Smaller avatar for messages */}
                {conversation.participantAvatar && <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />}
                <AvatarFallback className="text-xs">{conversation.participantName.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-[75%] rounded-lg px-3 py-2",
                msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              <p className="text-sm">{msg.text}</p>
               <p className={cn(
                   "text-xs mt-1",
                   msg.sender === 'me' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'
                   )}>
                  {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
               </p>
            </div>
             {msg.sender === 'me' && (
                <Avatar className="h-7 w-7 hidden sm:flex">
                    {/* Placeholder for current user avatar */}
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                </Avatar>
             )}
          </div>
        ))}
        {/* Add scroll-to-bottom functionality later */}
      </ScrollArea>

      {/* Message Input */}
      <div className="p-3 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={newMessage.trim() === ''}>
            <SendHorizonal className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
