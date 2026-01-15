import Link from 'next/link';
import { BookOpenText } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <BookOpenText className="h-6 w-6 text-primary" />
                            <span className="font-bold text-xl">Story Weaver</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Unleashing imagination, one story at a time. Join our community of writers and readers.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm tracking-wider uppercase">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/discover" className="hover:text-primary transition-colors">Discover</Link></li>
                            <li><Link href="/trending" className="hover:text-primary transition-colors">Trending</Link></li>
                            <li><Link href="/create" className="hover:text-primary transition-colors">Write</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm tracking-wider uppercase">Community</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/guidelines" className="hover:text-primary transition-colors">Guidelines</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm tracking-wider uppercase">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Story Weaver. All rights reserved.</p>
                    <div className="flex gap-4">
                        {/* Social icons could go here */}
                        <span>Made with ❤️ for storytellers.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
