import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const footerLinks = [
  {
    title: 'Support',
    links: [
      { name: 'Contact Us', href: '/help' },
      { name: 'FAQs', href: '/help#faq' },
      { name: 'Find a Location', href: '#' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { name: 'Our Company', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Room', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy & Security', href: '/security' },
      { name: 'Terms of Use', href: '#' },
      { name: 'Accessibility', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-headline text-lg font-semibold">Stay Connected</h3>
            <p className="text-sm text-primary-foreground/80 mt-2 mb-4">Sign up for our newsletter.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Email address" className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/30 focus-visible:ring-primary-foreground" />
              <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">Sign Up</Button>
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-headline text-lg font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Legacy National Corporation. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Member FDIC</span>
            <span>Equal Housing Lender</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
