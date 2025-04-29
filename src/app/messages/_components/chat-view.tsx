
'use client';

import { useState } from 'react';
import type { Conversation } from '../page';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, ArrowLeft, Smile, MoreVertical, ShieldBan, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns'; // For timestamp formatting
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';


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
  { id: 'm2', sender: 'me', text: 'No problem, I really enjoyed it! 😊', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
  { id: 'm3', sender: 'them', text: 'Glad to hear that! Did you like the ending?', timestamp: new Date(Date.now() - 1000 * 60 * 9) },
  { id: 'm4', sender: 'me', text: 'Yeah, it was unexpected but fit well. 👍', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 'm5', sender: 'me', text: 'When is the next chapter coming out?', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
  { id: 'm6', sender: 'them', text: 'Working on it! Hopefully next week. 🤞', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
];

interface ChatViewProps {
  conversation: Conversation;
  // Add function to go back on mobile?
}

export function ChatView({ conversation }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(placeholderMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isBlocking, setIsBlocking] = useState(false);
  const { toast } = useToast();

  // Placeholder function to simulate blocking
  const handleBlockUser = async () => {
    setIsBlocking(true);
    console.log(`Blocking user: ${conversation.participantName} (ID: ${conversation.id})`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsBlocking(false);
    toast({
      title: "User Blocked",
      description: `${conversation.participantName} has been blocked. You will no longer receive messages from them.`,
      variant: "default",
    });
    // Potentially update UI state to reflect block (e.g., disable input)
  };

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

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  return (
    <AlertDialog>
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
          <span className="font-semibold flex-grow">{conversation.participantName}</span>
          {/* Add online status indicator later */}

          {/* Chat Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">Chat options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Block User Option */}
              <AlertDialogTrigger asChild>
                 <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                    <ShieldBan className="mr-2 h-4 w-4" />
                    Block User
                 </DropdownMenuItem>
               </AlertDialogTrigger>
               {/* Add other options like 'View Profile' later */}
            </DropdownMenuContent>
          </DropdownMenu>
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
                <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p> {/* Handle emojis and line breaks */}
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
          <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
            {/* Emoji Picker Popover */}
             <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Smile className="h-5 w-5" />
                        <span className="sr-only">Add emoji</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                   {/* Placeholder for Emoji Picker Component */}
                   <div className="flex gap-1">
                     <button onClick={() => addEmoji('😊')} className="text-xl p-1 hover:bg-accent rounded">😊</button>
                     <button onClick={() => addEmoji('👍')} className="text-xl p-1 hover:bg-accent rounded">👍</button>
                     <button onClick={() => addEmoji('😂')} className="text-xl p-1 hover:bg-accent rounded">😂</button>
                     <button onClick={() => addEmoji('❤️')} className="text-xl p-1 hover:bg-accent rounded">❤️</button>
                     <button onClick={() => addEmoji('🎉')} className="text-xl p-1 hover:bg-accent rounded">🎉</button>
                     {/* Add a proper emoji picker library here later */}
                   </div>
                   <p className="text-xs text-muted-foreground mt-2">Emoji picker coming soon!</p>
                </PopoverContent>
             </Popover>

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

        {/* Block User Confirmation Dialog */}
        <AlertDialogContent>
           <AlertDialogHeader>
               <AlertDialogTitle>Block {conversation.participantName}?</AlertDialogTitle>
               <AlertDialogDescription>
                  Are you sure you want to block this user? You won't be able to send or receive messages from them, and this action cannot be easily undone.
               </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
               <AlertDialogCancel disabled={isBlocking}>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  onClick={handleBlockUser}
                  disabled={isBlocking}
                  className={cn(isBlocking && "bg-destructive/80")}
               >
                   {isBlocking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   {isBlocking ? 'Blocking...' : 'Block User'}
               </AlertDialogAction>
           </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
}

    