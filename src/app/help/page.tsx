
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Facebook, Instagram, Twitter, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
    { text: "Dispute an ATM/Debit Card Transaction", href: "#" },
    { text: "Dispute a Credit Card Transaction", href: "#" },
    { text: "Manage/Cancel Funds Transfers", href: "#" },
    { text: "Manage/Cancel Recurring Bill Pay", href: "#" },
    { text: "Credit Line Increase", href: "#" },
    { text: "Balance Transfer", href: "#" },
    { text: "Zelle – a safe and easy way to send money fast", href: "#" },
    { text: "Password Reset", href: "#" },
    { text: "Update Contact Information", href: "#" }
];

const contactTopics = [
    "About Bank of America", "Account changes", "Automated Teller Machine (ATMs)", "Auto loans",
    "Bank of America Login Issues", "CD & IRAs", "Checking & savings", "Corporate & institutional banking",
    "Credit cards", "Elder financial care", "Estate services", "International travel",
    "Investment & wealth management", "Medallion Signature Guarantee", "Medical & professional practice loans",
    "Military banking", "Mobile Banking", "Mortgage & home equity", "Notary services",
    "Online Banking & Bill Pay", "Power of attorney", "Privacy & security", "Small business banking", "Student banking"
];

export default function HelpPage() {
    return (
        <div className="bg-background">
            <header className="bg-muted py-16 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">We're here to help</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="font-headline text-2xl font-bold mb-4">Quickly access our convenient digital solutions:</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {quickLinks.map((link) => (
                                    <Link href={link.href} key={link.text} className="text-primary hover:underline text-sm flex items-center gap-2 group">
                                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                                        <span>{link.text}</span>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="font-headline text-2xl font-bold mb-2">Contact us</h2>
                            <p className="text-muted-foreground mb-6">For the best ways to contact us about specific issues, please select a topic.</p>
                             <Accordion type="single" collapsible className="w-full">
                                {contactTopics.map((topic) => (
                                    <AccordionItem value={topic} key={topic}>
                                        <AccordionTrigger className="text-left">{topic}</AccordionTrigger>
                                        <AccordionContent>
                                            For assistance with {topic.toLowerCase()}, please call our customer service line or visit a local branch.
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </section>
                    </div>

                    <aside className="lg:col-span-1 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <span className="font-headline">Find ATMs & financial centers</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm mb-4">Use our financial center locator to find a convenient location or ATM near you.</p>
                                <Button className="w-full">Find a location</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                     <Calendar className="h-6 w-6 text-primary" />
                                    <span className="font-headline">Schedule an appointment</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm mb-4">Make an appointment to open an account or discuss your financial concerns at your convenience.</p>
                                <Button className="w-full">Schedule now</Button>
                            </CardContent>
                        </Card>
                    </aside>
                </div>

                 <section className="mt-16 pt-12 border-t">
                    <h2 className="font-headline text-2xl font-bold text-center mb-8">Connect with us on social media</h2>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                        <Link href="#" className="flex flex-col items-center group">
                            <Facebook className="h-10 w-10 text-primary mb-2 transition-transform group-hover:scale-110"/>
                            <span className="font-semibold group-hover:underline">Facebook</span>
                        </Link>
                        <Link href="#" className="flex flex-col items-center group">
                            <Instagram className="h-10 w-10 text-primary mb-2 transition-transform group-hover:scale-110"/>
                             <span className="font-semibold group-hover:underline">Instagram</span>
                        </Link>
                        <Link href="#" className="flex flex-col items-center group">
                            <Twitter className="h-10 w-10 text-primary mb-2 transition-transform group-hover:scale-110"/>
                             <span className="font-semibold group-hover:underline">X (Twitter)</span>
                        </Link>
                    </div>
                    <div className="text-center text-muted-foreground text-sm mt-8 max-w-3xl mx-auto space-y-4">
                        <p className="font-semibold text-foreground">Our representatives are available:</p>
                        <p>Mon-Fri, 8 a.m. to 9 p.m. ET<br/>Sat, 9 a.m. to 6 p.m. ET<br/>Sun, 8 a.m. to 5 p.m. ET</p>
                        <p className="mt-4">Privately message your name, ZIP code, phone number, inquiry and best time to contact you. Please remember: <span className="font-semibold">Don't include account numbers or Social Security numbers</span> for security reasons and check to ensure you are using our verified accounts.</p>
                        <p className="font-semibold text-foreground/80 mt-4">Neither Bank of America Corporation nor any of its affiliates will ever ask you for your Social Security number, account information, passwords or PINs via Facebook, Instagram or X.</p>
                    </div>
                </section>
            </main>
             <footer className="py-8 bg-muted/30 mt-12">
                <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
                    <p>Bank of America, N.A. Member FDIC. Equal Housing Lender</p>
                    <p>© 2025 Bank of America Corporation. All Rights Reserved.</p>
                    <p className="mt-2">Patent: patents.bankofamerica.com</p>
                </div>
            </footer>
        </div>
    );
}
