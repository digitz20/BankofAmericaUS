
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ShieldCheck, CreditCard, UserCog, MonitorSmartphone, DollarSign, Settings2,
    Search, Calendar, MapPin, MessageSquare, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const trendingTopics = [
    "Routing number",
    "Bill Pay",
    "Make a payment",
    "Dispute charge",
    "Erica® virtual assistant"
];

const helpTopics = [
    {
        title: "Security & Privacy",
        icon: ShieldCheck,
        links: ["Alerts setup", "Dispute charge", "Fingerprint (Touch ID)", "Forgot ID/password", "Security center"]
    },
    {
        title: "Card Management",
        icon: CreditCard,
        links: ["Activate card", "BankAmeriDeals®", "Credit card PIN", "Lock/unlock debit card", "Redeem rewards", "Replace card"]
    },
    {
        title: "Account Management",
        icon: UserCog,
        links: ["Account balance", "Account number", "Reorder checks", "Routing number", "Statements and documents", "Update contact info"]
    },
    {
        title: "Digital Services",
        icon: MonitorSmartphone,
        links: ["How-to Guide for Digital Banking", "Digital wallet - pay using your phone", "Enroll in online/mobile banking", "Erica® virtual assistant", "Mobile and online banking features", "Paperless statements"]
    },
    {
        title: "Payments & Transfers",
        icon: DollarSign,
        links: ["Bill Pay", "Direct deposit", "Mobile check deposit", "Transfer money", "Wire transfers", "Zelle®"]
    },
    {
        title: "Tools",
        icon: Settings2,
        links: ["Accessibility help", "Bank of America Life Plan®", "Exchange foreign currency", "FICO® score", "Goals tool", "Life services", "Spending and budgeting"]
    },
];

const connectLinks = [
    { title: "Schedule an appointment", icon: Calendar, href: "#" },
    { title: "Find a location", icon: MapPin, href: "#" },
    { title: "Contact us", icon: MessageSquare, href: "#" },
]

export default function HelpPage() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="bg-muted/30 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">How can we help?</h1>
                    <div className="relative max-w-2xl mx-auto mt-8">
                        <Input
                            placeholder="Search for a topic, keyword or phrase"
                            className="h-12 text-lg pl-12"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
                        <span className="text-sm font-semibold">Trending Topics:</span>
                        {trendingTopics.map(topic => (
                             <Button key={topic} variant="link" className="text-sm px-1 text-primary">
                                {topic}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Topics Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {helpTopics.map((topic) => {
                            const Icon = topic.icon;
                            return (
                                <Card key={topic.title}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <Icon className="h-6 w-6 text-primary" />
                                            <span className="font-headline">{topic.title}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {topic.links.map(link => (
                                                <li key={link}>
                                                    <Link href="#" className="text-sm text-primary hover:underline flex justify-between items-center">
                                                        <span>{link}</span>
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
            
            {/* Connect Section */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4">
                    <h2 className="font-headline text-3xl font-bold text-center mb-12">Connect with us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {connectLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Card key={link.title} className="text-center p-6 hover:shadow-lg transition-shadow">
                                     <div className="mx-auto bg-primary text-primary-foreground h-16 w-16 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="font-headline text-xl font-semibold mb-2">{link.title}</h3>
                                    <Button asChild><Link href={link.href}>Go</Link></Button>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Client Care Commitment */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="font-headline text-3xl font-bold">Our Client Care Commitment</h2>
                    <p className="mt-6 text-muted-foreground">We know you work hard to make life better for yourself and the people you care about most. We believe in providing solutions to help you do this throughout your life. Because we value your relationship with us, our promise to you is to always listen to you, provide advice when you need it, and strive to exceed your expectations. Every one of us at Bank of America believes in this promise and strives to deliver on it each day. And it's the reason we will always approach your needs with a question centered squarely on you.</p>
                    <p className="font-headline text-xl font-bold mt-8 text-primary">What would you like the power to do?®</p>
                </div>
            </section>

             <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4 text-xs text-muted-foreground">
                    <h3 className="font-bold text-sm mb-2 text-foreground">Important Disclosures and Information</h3>
                    <p className="mb-4">
                        Some accounts, services and fees vary from state to state. Please review the Business Schedule of Fees for your state, also available at your local financial center.
                    </p>
                    <p className="mb-4">
                        Credit and collateral are subjected to approval. Terms and conditions apply. This is not a commitment to lend. Programs, rates, terms, and conditions are subject to change without notice.
                    </p>
                </div>
            </section>
        </div>
    );
}
