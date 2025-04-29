'use client';

import type { Conversation } from '../page';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return <p className="p-4 text-center text-muted-foreground">No conversations yet.</p>;
  }

  return (
    <div className="divide-y divide-border">
      {conversations.map((convo) => (
        <button
          key={convo.id}
          onClick={() => onSelectConversation(convo.id)}
          className={cn(
            "w-full flex items-center gap-3 p-3 text-left hover:bg-accent transition-colors",
            selectedConversationId === convo.id && "bg-accent"
          )}
        >
          <Avatar className="h-10 w-10">
            {convo.participantAvatar && <AvatarImage src={convo.participantAvatar} alt={convo.participantName} />}
            <AvatarFallback>{convo.participantName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center mb-0.5">
              <span className="font-semibold truncate">{convo.participantName}</span>
              <span className="text-xs text-muted-foreground">{convo.lastMessageTime}</span>
            </div>
            <div className="flex justify-between items-center">
               <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                {convo.unreadCount > 0 && (
                    <Badge variant="default" className="h-5 px-1.5 text-xs">
                    {convo.unreadCount}
                    </Badge>
                )}
            </div>

          </div>
        </button>
      ))}
    </div>
  );
}
