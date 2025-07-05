import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, CreditCard, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0">
            <Image 
                src="https://placehold.co/1600x800.png" 
                alt="Abstract background"
                data-ai-hint="abstract geometric"
                fill
                style={{ objectFit: 'cover' }}
                className="opacity-10"
                priority
            />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="font-headline text-4xl md:text-6xl font-bold">Banking that's built for you.</h1>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">Open an account online today and experience the Legacy National difference. Powerful tools, personalized insights, and security you can trust.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/accounts">Open an Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="#products">Explore Products</Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Find the right financial solutions</h2>
            <p className="mt-4 text-lg text-muted-foreground">From everyday banking to long-term investing, we have you covered.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Users /> Checking Accounts</CardTitle>
                <CardDescription>Accounts for your daily needs with features like mobile deposit and Zelle®.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href="#">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><TrendingUp /> Savings & CDs</CardTitle>
                <CardDescription>Grow your money with our competitive rates and flexible savings options.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href="#">Explore Savings <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><CreditCard /> Credit Cards</CardTitle>
                <CardDescription>Find the perfect card with rewards, cash back, or low interest rates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href="#">Compare Cards <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Offers Section */}
      <section id="offers" className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                     <h2 className="font-headline text-3xl md:text-4xl font-bold">Personalized offers for you</h2>
                     <p className="mt-4 text-lg text-muted-foreground">As a valued customer, you have access to exclusive offers. Sign in to see what's available for you.</p>
                     <ul className="mt-6 space-y-3">
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Special rates on loans and mortgages.</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Bonus rewards on new credit cards.</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Personalized investment advice.</li>
                     </ul>
                     <Button asChild size="lg" className="mt-8">
                        <Link href="#">Sign In to View Offers</Link>
                     </Button>
                </div>
                <div className="flex justify-center">
                    <Image src="https://placehold.co/500x400.png" alt="Personalized Offers" data-ai-hint="financial planning" width={500} height={400} className="rounded-lg shadow-xl"/>
                </div>
            </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
                <ShieldCheck className="h-12 w-12 mx-auto text-primary" />
                <h2 className="font-headline text-3xl md:text-4xl font-bold mt-4">Your security is our priority</h2>
                <p className="mt-4 text-lg text-muted-foreground">We're committed to keeping your accounts and personal information safe.</p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-lg border">
                    <h3 className="font-headline text-xl font-semibold">Fraud Protection</h3>
                    <p className="mt-2 text-muted-foreground">We monitor your accounts for suspicious activity and offer a $0 Liability Guarantee for unauthorized transactions.</p>
                    <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
                        <Link href="/security">Learn about fraud protection <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
                 <div className="bg-card p-6 rounded-lg border">
                    <h3 className="font-headline text-xl font-semibold">Secure Sign-In</h3>
                    <p className="mt-2 text-muted-foreground">Our advanced security features, including biometrics and two-factor authentication, help protect your account.</p>
                     <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary">
                        <Link href="/security">How we protect you <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
