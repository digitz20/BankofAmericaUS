'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const creditCardOffers = [
    {
        name: "Customized Cash Rewards",
        image: "https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-hp-assets-mastheads-consumer-cards-en-4-card-card_mh_cash_newoffer_4960977_e.webp",
        imageHint: "credit card",
        annualFee: "No annual fee.",
        bonus: "$200",
        bonusType: "online bonus offer",
        feature: "New! 6% choice category cash back offer",
        featureDetail: "6% cash back in the category of your choice"
    },
    {
        name: "Unlimited Cash Rewards",
        image: "https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-hp-assets-mastheads-consumer-cards-en-4-card-card_mh_un_newoffer4960977_e.webp",
        imageHint: "money cash",
        annualFee: "No annual fee.",
        bonus: "$200",
        bonusType: "online bonus offer",
        feature: "New! 2% unlimited cash back offer",
        featureDetail: "Unlimited 2% cash back on all purchases"
    },
    {
        name: "Travel Rewards",
        image: "https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-hp-assets-mastheads-consumer-cards-en-4-card-5779014_Travel_3.webp",
        imageHint: "credit card travel",
        annualFee: "No annual fee.",
        bonus: "25,000",
        bonusType: "online bonus points offer",
        feature: "Unlimited 1.5 points for every $1 spent",
        featureDetail: "Unlimited 1.5 points for every $1 spent on all purchases"
    },
    {
        name: "BankAmericard®",
        image: "https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-hp-assets-mastheads-consumer-cards-en-4-card-5779014_Nonrewards_4.webp",
        imageHint: "secure credit card",
        annualFee: "No annual fee.",
        bonus: "0%",
        bonusType: "intro APR offer",
        feature: "Intro APR offer for 18 billing cycles",
        featureDetail: "Intro APR offer for 18 billing cycles"
    }
];

const financialArticles = [
    { 
        title: "Simple ways to save money for the future", 
        image: "https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-homepage-bmh-module-default-education-ent_edu_bac_7701865_319_en_gc_01-CSXf4193a32.jpg", 
        imageHint: "piggy bank saving"
    },
    { 
        title: "Help me decide: Should I pay down debt, save or invest?", 
        image: "https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-homepage-bmh-module-default-education-ent_edu_bac_6624682_319_en_gc_01-CSX1ac635d5.jpg", 
        imageHint: "investment chart"
    },
    { 
        title: "What is a certificate of deposit (CD) and how does it work?", 
        image: "https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-homepage-bmh-module-default-education-ent_edu_bac_7701865_319_en_gc_03-CSXeecbea35.jpg", 
        imageHint: "bank document"
    },
    { 
        title: "How to get out of credit card debt faster", 
        image: "https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-homepage-bmh-module-default-education-ent_edu_bac_7701865_319_en_gc_04-CSXf53daf.jpg", 
        imageHint: "credit card scissors"
    },
];

