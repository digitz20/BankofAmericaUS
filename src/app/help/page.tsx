import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LifeBuoy, Mail, MessageCircle, Phone } from 'lucide-react';

const faqs = [
    {
        question: "How do I reset my online banking password?",
        answer: "You can reset your password by clicking the 'Forgot Password' link on the sign-in page. You'll need to verify your identity using your account information and the email address or phone number on file."
    },
    {
        question: "What are the fees for a checking account?",
        answer: "Our Advantage Checking account has a monthly maintenance fee that can be waived by meeting certain requirements, such as maintaining a minimum daily balance or having a qualifying direct deposit. Please see our fee schedule for details."
    },
    {
        question: "How can I find my account and routing numbers?",
        answer: "You can find your account and routing numbers by signing into your online banking portal and selecting the desired account. They are also printed on the bottom of your checks."
    },
    {
        question: "How do I report a lost or stolen card?",
        answer: "If your card is lost or stolen, please contact us immediately at 1-800-LNB-HELP. You can also lock your card instantly through our mobile app or online banking to prevent unauthorized use."
    },
];


export default function HelpPage() {
  return (
    <div className="bg-background">
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
            <LifeBuoy className="h-16 w-16 mx-auto text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Help & Support</h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">We're here to help. Find answers to common questions or get in touch with our support team.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <h2 className="font-headline text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-headline text-lg text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full justify-start" variant="outline"><Phone className="mr-2 h-4 w-4"/> 1-800-LNB-HELP</Button>
                        <Button className="w-full justify-start" variant="outline"><Mail className="mr-2 h-4 w-4"/> Send a Secure Message</Button>
                        <Button className="w-full justify-start" variant="outline"><MessageCircle className="mr-2 h-4 w-4"/> Chat with SmartAssist</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Send a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <Input placeholder="Your Name" />
                            <Input type="email" placeholder="Your Email" />
                            <Textarea placeholder="Your message..." />
                            <Button className="w-full">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>
    </div>
  )
}
