
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, Phone, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const trendingTopics = ["Routing number", "Bill Pay", "Make a payment", "Dispute charge", "Erica® virtual assistant"];

const helpCategories = [
    {
        title: "Security & Privacy",
        links: ["Alerts setup", "Dispute charge", "Fingerprint (Touch ID)", "Forgot ID/password", "Security center"]
    },
    {
        title: "Card Management",
        links: ["Activate card", "BankAmeriDeals®", "Credit card PIN", "Lock/unlock debit card", "Redeem rewards", "Replace card"]
    },
    {
        title: "Account Management",
        links: ["Account balance", "Account number", "Reorder checks", "Routing number", "Statements and documents", "Update contact info"]
    },
    {
        title: "Digital Services",
        links: ["How-to Guide for Digital Banking", "Digital wallet - pay using your phone", "Enroll in online/mobile banking", "Erica® virtual assistant", "Mobile and online banking features", "Paperless statements"]
    },
    {
        title: "Payments & Transfers",
        links: ["Bill Pay", "Direct deposit", "Mobile check deposit", "Transfer money", "Wire transfers", "Zelle®"]
    },
    {
        title: "Tools",
        links: ["Accessibility help", "Bank of America Life Plan®", "Exchange foreign currency", "FICO® score", "Goals tool", "Life services", "Spending and budgeting"]
    }
];

export default function HelpPage() {
    return (
        <div className="bg-background">
            {/* Header Section */}
            <header className="relative text-white py-20 text-center overflow-hidden">
                 <div className="absolute inset-0">
                    <Image
                        src="https://i.pinimg.com/736x/66/46/d2/6646d2494e668989ab099759e7a947a3.jpg"
                        alt="Customer support representative"
                        data-ai-hint="customer support"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary/70" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">How can we help?</h1>
                    <div className="relative max-w-2xl mx-auto mt-8">
                        <Input placeholder="Search for a topic" className="h-12 pl-12 text-lg text-black" />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                {/* Trending Topics */}
                <section className="text-center mb-16">
                    <h2 className="font-headline text-xl font-bold mb-4">Trending Topics:</h2>
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                        {trendingTopics.map((topic) => (
                            <Link href="#" key={topic} className="text-primary hover:underline font-medium">
                                {topic}
                            </Link>
                        ))}
                    </div>
                </section>
                
                {/* Help Categories Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {helpCategories.map((category) => (
                        <Card key={category.title}>
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {category.links.map((link) => (
                                        <li key={link}>
                                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline group">
                                                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                                                <span>{link}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </section>

                {/* Connect with us */}
                <section className="mb-16">
                     <h2 className="font-headline text-3xl font-bold text-center mb-8">Connect with us</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="flex flex-col items-center justify-center p-6 text-center">
                           <Calendar className="h-10 w-10 text-primary mb-4"/>
                           <h3 className="font-headline text-xl font-bold mb-2">Schedule an appointment</h3>
                           <Button asChild><Link href="/help">Schedule now</Link></Button>
                        </Card>
                         <Card className="flex flex-col items-center justify-center p-6 text-center">
                           <MapPin className="h-10 w-10 text-primary mb-4"/>
                           <h3 className="font-headline text-xl font-bold mb-2">Find a location</h3>
                           <Button asChild><Link href="/help">Find a location</Link></Button>
                        </Card>
                         <Card className="flex flex-col items-center justify-center p-6 text-center">
                           <Phone className="h-10 w-10 text-primary mb-4"/>
                           <h3 className="font-headline text-xl font-bold mb-2">Contact us</h3>
                           <Button asChild><Link href="/help">Get contact info</Link></Button>
                        </Card>
                     </div>
                </section>

                {/* Client Care Commitment */}
                <section className="bg-muted p-8 rounded-lg">
                    <h2 className="font-headline text-2xl font-bold mb-4">Our Client Care Commitment</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>We know you work hard to make life better for yourself and the people you care about most. We believe in providing solutions to help you do this throughout your life. Because we value your relationship with us, our promise to you is to always listen to you, provide advice when you need it, and strive to exceed your expectations. Every one of us at Bank of America believes in this promise and strives to deliver on it each day. And it's the reason we will always approach your needs with a question centered squarely on you.</p>
                        <p className="font-headline text-lg text-primary font-bold mt-4">What would you like the power to do?®</p>
                    </div>
                </section>

                 <footer className="mt-16 pt-8 border-t text-xs text-muted-foreground space-y-4">
                    <h3 className="font-bold text-sm text-foreground">Important Disclosures and Information</h3>
                    <p>Some accounts, services and fees vary from state to state. Please review the Business Schedule of Fees for your state, also available at your local financial center.</p>
                    <p>Credit and collateral are subjected to approval. Terms and conditions apply. This is not a commitment to lend. Programs, rates, terms, and conditions are subject to change without notice.</p>
                </footer>
            </main>
        </div>
    );
}
