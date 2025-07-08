
import React from 'react';
import Link from 'next/link';

const footerLinks = [
  { name: 'Locations', href: '#' },
  { name: 'Contact Us', href: '/help' },
  { name: 'Help & Support', href: '/help' },
  { name: 'Browse with Specialist', href: '#' },
  { name: 'Accessible Banking', href: '#' },
  { name: 'Privacy', href: '/security' },
  { name: 'Children’s Privacy', href: '#' },
  { name: 'Security', href: '/security' },
  { name: 'Online Banking Service Agreement', href: '#' },
  { name: 'Advertising Practices', href: '#' },
  { name: 'Your Privacy Choices', href: '#' },
  { name: 'Site Map', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Share Your Feedback', href: '#' },
  { name: 'View Full Online Banking Site', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground no-print">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {footerLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-xs font-medium text-primary-foreground/80 hover:text-primary-foreground hover:underline">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-xs text-primary-foreground/60 space-y-3">
          <h3 className="font-headline text-lg font-semibold mb-4">Connect with us</h3>
          {/* Social media links can be added here */}
          <p>
            Bank of America, N.A. Member FDIC. <Link href="#" className="underline">Equal Housing Lender</Link>
          </p>
          <p>
            &copy; {new Date().getFullYear()} Bank of America Corporation. All rights reserved.
          </p>
           <p>
            Patent: patents.bankofamerica.com
          </p>
        </div>
      </div>
    </footer>
  );
}