export default function Home() {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="bg-background">
      {/* Hero / Login Section */}
      <section className="relative text-white">
        <div className="absolute inset-0">
          <Image
            src="https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-hp-assets-super-highlights-enterprise-en-special-olympics-ent_shl_bmh_champs_5963738_722_gc.webp"
            alt="Special Olympics athletes celebrating"
            data-ai-hint="special olympics celebration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <Card className="shadow-lg bg-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Log In</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-id">User ID</Label>
                    <Input id="user-id" placeholder="Enter your User ID" className="text-black" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'password' : 'text'}
                        placeholder="Enter your password"
                        className="pr-10 text-black"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="save-id" />
                      <Label htmlFor="save-id" className="text-sm font-normal">Save User ID</Label>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard">Log In</Link>
                  </Button>
                  <div className="text-sm text-center space-x-2 text-accent-foreground/80">
                    <Link href="#" className="text-accent-foreground hover:underline">Forgot ID/Password?</Link>
                    <span>|</span>
                    <Link href="#" className="text-accent-foreground hover:underline">Enroll</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2 flex flex-col justify-center items-center text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-white">New checking customers. $300 cash offer.</h2>
              <p className="mt-4 text-lg text-white/90 max-w-md">Open a new eligible checking account and make qualifying direct deposits.</p>
              <Button size="lg" className="mt-6 bg-accent hover:bg-accent/90" asChild>
                <Link href="/accounts">See offer details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Credit Card Offers */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Choose the card that works for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {creditCardOffers.map((card, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{card.name}</CardTitle>
                  <CardDescription>{card.annualFee}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                        <Image src={card.image} alt={card.name} data-ai-hint={card.imageHint} width={300} height={180} className="rounded-md mb-4"/>
                        <p className="text-3xl font-bold font-headline text-primary">{card.bonus}</p>
                        <p className="text-sm text-muted-foreground">{card.bonusType}</p>
                        <p className="mt-4 font-semibold">{card.feature}</p>
                        <p className="text-sm text-muted-foreground">{card.featureDetail}</p>
                    </div>
                  <Button className="mt-6 w-full" asChild>
                    <Link href="/accounts">Apply Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Goals */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Your financial goals matter</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">We can help you achieve them through Better Money Habits® financial education and programs that make communities stronger.</p>
        </div>
        <div className="container mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {financialArticles.map((article, index) => (
                <Card key={index} className="overflow-hidden">
                    <Image src={article.image} alt={article.title} data-ai-hint={article.imageHint} width={600} height={400} className="w-full h-48 object-cover"/>
                    <CardContent className="p-4">
                         <Link href="#" className="font-semibold text-primary hover:underline">{article.title}</Link>
                    </CardContent>
                </Card>
            ))}
        </div>
         <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/help">Explore more topics</Link>
            </Button>
         </div>
      </section>

      {/* News & Info */}
       <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-card border rounded-lg p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-headline text-2xl font-bold">Your news and information</h3>
              <h4 className="font-headline text-xl mt-4">Level up your account security</h4>
              <p className="mt-2 text-muted-foreground">Watch your security meter rise as you take action against fraud. See it in the Security Center in Mobile and Online Banking.</p>
               <Button className="mt-4" asChild>
                <Link href="/security">See your security</Link>
               </Button>
            </div>
            <div className="flex justify-center">
                <Image src="https://www2.bac-assets.com/homepage/spa-assets/images/assets-images-site-homepage-news-life-services-yni_sec_phone_4657392_e-CSX8c7d2691.webp" data-ai-hint="security shield" alt="Security meter" width={400} height={300} className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4 text-xs text-muted-foreground space-y-4">
              <h3 className="font-bold text-sm text-foreground">Online Banking Service Agreement</h3>
              <p>Investing in securities involves risks, and there is always the potential of losing money when you invest in securities. You should review any planned financial transactions that may have tax or legal implications with your personal tax or legal advisor.</p>
              <p>Securities products are provided by Merrill Lynch, Pierce, Fenner & Smith Incorporated (also referred to as "MLPF&S", or "Merrill"), a registered broker-dealer, registered investment adviser, Member SIPC, and a wholly-owned subsidiary of Bank of America Corporation. MLPF&S makes available certain investment products sponsored, managed, distributed or provided by companies that are affiliates of Bank of America Corporation.</p>
              <p>Bank of America Private Bank is a division of Bank of America, N.A., Member FDIC and a wholly owned subsidiary of Bank of America Corporation. Trust and fiduciary services are provided by Bank of America, N.A. and U.S. Trust Company of Delaware. Both are indirect subsidiaries of Bank of America Corporation.</p>
              <p>Insurance Products are offered through Merrill Lynch Life Agency Inc. (MLLA) and/or Banc of America Insurance Services, Inc., both of which are licensed insurance agencies and wholly-owned subsidiaries of Bank of America Corporation.</p>
              <p>Banking, credit card, automobile loans, mortgage and home equity products are provided by Bank of America, N.A. and affiliated banks, Members FDIC and wholly owned subsidiaries of Bank of America Corporation. Credit and collateral are subject to approval. Terms and conditions apply. This is not a commitment to lend. Programs, rates, terms and conditions are subject to change without notice.</p>
          </div>
      </section>
    </div>
  );
}
