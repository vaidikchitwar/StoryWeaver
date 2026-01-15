'use client';

import * as React from 'react';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function ReportModal() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { toast } = useToast();
    const [reason, setReason] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setIsOpen(false);
        toast({
            title: "Report Submitted",
            description: "Thank you for helping keep our community safe.",
        });
        setReason('');
        setDetails('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive gap-2 h-auto p-0 hover:bg-transparent">
                    <Flag className="h-4 w-4" />
                    <span className="text-xs underline-offset-4 hover:underline">Report Content</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Report Story</DialogTitle>
                    <DialogDescription>
                        Help us understand what's wrong with this story.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Select onValueChange={setReason} value={reason}>
                            <SelectTrigger id="reason">
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="spam">Spam or misleading</SelectItem>
                                <SelectItem value="harrassment">Harrassment or bullying</SelectItem>
                                <SelectItem value="hate_speech">Hate speech</SelectItem>
                                <SelectItem value="nudity">Nudity or sexual activity</SelectItem>
                                <SelectItem value="violence">Violence or dangerous organizations</SelectItem>
                                <SelectItem value="copyright">Copyright infringement</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="details">Additional Details</Label>
                        <Textarea
                            id="details"
                            placeholder="Please provide more information..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => setIsOpen(false)} disabled={isSubmitting}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit} disabled={isSubmitting || !reason} variant="destructive">
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
