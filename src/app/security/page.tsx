import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, UserCheck, Lock, Bell, Settings, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SecurityPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://www2.bac-assets.com/security-center/spa-assets/images/assets-images-site-security-center-carousel-engagement-area-banner-desktop-CSX3847edbf.webp"
            alt="Security background"
            data-ai-hint="security background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ShieldCheck className="h-16 w-16 mx-auto" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Security Center</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Learn how we help protect you and how you can help protect yourself.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <Alert variant="destructive" className="mb-12 bg-destructive/10 border-destructive/50 text-destructive [&>svg]:text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="font-headline">There’s a new scam targeting customers.</AlertTitle>
          <AlertDescription>
            <Link href="#" className="underline font-semibold">Learn how to help protect your money.</Link>
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> How we help protect you</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Think you have experienced fraud?</p>
                <Button className="w-full" asChild>
                  <Link href="/help">Report Now</Link>
                </Button>
                <Button variant="link" className="px-0 text-sm h-auto py-0 text-left leading-snug">Resources for Parents, Caregivers, and Businesses</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2"><UserCheck className="h-5 w-5 text-primary" /> How to help protect yourself</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <p className="text-sm text-muted-foreground">Help protect your money. Pause, verify, help prevent scams.</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/security">Check out our Fraud Checklist</Link>
                </Button>
                <Button variant="link" className="px-0 text-sm">Help prevent Identity theft</Button>
              </CardContent>
            </Card>

             <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="font-headline text-lg">Our Online & Mobile Security Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">You’re never liable for unauthorized purchases or transactions—as long as they’re reported promptly.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> Take your security to the next level</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Log in to manage your security settings.</p>
                <Button className="w-full" asChild>
                  <Link href="/dashboard">Log in and manage your security</Link>
                </Button>
                 <Button variant="link" className="px-0 text-sm">Learn more about managing your security</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Set your privacy choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">You control how we market to you and share your information.</p>
                <Button className="w-full" asChild>
                  <Link href="/security">Set your privacy choices now</Link>
                </Button>
                <Button variant="link" className="px-0 text-sm">Opt back in to promotional emails</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Manage Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Know when irregular card activity or changes take place on your account.</p>
                <Button className="w-full mt-3" asChild>
                  <Link href="/dashboard">Log in and manage your alerts</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Privacy Notice */}
          <main className="lg:col-span-2">
            <div className="space-y-6 text-foreground/90">
                <h2 className="font-headline text-3xl font-bold border-b pb-2">U.S. Online Privacy Notice</h2>
                <p className="text-sm text-muted-foreground">Last updated June 2025</p>
                <p className="text-sm leading-relaxed">
                    Your privacy is important to us. We conduct regular assessment reviews and abide by rigorous privacy standards to ensure personal information we collect, use and share is protected. This U.S. Online Privacy Notice ("Notice") describes how Bank of America and our affiliates manage personal information about you when you interact with us online through our websites, event registration sites, mobile applications and social sites ("Sites and Mobile Apps") through your computer, smartphone, tablet or other mobile devices ("computer or mobile devices").
                </p>
                <p className="text-sm leading-relaxed">
                    This Notice explains:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                    <li>How we collect personal information when you visit, use or interact with us online, and through our ads displayed through online services operated by us or non-affiliated third parties.</li>
                    <li>How we may use or share personal information collected to deliver products and services to you and for advertising or event management purposes.</li>
                </ul>
                <p className="text-sm leading-relaxed">
                    The term "Bank of America" or "we", "us" or "our" in this Notice refers to banking and non-banking U.S. affiliates or subsidiaries of Bank of America Corporation that link to or reference this Notice.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button variant="outline" asChild><Link href="/security"><FileText className="mr-2" /> Download English (PDF)</Link></Button>
                    <Button variant="outline" asChild><Link href="/security"><FileText className="mr-2" /> Download Spanish (PDF)</Link></Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-headline text-lg text-left">Our Online Privacy Practices</AccordionTrigger>
                        <AccordionContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                           <p>We are committed to transparency about your personal information. We ask for your consent when required, otherwise by using our Site and Mobile Apps, you consent to the collection, use and sharing of your personal information subject to and consistent with applicable laws, regulations and other notices you may have received based on your relationship with us.</p>
                           <h4 className="font-bold text-base mt-4 text-foreground">Linking to other sites</h4>
                           <p>We may provide links to non-affiliated third-party sites, such as credit bureaus, service providers or merchants. If you follow links to sites not affiliated with, or controlled by Bank of America, you should review their privacy and security policies and other terms and conditions, as they may be different from those of our Sites and Mobile Apps. Bank of America does not guarantee and is not responsible for the privacy or security of these sites, including the accuracy, completeness or reliability of their information.</p>
                           <h4 className="font-bold text-base mt-4 text-foreground">Protecting your personal information</h4>
                           <p>To protect personal information from unauthorized access and use, we use security measures that comply with applicable federal and state laws. These measures may include device safeguards and secured files and buildings as well as oversight of our third-party providers to ensure personal information remains confidential and secure. In the event of a data breach, we provide timely notification, in accordance with applicable laws and regulations.</p>
                           <p>We recognize the importance of protecting privacy where children are involved. Our Sites and Mobile Apps are not marketed to individuals under the age of 13. Read our Children's Privacy Policy for more information.</p>
                           <h4 className="font-bold text-base mt-4 text-foreground">Making sure personal information is accurate</h4>
                           <p>Keeping your personal information accurate and up to date is very important. If your personal information is incomplete, inaccurate or not current, please use the Contact Us option on our Sites and Mobile Apps, or call or write to us at the telephone numbers or appropriate address for changes listed on your account statements, records, online or other account materials. You can also speak to a customer representative at a financial center, your Financial Advisor or account representative.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-headline text-lg text-left">Personal Information We Collect Online</AccordionTrigger>
                        <AccordionContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                           <h4 className="font-bold text-base mt-4 text-foreground">How do we collect personal information online?</h4>
                           <p>We collect personal information about you through your computer or mobile devices by the use of cookies and similar tracking technologies as well as personal information you provide when you visit or use our Sites and Mobile Apps, for example when you apply for an account, register for a product or service, or complete a survey.</p>
                           <h4 className="font-bold text-base mt-4 text-foreground">Types of personal information we collect online</h4>
                           <p>The type of personal information we collect from and about you online will depend on how you interact with us and may include:</p>
                           <ul className="list-disc pl-5 space-y-2">
                               <li>Contact Information such as name, mailing address, email address, telephone and mobile number(s).</li>
                               <li>Account Application information such as credit and income information.</li>
                               <li>Identifiers such as Social Security number, account number(s), driver's license number (or comparable).</li>
                               <li>Access Authorization such as user ID, PIN and password and security questions.</li>
                               <li>Documents or images submitted via our Site or Mobile Apps to support account opening.</li>
                               <li>Debit/Credit Card Information.</li>
                               <li>Information from your computer and mobile devices where allowed by individual browsers and/or operating systems.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-headline text-lg text-left">How We Use and Share Personal Information</AccordionTrigger>
                        <AccordionContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                           <h4 className="font-bold text-base mt-4 text-foreground">How do we use your personal information?</h4>
                           <p>Personal information collected from and about you online described in this Notice may be used for many purposes such as:</p>
                           <ul className="list-disc pl-5 space-y-2">
                               <li>Delivering products and services to you by verifying your identity.</li>
                               <li>Personalizing your digital and mobile experience.</li>
                               <li>Providing advertising on our Sites and Mobile Apps as well as non-affiliated third-party sites.</li>
                               <li>Detecting and preventing fraud, identify theft and other risks.</li>
                               <li>Performing analytics concerning your use of our online services.</li>
                               <li>Complying with and enforcing applicable legal requirements.</li>
                           </ul>
                           <h4 className="font-bold text-base mt-4 text-foreground">With whom do we share your personal information?</h4>
                           <p>We may share the personal information we collect from and about you online described in this Notice with:</p>
                           <ul className="list-disc pl-5 space-y-2">
                               <li>Affiliates and Subsidiaries of Bank of America.</li>
                               <li>Third-Party Providers who have contracts with Bank of America.</li>
                               <li>Government Agencies as required by laws and regulations.</li>
                           </ul>
                           <p>You have choices regarding the sharing of some personal information. You can register your choices online at Control How We Can Share Your Data and Market To You.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-headline text-lg text-left">Online Behavioral Advertising</AccordionTrigger>
                        <AccordionContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                            <p>Personal information collected from and about you through our Sites and Mobile Apps is used and shared to deliver advertising and marketing, including prescreened offers of credit, which may be of interest to you.</p>
                            <h4 className="font-bold text-base mt-4 text-foreground">How we tailor ads to you</h4>
                            <p>We present tailored ads to you on our Sites and Mobile Apps, in off-line channels, and on third-party sites. We may use personal information about your activities and your relationship with us to help determine which advertisements or offers to present to you.</p>
                            <h4 className="font-bold text-base mt-4 text-foreground">How you can opt out of Online Behavioral Advertising</h4>
                            <p>You can opt out of interest-based advertising with non-affiliated third-party sites by visiting YourAdChoices.com or the Network Advertising Initiative's Opt-Out Tool. Please note that if you opt out, you may still receive general advertising from us.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-5">
                        <AccordionTrigger className="font-headline text-lg text-left">Additional Information</AccordionTrigger>
                        <AccordionContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                            <h4 className="font-bold text-base mt-4 text-foreground">Third-Party Data Sharing</h4>
                            <p>Some companies may offer aggregation websites and services that allow you to share your data with them. To do this, a third-party may request you to authorize access to your accounts by providing your User ID and password. You should use caution and ensure that the third-party has appropriate policies and practices to protect the privacy and security of any personal information you provide. We are not responsible for the use or disclosure of any personal information accessed by any company to whom you provide your site user ID and password.</p>
                            <h4 className="font-bold text-base mt-4 text-foreground">Social Media</h4>
                            <p>We engage with customers on social media platforms. Any content you post on our official social media pages is subject to the Terms of Use and Privacy Policies of those respective platforms. We may allow social share buttons on our sites that enable users to easily share information on social media platforms.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
