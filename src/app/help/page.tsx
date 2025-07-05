
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Info, UserCog, MapPin, Car, LogIn, PiggyBank, Wallet, Building2, CreditCard,
    HeartHandshake, ScrollText, Globe, TrendingUp, ShieldCheck, Stethoscope,
    Shield, Smartphone, Home, FileSignature, MonitorSmartphone, Gavel, Lock,
    Briefcase, GraduationCap, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const contactTopics = [
    { title: "About Legacy National", icon: Info },
    { title: "Account changes", icon: UserCog },
    { title: "ATMs", icon: MapPin },
    { title: "Auto loans", icon: Car },
    { title: "Login Issues", icon: LogIn },
    { title: "CD & IRAs", icon: PiggyBank },
    { title: "Checking & savings", icon: Wallet },
    { title: "Corporate & institutional banking", icon: Building2 },
    { title: "Credit cards", icon: CreditCard },
    { title: "Elder financial care", icon: HeartHandshake },
    { title: "Estate services", icon: ScrollText },
    { title: "International travel", icon: Globe },
    { title: "Investment & wealth management", icon: TrendingUp },
    { title: "Medallion Signature Guarantee", icon: ShieldCheck },
    { title: "Medical & professional practice loans", icon: Stethoscope },
    { title: "Military banking", icon: Shield },
    { title: "Mobile Banking", icon: Smartphone },
    { title: "Mortgage & home equity", icon: Home },
    { title: "Notary services", icon: FileSignature },
    { title: "Online Banking & Bill Pay", icon: MonitorSmartphone },
    { title: "Power of attorney", icon: Gavel },
    { title: "Privacy & security", icon: Lock },
    { title: "Small business banking", icon: Briefcase },
    { title: "Student banking", icon: GraduationCap },
];

const quickLinks = [
    "Dispute an ATM/Debit Card Transaction",
    "Dispute a Credit Card Transaction",
    "Manage/Cancel Funds Transfers",
    "Manage/Cancel Recurring Bill Pay",
    "Credit Line Increase",
    "Balance Transfer",
    "Zelle – a safe and easy way to send money fast",
    "Password Reset",
    "Update Contact Information",
];

const SocialIcon = ({ d, label }: { d: string, label: string }) => (
    <div className="flex items-center gap-4">
        <div className="bg-primary text-primary-foreground p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d={d}></path>
            </svg>
        </div>
        <p className="flex-1 text-sm text-muted-foreground">{label}</p>
    </div>
);

export default function HelpPage() {
    return (
        <div className="bg-background">
            <section className="bg-muted py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Customer Service</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">We're here to help. Quickly access our convenient digital solutions.</p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="font-headline text-3xl font-bold mb-8">Contact us</h2>
                            <p className="mb-6 text-muted-foreground">For the best ways to contact us about specific issues, please select a topic.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {contactTopics.map((topic) => {
                                    const Icon = topic.icon;
                                    return (
                                        <Button key={topic.title} variant="outline" className="justify-start h-auto py-3 text-left">
                                            <Icon className="mr-3 h-5 w-5 text-primary" />
                                            <span className="flex-1">{topic.title}</span>
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Quick Access</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {quickLinks.map(link => (
                                            <li key={link}>
                                                <Link href="#" className="text-sm text-primary hover:underline flex justify-between items-center">
                                                    {link} <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                             <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Find us</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div>
                                        <h3 className="font-semibold">Find ATMs & financial centers</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Use our financial center locator to find a convenient location or ATM near you.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Schedule an appointment</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Make an appointment to open an account or discuss your financial concerns at your convenience.</p>
                                    </div>
                                    <Button className="w-full">Find a Location</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Connect on Social</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <p className="text-xs text-muted-foreground">
                                        Privately message us. Please remember: Don't include account numbers or Social Security numbers for security reasons.
                                    </p>
                                    <SocialIcon 
                                        label="Message us on Facebook"
                                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1.5.5-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"
                                    />
                                     <SocialIcon 
                                        label="Direct message @LNB_Help on X"
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1 2.25h3.437l4.722 6.442L18.244 2.25zM17.06 19.75h1.546L6.86 4.25H5.216l11.844 15.5z"
                                    />
                                    <div className="text-xs text-muted-foreground pt-2 border-t">
                                        <p className="font-semibold">Our representatives are available:</p>
                                        <p>Mon-Fri, 8 a.m. to 9 p.m. ET</p>
                                        <p>Sat, 9 a.m. to 6 p.m. ET</p>
                                        <p>Sun, 8 a.m. to 5 p.m. ET</p>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
