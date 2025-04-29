import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar'; // Import Sidebar components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar
import { Edit, Library, Rss, User } from 'lucide-react'; // Import icons, added Rss for subscriptions
import Link from 'next/link';
import { getUserSubscriptions, AuthorSubscription } from '@/lib/placeholder-data'; // Import subscription data fetcher
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Story Weaver',
  description: 'Read, write, and discover amazing stories.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          'h-full font-sans antialiased',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Wrap with SidebarProvider */}
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                {/* Placeholder User Profile */}
                 <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10">
                      {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                      <AvatarFallback>U</AvatarFallback> {/* Placeholder Initial */}
                    </Avatar>
                    <div className="flex flex-col">
                       <span className="font-semibold text-sm">Username</span>
                       <span className="text-xs text-muted-foreground">View Profile</span>
                    </div>
                 </div>
              </SidebarHeader>
              <SidebarContent>
                 {/* User Section */}
                 <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={false} tooltip="Your Profile">
                        <Link href="/profile">
                            <User />
                            <span>Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                       <SidebarMenuButton asChild isActive={false} tooltip="Edit Your Profile">
                         <Link href="/profile/edit"> {/* Assuming an edit page */}
                             <Edit />
                             <span>Edit Profile</span>
                         </Link>
                       </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                       <SidebarMenuButton asChild isActive={false} tooltip="Your Published Stories">
                         <Link href="/my-stories">
                             <Library />
                             <span>My Stories</span>
                         </Link>
                       </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>

                 <SidebarSeparator />

                {/* Subscriptions Section */}
                 <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-2">
                        <Rss /> Subscriptions
                    </SidebarGroupLabel>
                     <Suspense fallback={<SubscriptionListSkeleton />}>
                        <SubscriptionList />
                    </Suspense>
                 </SidebarGroup>

              </SidebarContent>
              <SidebarFooter>
                 {/* Sidebar Footer content if needed */}
              </SidebarFooter>
            </Sidebar>

            {/* Wrap main content and footer with SidebarInset */}
            <SidebarInset className="flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                  {children}
                </main>
                 <Toaster />
                <footer className="py-4 text-center text-muted-foreground text-sm mt-auto">
                   © {new Date().getFullYear()} Story Weaver. All rights reserved.
                </footer>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


// Component to fetch and display subscriptions
async function SubscriptionList() {
    const subscriptions = await getUserSubscriptions();

    if (!subscriptions || subscriptions.length === 0) {
        return <p className="px-2 text-sm text-muted-foreground">No subscriptions yet.</p>;
    }

    return (
        <SidebarMenu>
            {subscriptions.map((sub) => (
                <SidebarMenuItem key={sub.authorId}>
                    {/* Link to author's profile page (assuming /author/[authorId] route) */}
                    <SidebarMenuButton asChild tooltip={sub.authorName} size="sm">
                        {/* Placeholder link, adjust href structure as needed */}
                        <Link href={`/author/${encodeURIComponent(sub.authorId)}`}>
                            <Avatar className="h-5 w-5">
                                {sub.authorAvatar && <AvatarImage src={sub.authorAvatar} alt={sub.authorName} />}
                                <AvatarFallback className="text-xs">{sub.authorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{sub.authorName}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}

// Skeleton loader for the subscription list
function SubscriptionListSkeleton() {
    return (
        <div className="space-y-1 px-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 h-7">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            ))}
        </div>
    );
}
