import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Lock, Bell, Wifi, Phone, CreditCard } from 'lucide-react';
import Image from 'next/image';

const securityFeatures = [
    {
        icon: ShieldCheck,
        title: 'Zero Liability Guarantee',
        description: "You're not responsible for unauthorized transactions made with your account.",
    },
    {
        icon: Lock,
        title: 'Secure Sign-In',
        description: 'We use multi-factor authentication and encryption to protect your login.',
    },
    {
        icon: Bell,
        title: 'Customizable Alerts',
        description: 'Get real-time alerts for account activity via email or text message.',
    },
    {
        icon: CreditCard,
        title: 'Card Lock',
        description: 'Instantly lock and unlock your debit or credit card if it goes missing.',
    }
];

const safetyTips = [
    {
        icon: Wifi,
        title: 'Use Secure Wi-Fi',
        description: 'Avoid using public Wi-Fi for banking. Use a trusted network or your cellular data.'
    },
    {
        icon: Phone,
        title: 'Beware of Phishing',
        description: 'We will never ask for your password or PIN. Be suspicious of unsolicited requests for information.'
    },
    {
        title: 'Strong Passwords',
        icon: Lock,
        description: 'Create unique, complex passwords for your financial accounts.'
    },
];

export default function SecurityPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
            <ShieldCheck className="h-16 w-16 mx-auto text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Security Center</h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">Learn how we protect your information and how you can protect yourself.</p>
        </div>
      </section>

      {/* How We Protect You */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">How We Protect You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {securityFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <div className="mx-auto bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="font-headline mt-4">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
      </section>

      {/* How You Can Protect Yourself */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Protecting Your Account is a Team Effort</h2>
              <p className="mt-4 text-lg text-muted-foreground">Follow these best practices to keep your financial information secure.</p>
              <div className="mt-8 space-y-6">
                {safetyTips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                        <div key={index} className="flex items-start gap-4">
                           <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-background border">
                            <Icon className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                                <h3 className="font-headline font-semibold">{tip.title}</h3>
                                <p className="text-muted-foreground">{tip.description}</p>
                           </div>
                        </div>
                    )
                })}
              </div>
            </div>
            <div className="flex justify-center">
              <Image src="https://placehold.co/500x500.png" data-ai-hint="cyber security" alt="Security illustration" width={500} height={500} className="rounded-full shadow-xl"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
