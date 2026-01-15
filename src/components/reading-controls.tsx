'use client';

import * as React from 'react';
import { Minus, Plus, Maximize, Minimize, Moon, Sun, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ReadingControlsProps {
    fontSize: number;
    setFontSize: (size: number) => void;
    isReadingMode: boolean;
    setReadingMode: (mode: boolean) => void;
    className?: string;
}

export function ReadingControls({
    fontSize,
    setFontSize,
    isReadingMode,
    setReadingMode,
    className,
}: ReadingControlsProps) {
    const { theme, setTheme } = useTheme();

    return (
        <div className={cn("flex items-center gap-2 p-2 rounded-full bg-background/80 backdrop-blur border shadow-sm", className)}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                            disabled={fontSize <= 14}
                            className="h-8 w-8"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Decrease Font Size</TooltipContent>
                </Tooltip>

                <span className="text-sm font-medium w-8 text-center">{fontSize}px</span>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                            disabled={fontSize >= 24}
                            className="h-8 w-8"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Increase Font Size</TooltipContent>
                </Tooltip>

                <div className="w-px h-4 bg-border mx-1" />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="h-8 w-8"
                        >
                            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle Theme</TooltipContent>
                </Tooltip>

                <div className="w-px h-4 bg-border mx-1" />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={isReadingMode ? "secondary" : "ghost"}
                            size="icon"
                            onClick={() => setReadingMode(!isReadingMode)}
                            className="h-8 w-8"
                        >
                            {isReadingMode ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isReadingMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
