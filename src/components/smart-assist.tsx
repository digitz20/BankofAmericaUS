"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Bot, User, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { smartAssistAnswers } from '@/ai/flows/smart-assist-answers';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export function SmartAssist() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await smartAssistAnswers({ question: input });
            const assistantMessage: Message = { role: 'assistant', content: response.answer };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("SmartAssist Error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not get a response. Please try again.",
            });
            setMessages(prev => prev.slice(0, prev.length - 1));
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollEl = scrollAreaRef.current.querySelector('div');
            if (scrollEl) {
                scrollEl.scrollTo({
                    top: scrollEl.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [messages]);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-accent hover:bg-accent/90 no-print"
                aria-label="Open SmartAssist Chat"
            >
                <MessageSquare size={32} />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="flex flex-col no-print">
                    <SheetHeader>
                        <SheetTitle className="font-headline text-2xl">SmartAssist</SheetTitle>
                        <SheetDescription>
                            Your AI-powered virtual assistant for all your banking questions.
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="flex-grow my-4 -mx-6 px-6" ref={scrollAreaRef}>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted p-4 rounded-lg rounded-tl-none max-w-sm">
                                    <p className="text-sm">Hello! How can I help you today?</p>
                                </div>
                            </div>
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    {message.role === 'assistant' && (
                                         <Avatar>
                                            <AvatarFallback><Bot /></AvatarFallback>
                                        </Avatar>
                                    )}
                                     <div className={cn("p-4 rounded-lg max-w-sm text-sm", message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-tl-none')}>
                                        <p>{message.content}</p>
                                     </div>
                                     {message.role === 'user' && (
                                         <Avatar>
                                            <AvatarFallback><User /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-4">
                                     <Avatar>
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted p-4 rounded-lg rounded-tl-none">
                                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <SheetFooter>
                        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                disabled={isLoading}
                                className="flex-grow"
                            />
                            <Button type="submit" disabled={isLoading || !input.trim()}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
}
