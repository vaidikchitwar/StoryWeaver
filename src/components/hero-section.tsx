import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 dark:opacity-30" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/40 rounded-full blur-[100px] opacity-40 dark:opacity-20" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center animate-fade-in">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground backdrop-blur-md bg-background/50 mb-6 shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    <span className="font-medium">Discover the Next Big Story</span>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 drop-shadow-sm">
                    Where Imaginations <br className="hidden sm:block" />
                    <span className="text-primary italic relative">
                        Come Alive
                        <Sparkles className="absolute -top-6 -right-8 w-8 h-8 text-yellow-400 animate-bounce hidden md:block" />
                    </span>
                </h1>

                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl mb-10 leading-relaxed">
                    StoryWeaver is the ultimate platform for writers and readers.
                    Share your voice, explore infinite worlds, and connect with a community that loves storytelling as much as you do.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <Button asChild size="lg" className="rounded-full h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                        <Link href="/discover">
                            Start Reading <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 text-base backdrop-blur-sm bg-background/50 border-primary/20 hover:bg-primary/5 transition-colors">
                        <Link href="/create">
                            Write a Story
                        </Link>
                    </Button>
                </div>

                {/* Abstract Decorative Elements */}
                {/* <div className="absolute top-1/2 -left-24 w-48 h-48 bg-accent/30 rounded-full filter blur-3xl opacity-60 animate-pulse delay-1000 -z-10"></div>
        <div className="absolute top-1/3 -right-24 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-60 animate-pulse delay-700 -z-10"></div> */}
            </div>
        </section>
    );
}
