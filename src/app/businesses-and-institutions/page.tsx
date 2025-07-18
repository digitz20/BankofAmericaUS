import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const solutions = [
    {
        title: "CashPro®",
        description: "Manage working capital from anywhere",
        image: "https://business.bofa.com/content/dam/flagship/home/icons/cashpro_icon.svg",
        imageHint: "business dashboard"
    },
    {
        title: "BofA Mercury®",
        description: "Insights and tools to help optimize your trading strategies",
        image: "https://business.bofa.com/content/dam/flagship/home/icons/bofa-mercury_icon.svg",
        imageHint: "trading chart"
    },
    {
        title: "Global Digital Disbursements",
        description: "Fast, secure mobile B2C payments",
        image: "https://business.bofa.com/content/dam/flagship/home/icons/global-digital-disbursements_icon.svg",
        imageHint: "mobile payment"
    }
];

export default function BusinessesAndInstitutionsPage() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="bg-muted py-20 md:py-28">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Great minds think ahead</h1>
                        <p className="mt-4 text-lg max-w-xl mx-auto md:mx-0 text-muted-foreground">
                            Dive into recent thinking from some of our top-ranked BofA Global Research team and read about current market trends in health care, retail, software and much more.
                        </p>
                        <Button size="lg" className="mt-8" asChild>
                            <Link href="/businesses-and-institutions">Start exploring <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="https://business.bofa.com/content/dam/flagship/global-research/featured-analysts/smi_BV_hp_masthead_finalcutsBV_Desktop_1440x380.jpg"
                            data-ai-hint="analyst team headshots"
                            alt="Team of analysts"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* AI Dictionary */}
                        <Card className="lg:col-span-2 overflow-hidden">
                             <Image src="https://business.bofa.com/content/dam/flagship/home/inst.jpg" data-ai-hint="ai innovation" alt="AI innovation" width={800} height={400} className="w-full h-64 object-cover" />
                             <CardContent className="p-6">
                                <p className="text-sm text-muted-foreground">JULY 2025</p>
                                <h3 className="font-headline text-2xl font-bold mt-2">AI dictionary, part 2: The next generation</h3>
                                <p className="mt-2 text-muted-foreground">Innovation is accelerating and the future of AI might be closer than we think. Here, we look at what’s ahead.</p>
                                <Button variant="link" className="px-0 mt-4" asChild><Link href="/businesses-and-institutions">Read more (2 min read) <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                             </CardContent>
                        </Card>
                        {/* Proud Supporter */}
                        <Card className="flex flex-col justify-between bg-primary text-primary-foreground p-6">
                            <div>
                                <h3 className="font-headline text-2xl font-bold">Proud supporter of every goal</h3>
                                <p className="mt-2 text-primary-foreground/80">Teaming up to support achievements in the game of soccer, and across our community.</p>
                            </div>
                            <Image src="https://business.bofa.com/content/dam/flagship/gbgmr/fifa-bank/Biz.BofA_SiteTile_640x360.jpg" data-ai-hint="soccer goal" alt="Soccer goal" width={400} height={300} className="rounded-md mt-4" />
                        </Card>
                         {/* Equity Markets */}
                        <Card className="overflow-hidden">
                             <Image src="https://business.bofa.com/content/dam/flagship/article/what-matters-in-equity-markets/Tully-Bowman-headshot-TI-640x360.jpg" data-ai-hint="equity market chart" alt="Equity market chart" width={400} height={300} className="w-full h-48 object-cover" />
                             <CardContent className="p-6">
                                <p className="text-sm text-primary font-semibold">BOFA GLOBAL MARKETS</p>
                                <h3 className="font-headline text-xl font-bold mt-2">Seeing beyond the narratives in equity markets</h3>
                                <p className="mt-2 text-muted-foreground text-sm">With macro narratives influencing equity valuations, discover how can you tell what really matters and what’s noise.</p>
                                <Button variant="link" className="px-0 mt-2" asChild><Link href="/businesses-and-institutions">Watch Video (1:32) <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                             </CardContent>
                        </Card>
                         {/* Global Payments */}
                         <Card className="overflow-hidden">
                             <Image src="https://business.bofa.com/content/dam/flagship/global-transaction-services/transaction-services-treasury-management-solutions/GPSInsights-tile-640x360.jpg" data-ai-hint="global payments" alt="Global payments network" width={400} height={300} className="w-full h-48 object-cover" />
                             <CardContent className="p-6">
                                <h3 className="font-headline text-xl font-bold">Global payment insights to drive your business forward</h3>
                                <p className="mt-2 text-muted-foreground text-sm">Expertise, resources and perspectives for treasury and payments professionals, designed to help make business easier.</p>
                             </CardContent>
                        </Card>
                         {/* Must Read Research */}
                         <Card className="overflow-hidden">
                             <Image src="https://business.bofa.com/content/dam/flagship/global-research/market-strategies-insights/weekly-market-recap-report/Candace-Browning-tile-640x360.jpg" data-ai-hint="research document" alt="Research document" width={400} height={300} className="w-full h-48 object-cover" />
                             <CardContent className="p-6">
                                <p className="text-sm text-primary font-semibold">BOFA GLOBAL RESEARCH</p>
                                <h3 className="font-headline text-xl font-bold mt-2">Must Read Research</h3>
                                <p className="mt-2 text-muted-foreground text-sm">What you should know from the past week.</p>
                             </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-muted py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-headline text-3xl font-bold">What should the world expect from a bank?</h2>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">Economies fluctuate but values don’t. Find the tools and insights you need to succeed. Our only ambition is to help you fulfill yours.</p>
                    <Button variant="outline" size="lg" className="mt-6" asChild><Link href="/about">Learn more about our story</Link></Button>
                </div>
            </section>

            {/* Solutions */}
            <section className="py-16 md:py-24">
                 <div className="container mx-auto px-4">
                    <h2 className="font-headline text-3xl font-bold text-center mb-4">Solutions</h2>
                    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Data and technology driven solutions and services designed for business and life.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {solutions.map((solution) => (
                            <Card key={solution.title} className="overflow-hidden text-center">
                                <Image src={solution.image} data-ai-hint={solution.imageHint} alt={solution.title} width={400} height={300} className="w-full h-48 object-cover" />
                                <CardHeader>
                                    <CardTitle className="font-headline">{solution.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{solution.description}</p>
                                    <Button variant="link" className="mt-4" asChild><Link href="/businesses-and-institutions">Learn more</Link></Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
