import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";
import { SavedStories } from "@/components/saved-stories";

// This is a placeholder page. User authentication and data fetching are not implemented.
export default function ProfilePage() {
  // Placeholder data
  const user = {
    name: "Placeholder User",
    email: "user@example.com",
    bio: "Avid reader and aspiring writer. Loves fantasy and sci-fi.",
    avatarUrl: undefined,
    joinDate: new Date(2023, 5, 15), // Example date
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <p className="text-sm text-muted-foreground mt-1">
              Joined {user.joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <Button variant="outline" size="icon" className="ml-auto hidden sm:inline-flex" asChild>
            <Link href="/profile/edit">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Profile</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p className="text-muted-foreground mb-4">{user.bio || "No bio provided."}</p>
          <Button variant="outline" className="w-full sm:hidden" asChild>
            <Link href="/profile/edit">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Add sections for user's stories, reading lists, etc. later */}
      <Card>
        <CardHeader>
          <CardTitle>My Library</CardTitle>
          <CardDescription>Your saved collections and checks.</CardDescription>
        </CardHeader>
        <CardContent>
          <SavedStories />
        </CardContent>
      </Card>

    </div>
  );
}
