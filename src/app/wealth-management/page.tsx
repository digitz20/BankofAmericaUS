
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Briefcase, Building } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const investmentApproaches = [
    {
        title: "Work with an advisor",
        subtitle: "Merrill Lynch Wealth Management",
        description: "You’ll work closely with a dedicated advisor to help you create a personalized financial strategy.",
        details: ["New to Merrill? Have an advisor contact you."],
        investmentMinimum: "Generally $250,000",
        buttonText: "Explore more",
        icon: Briefcase,
    },
    {
        title: "Your investment goals, your way",
        subtitle: "Merrill Edge® Self-Directed & Guided Investing",
        description: "Personalized insights, guidance, and digital tools to confidently act on your ideas. Or, get a professionally managed portfolio with an optional advisor.",
        details: [],
        investmentMinimum: "No minimum (Self-Directed) or as low as $1,000 (Guided)",
        buttonText: "Learn more",
        icon: Award,
    },
    {
        title: "Navigating more complex needs",
        subtitle: "Bank of America Private Bank",
        description: "From trust and estate planning to philanthropy services, we help manage the complexities of substantial wealth.",
        details: [],
        investmentMinimum: "$3,000,000",
        buttonText: "Learn more",
        icon: Building,
    },
];

export default function WealthManagementPage() {
    return (
        <div className="bg-background">
            <section className="relative py-24 md:py-32 text-center text-white overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://i.pinimg.com/736x/90/79/65/907965aa8943c9be1ded3a4a1f6f9b27.jpg"
                        alt="Wealth management concept"
                        data-ai-hint="wealth management abstract"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary/70" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Investment solutions designed for you</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">
                        With Legacy National banking and Merrill investing, find the investment approach that fits your needs to help you manage your wealth.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {investmentApproaches.map((approach, index) => {
                            const Icon = approach.icon;
                            return (
                                <Card key={index} className="flex flex-col h-full">
                                    <CardHeader>
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="bg-primary text-primary-foreground p-3 rounded-md">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="font-headline text-xl leading-tight">{approach.title}</CardTitle>
                                                <CardDescription>{approach.subtitle}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col">
                                        <p className="text-muted-foreground flex-grow">{approach.description}</p>
                                        <div className="mt-6 border-t pt-4">
                                            <p className="text-sm font-semibold">Investment minimum:</p>
                                            <p className="text-sm text-muted-foreground">{approach.investmentMinimum}</p>
                                        </div>
                                         <Button className="mt-6 w-full">{approach.buttonText}</Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
            
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-headline text-2xl font-bold">Ready to talk to a Merrill advisor?</h2>
                    <p className="mt-2 text-muted-foreground">Let us connect you to one.</p>
                    <Button size="lg" className="mt-6">Get started</Button>
                </div>
            </section>

             <section className="py-12 bg-background">
                <div className="container mx-auto px-4 text-xs text-muted-foreground">
                    <p className="mb-4">
                        1. Please review the applicable Merrill Guided Investing Program Brochure for information including the program fee, rebalancing, and the details of the investment advisory program. Your recommended investment strategy will be based solely on the information you provide to us for this specific investment goal.
                    </p>
                    <p>
                        2. The Merrill Guided Investing program investment minimum is $1,000 for growth-focused strategies and $50,000 for income-focused strategies. The Merrill Guided Investing with Advisor program investment minimum is $20,000 for growth-focused strategies and $50,000 for income-focused strategies.
                    </p>
                </div>
            </section>
        </div>
    );
}
