"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Lock, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { useAuthStatus } from '@/hooks/use-auth-status';

const topBarLeftLinks = [
  { name: 'Personal', href: '/' },
  { name: 'Small Business', href: '/small-business' },
  { name: 'Wealth Management', href: '/wealth-management' },
  { name: 'Businesses & Institutions', href: '/businesses-and-institutions' },
];

const topBarRightLinks = [
    { name: 'Security', href: '/security' },
    { name: 'About Us', href: '/about' },
    { name: 'En español', href: '#' },
    { name: 'Contact us', href: '/help' },
    { name: 'Help', href: '/help' },
];

const businessMainNavLinks = [
    { name: 'Checking & Savings', href: '/small-business' },
    { name: 'Credit Cards', href: '/small-business' },
    { name: 'Loans & Lines of Credit', href: '/small-business' },
    { name: 'Merchant Services', href: '/small-business' },
    { name: 'Business Services', href: '/small-business' },
    { name: 'Industries', href: '/small-business' },
];

const wealthMainNavLinks = [
    { name: 'Investing', href: '/wealth-management' },
    { name: 'Retirement', href: '/wealth-management' },
    { name: 'Planning', href: '/wealth-management' },
    { name: 'Private Bank', href: '/wealth-management' },
];

const institutionsMainNavLinks = [
    { name: 'Who we serve', href: '/businesses-and-institutions' },
    { name: 'Solutions', href: '/businesses-and-institutions' },
    { name: 'Research & insights', href: '/businesses-and-institutions' },
    { name: 'Global presence', href: '/businesses-and-institutions' },
];


const Logo = () => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Link href="/" className="flex items-center gap-2" aria-label="Bank of America Home">
            {isMounted && <span className="font-headline text-2xl font-bold text-primary inline-block tracking-wider">BANK OF AMERICA</span>}
            <Image
                src="https://i.pinimg.com/736x/2f/9b/19/2f9b195ba9069a509b41552b763f8c8c.jpg"
                alt="Bank of America Logo"
                width={102}
                height={40}
                className="h-10 w-auto"
            />
        </Link>
    );
};

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const { isAuthenticated } = useAuthStatus();

    const isBusinessPage = pathname.startsWith('/small-business');
    const isWealthPage = pathname.startsWith('/wealth-management');
    const isInstitutionsPage = pathname.startsWith('/businesses-and-institutions');
    
    const getActiveTopBar = () => {
        if (isBusinessPage) return 'Small Business';
        if (isWealthPage) return 'Wealth Management';
        if (isInstitutionsPage) return 'Businesses & Institutions';
        return 'Personal';
    }
    
    const getMainNavLinks = () => {
        const protectedLink = (path: string) => isAuthenticated ? path : '/';

        const personalMainNavLinks = [
          { name: 'Checking', href: '/' },
          { name: 'Savings & CDs', href: '/' },
          { name: 'Credit Cards', href: '/' },
          { name: 'Home Loans', href: protectedLink('/') },
          { name: 'Auto Loans', href: protectedLink('/') },
          { name: 'Investing', href: '/wealth-management' },
          { name: 'Better Money Habits®', href: '/help' },
        ];

        if (isBusinessPage) return businessMainNavLinks;
        if (isWealthPage) return wealthMainNavLinks;
        if (isInstitutionsPage) return institutionsMainNavLinks;
        return personalMainNavLinks;
    }

    const mainNavLinks = getMainNavLinks();
    const activeTopBar = getActiveTopBar();

    return (
        <header className="bg-card border-b sticky top-0 z-50 no-print">
             <div className="hidden md:block bg-muted/20 border-b">
                <div className="container mx-auto px-4 flex justify-between items-center text-xs h-8">
                    <div className="flex items-center gap-x-6">
                        {topBarLeftLinks.map(link => (
                            <Link key={link.name} href={link.href} className={cn(
                                "font-medium hover:text-primary transition-colors",
                                activeTopBar === link.name ? "text-primary underline underline-offset-4" : "text-muted-foreground"
                            )}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-x-6">
                         {topBarRightLinks.map(link => (
                            <Link key={link.name} href={link.href} className={cn("font-medium text-muted-foreground hover:text-primary transition-colors", { 'text-primary underline underline-offset-4': link.href !== '#' && pathname.startsWith(link.href) })}>
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
                                pathname === link.href ? "text-primary underline underline-offset-4" : "text-foreground"
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
                        <div className="lg:hidden">
                            <Sheet open={open} onOpenChange={setOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" aria-label="Open menu">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle className="sr-only">Menu</SheetTitle>
                                        <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col space-y-6 mt-8">
                                    <div className="px-4">
                                        <Logo />
                                    </div>
                                     {mainNavLinks.map(link => (
                                        <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className={cn(
                                            "font-headline text-2xl px-4 py-2 rounded-md font-medium hover:bg-muted hover:text-primary transition-colors",
                                            pathname === link.href ? "bg-muted text-primary underline underline-offset-4" : "text-foreground"
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
