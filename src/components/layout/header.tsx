"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Lock, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const topBarLeftLinks = [
  { name: 'Personal', href: '/' },
  { name: 'Small Business', href: '/small-business' },
  { name: 'Wealth Management', href: '/wealth-management' },
  { name: 'Businesses & Institutions', href: '/businesses-and-institutions' },
];

const topBarRightLinks = [
    { name: 'Security', href: '/security' },
    { name: 'About Us', href: '#' },
    { name: 'En español', href: '#' },
    { name: 'Contact us', href: '/help' },
    { name: 'Help', href: '/help' },
];

const personalMainNavLinks = [
  { name: 'Checking', href: '/accounts' },
  { name: 'Savings & CDs', href: '/accounts' },
  { name: 'Credit Cards', href: '/accounts' },
  { name: 'Home Loans', href: '#' },
  { name: 'Auto Loans', href: '#' },
  { name: 'Investing', href: '#' },
  { name: 'Better Money Habits®', href: '#' },
];

const businessMainNavLinks = [
    { name: 'Checking & Savings', href: '#' },
    { name: 'Credit Cards', href: '#' },
    { name: 'Loans & Lines of Credit', href: '#' },
    { name: 'Merchant Services', href: '#' },
    { name: 'Business Services', href: '#' },
    { name: 'Industries', href: '#' },
];

const wealthMainNavLinks = [
    { name: 'Investing', href: '#' },
    { name: 'Retirement', href: '#' },
    { name: 'Planning', href: '#' },
    { name: 'Private Bank', href: '#' },
];

const institutionsMainNavLinks = [
    { name: 'Who we serve', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'Research & insights', href: '#' },
    { name: 'Global presence', href: '#' },
];


const Logo = () => (
    <Link href="/" className="flex items-center gap-2" aria-label="Legacy National Home">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-10 w-10 text-primary">
            <rect width="100" height="100" rx="20" fill="currentColor"/>
            <path d="M 30 70 L 30 30 L 50 30 C 65 30 65 45 50 45 L 30 45" stroke="#F5F5F5" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 50 45 L 70 70" stroke="#F5F5F5" strokeWidth="10" fill="none" strokeLinecap="round"/>
        </svg>
        <span className="font-headline text-2xl font-bold text-primary hidden sm:inline-block">Legacy National</span>
    </Link>
);

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    const isBusinessPage = pathname.startsWith('/small-business');
    const isWealthPage = pathname.startsWith('/wealth-management');
    const isInstitutionsPage = pathname.startsWith('/businesses-and-institutions');
    
    const getMainNavLinks = () => {
        if (isBusinessPage) return businessMainNavLinks;
        if (isWealthPage) return wealthMainNavLinks;
        if (isInstitutionsPage) return institutionsMainNavLinks;
        return personalMainNavLinks;
    }
    
    const getActiveTopBar = () => {
        if (isBusinessPage) return 'Small Business';
        if (isWealthPage) return 'Wealth Management';
        if (isInstitutionsPage) return 'Businesses & Institutions';
        return 'Personal';
    }

    const mainNavLinks = getMainNavLinks();
    const activeTopBar = getActiveTopBar();

    return (
        <header className="bg-card border-b sticky top-0 z-50">
             <div className="hidden md:block bg-muted/20 border-b">
                <div className="container mx-auto px-4 flex justify-between items-center text-xs h-8">
                    <div className="flex items-center gap-x-6">
                        {topBarLeftLinks.map(link => (
                            <Link key={link.name} href={link.href} className={cn(
                                "font-medium hover:text-primary transition-colors",
                                activeTopBar === link.name ? "text-primary" : "text-muted-foreground"
                            )}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-x-6">
                         {topBarRightLinks.map(link => (
                            <Link key={link.name} href={link.href} className={cn("font-medium text-muted-foreground hover:text-primary transition-colors", { 'text-primary': pathname === link.href })}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <Logo />
                    <nav className="hidden lg:flex items-center gap-x-6">
                        {mainNavLinks.map(link => (
                            <Link key={link.name} href={link.href} className={cn(
                                "font-headline text-base font-medium hover:text-primary transition-colors",
                                pathname === link.href ? "text-primary" : "text-foreground"
                            )}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <div className="relative hidden md:block">
                            <Input placeholder="Search" className="h-10 pr-10 w-32" />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                        <Button>
                            <Lock className="mr-2 h-4 w-4" />
                            Log In
                        </Button>
                        <div className="lg:hidden">
                            <Sheet open={open} onOpenChange={setOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" aria-label="Open menu">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <div className="flex flex-col space-y-6 mt-8">
                                    <div className="px-4">
                                        <Logo />
                                    </div>
                                     {mainNavLinks.map(link => (
                                        <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className={cn(
                                            "font-headline text-2xl px-4 py-2 rounded-md font-medium hover:bg-muted hover:text-primary transition-colors",
                                            pathname === link.href ? "bg-muted text-primary" : "text-foreground"
                                        )}>
                                            {link.name}
                                        </Link>
                                    ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
