import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { SmartAssist } from '@/components/smart-assist';

export const metadata: Metadata = {
  title: 'Bank of America',
  description: 'Bank of America - Banking, Credit Cards, Home Loans & Auto Loans',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
          <p>Bank of America deposit products: FDIC-Insured - Backed by the full faith and credit of the U.S. Government</p>
        </div>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <SmartAssist />
        <Toaster />
      </body>
    </html>
  );
}
