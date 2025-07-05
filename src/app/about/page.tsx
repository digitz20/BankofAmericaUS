
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const impactStories = [
    {
        title: "We’re helping support communities impacted by the wildfires",
        description: "In the wake of the devastating Palisades, Eaton and other wildfires that swept through Los Angeles County and beyond, Bank of America has taken a lead role in coordinating financial relief and reconstruction efforts.",
        image: "https://about.bankofamerica.com/content/dam/about/images/notched-image/our-company/la-rebuild-notched-Image_1440x540.jpg",
        imageHint: "wildfire aftermath"
    },
    {
        title: "More than a race",
        description: "See how the Bank of America Chicago Marathon drives positive economic change in our latest impact report. In 2024, this event helped raise millions for charities, supported over 4,500 jobs and more.",
        image: "https://about.bankofamerica.com/content/dam/about/images/adobe-target/local/key-stats/chicago/Chi-Economic-Impact-Image-Tile-390x426-desktop.png",
        imageHint: "marathon runners"
    },
];

export default function AboutUsPage() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="relative bg-muted/30 py-20 md:py-28 text-center md:text-left">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                            We learn what matters most by asking you one simple question: What would you like the power to do?
                        </h1>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="https://about.bankofamerica.com/content/dam/about/images/masthead/en/hero-block-img--Large--400h.jpg"
                            data-ai-hint="employee helping client"
                            alt="Bank of America employee helping a client"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="font-headline text-3xl font-bold text-center mb-12">We're committed to strengthening our communities. See how we're making an impact.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 overflow-hidden">
                            <Image src="https://d1io3yog0oux5.cloudfront.net/_08401c594389fc375c9c11434938de85/bankofamerica/db/867/10162/annual_report_thumbnail.jpg" data-ai-hint="downtown los angeles" alt="Downtown Los Angeles" width={800} height={400} className="w-full h-64 object-cover" />
                            <CardContent className="p-6">
                                <h3 className="font-headline text-2xl font-bold mt-2">We’re helping support communities impacted by the wildfires</h3>
                                <p className="mt-2 text-muted-foreground">In the wake of the devastating Palisades, Eaton and other wildfires that swept through Los Angeles County and beyond, Bank of America has taken a lead role in coordinating financial relief and reconstruction efforts.</p>
                            </CardContent>
                        </Card>
                        <Card className="flex flex-col overflow-hidden">
                            <Image src="https://d1io3yog0oux5.cloudfront.net/_08401c594389fc375c9c11434938de85/bankofamerica/db/867/7068/annual_report_thumbnail.jpg" data-ai-hint="woman making heart" alt="Woman making a heart shape with her hands" width={400} height={300} className="w-full h-48 object-cover" />
                            <CardContent className="p-6 flex-grow flex flex-col">
                                <h3 className="font-headline text-xl font-bold">More than a race</h3>
                                <p className="mt-2 text-muted-foreground text-sm flex-grow">See how the Bank of America Chicago Marathon drives positive economic change in our latest impact report. In 2024, this event helped raise millions for charities, supported over 4,500 jobs and more.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            
            {/* Annual Report & Entrepreneurs Section */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                         <Card className="overflow-hidden">
                             <Image src="https://d1io3yog0oux5.cloudfront.net/_08401c594389fc375c9c11434938de85/bankofamerica/db/867/9840/annual_report_thumbnail.jpg" data-ai-hint="city skyline" alt="City skyline" width={600} height={400} className="w-full h-64 object-cover" />
                             <CardContent className="p-6">
                                <p className="text-sm text-muted-foreground">2024 ANNUAL REPORT</p>
                                <h3 className="font-headline text-2xl font-bold mt-2">2024 Bank of America Annual Report</h3>
                                <p className="mt-2 text-muted-foreground">See how our commitment to Responsible Growth has continued to fuel our company's success.</p>
                             </CardContent>
                        </Card>
                    </div>
                     <div className="space-y-8">
                         <Card className="overflow-hidden">
                             <Image src="https://i.pinimg.com/736x/37/f6/64/37f664637e2dfae0b0394799c9dc990b.jpg" data-ai-hint="veterinarian puppy" alt="Veterinarian with a puppy" width={600} height={400} className="w-full h-64 object-cover" />
                             <CardContent className="p-6">
                                <h3 className="font-headline text-2xl font-bold mt-2">Pursuing and enabling the dreams of entrepreneurs</h3>
                                <p className="mt-2 text-muted-foreground">Entrepreneurs enhance the character of cities and towns across our country. Dr. Josh Sanabria started his own veterinary hospital in Dallas, Texas – and we've supported his endeavors from day one.</p>
                                <Button variant="link" className="px-0 mt-4">Learn more</Button>
                             </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
