
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, DollarSign, CreditCard, Network, ShieldCheck, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const businessSolutions = [
    {
        icon: Building,
        title: "All-in-one business checking",
        description: "Our business checking accounts provide access to powerful digital tools, dedicated specialists and rewards all in one place.",
    },
    {
        icon: Network,
        title: "Working Capital Manager®",
        description: "Optimize working capital with a secure suite of solutions tailored to your business.",
    },
    {
        icon: CreditCard,
        title: "Business Advantage cards",
        description: "Choose from cash back, travel rewards, lower interest rates or features that will help you build your business credit.",
    },
    {
        icon: DollarSign,
        title: "Payment solutions",
        description: "Our comprehensive solutions help payments flow smoothly and securely as your business grows.",
    }
];

const insights = [
    {
        icon: Lightbulb,
        title: "Center for Business Empowerment",
        description: "Our how-tos, insights and resources can help you prosper and grow.",
    },
    {
        icon: Building,
        title: "Bank of America Institute",
        description: "Uncovering powerful insights that move business and society forward.",
    },
    {
        icon: ShieldCheck,
        title: "Fraud and cybersecurity",
        description: "Strategies, solutions and technology to protect your business from cyber threats.",
    }
];


export default function SmallBusinessPage() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 text-center text-white overflow-hidden">
                 <div className="absolute inset-0">
                    <Image
                        src="https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-homepage-masthead-container-module-Default-Masthead-1024x412-CSX5a9e17fd.jpg"
                        alt="Business professionals in an office setting"
                        data-ai-hint="business office"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary/70" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Business solutions that make every move matter</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">
                        No matter the size or complexity of your business, we offer digital tools, insights and expertise that keep you ahead.
                    </p>
                </div>
            </section>

            {/* Revenue Selector */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="font-headline text-2xl font-bold text-center mb-4">Choose the annual revenue that fits your business</h2>
                    <p className="text-center text-muted-foreground mb-8">We'll show you ways we can help</p>
                    <Tabs defaultValue="startup" className="w-full max-w-4xl mx-auto">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
                            <TabsTrigger value="startup" className="py-2">I'm just starting out</TabsTrigger>
                            <TabsTrigger value="1m" className="py-2">Up to $1M</TabsTrigger>
                            <TabsTrigger value="50m" className="py-2">$1M to $50M</TabsTrigger>
                            <TabsTrigger value="500m" className="py-2">$50M to $500M</TabsTrigger>
                            <TabsTrigger value="500m+" className="py-2">More than $500M</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {businessSolutions.map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <Card key={index} className="flex flex-col">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="bg-primary text-primary-foreground p-3 rounded-md">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="font-headline text-lg leading-tight">{solution.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground text-sm">{solution.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                     <div className="text-center mt-12">
                        <Button>Get help finding the right solutions</Button>
                    </div>
                </div>
            </section>
            
            {/* Insights and Resources */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="font-headline text-3xl font-bold text-center mb-12">Insights and resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {insights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Card key={index} className="text-center p-6">
                                    <div className="mx-auto bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-headline text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                    <Button variant="link" className="mt-2">Learn more</Button>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
