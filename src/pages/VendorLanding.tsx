import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Star, UserPlus, ImagePlus, IndianRupee, ShieldCheck, Package, MessageCircle, TrendingUp, LayoutDashboard, ChevronRight, Wallet, Smartphone, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import vendorHeroBanner from "@/assets/vendor-hero-banner.jpg";

const VendorLanding = () => {
  const { t } = useLanguage();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const serviceTypes = [
    t('vendor.venue'),
    t('vendor.djSound'),
    t('vendor.cateringService'),
    t('vendor.photography'),
    t('vendor.decorationService'),
    t('vendor.musicBand')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % serviceTypes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [serviceTypes.length]);

  const benefits = [
    { title: t('vendor.verifiedLeads'), description: t('vendor.verifiedLeadsDesc'), icon: CheckCircle2 },
    { title: t('vendor.instantPayments'), description: t('vendor.instantPaymentsDesc'), icon: IndianRupee },
    { title: t('vendor.smartDashboard'), description: t('vendor.smartDashboardDesc'), icon: LayoutDashboard },
    { title: t('vendor.growBusiness'), description: t('vendor.growBusinessDesc'), icon: TrendingUp },
    { title: t('vendor.clientChat'), description: t('vendor.clientChatDesc'), icon: MessageCircle },
  ];

  const steps = [
    { step: t('vendor.createAccount'), description: t('vendor.createAccountDesc'), icon: UserPlus },
    { step: t('vendor.addServiceDetails'), description: t('vendor.addServiceDetailsDesc'), icon: ImagePlus },
    { step: t('vendor.setPricing'), description: t('vendor.setPricingDesc'), icon: IndianRupee },
    { step: t('vendor.getVerified'), description: t('vendor.getVerifiedDesc'), icon: ShieldCheck },
    { step: t('vendor.startReceiving'), description: t('vendor.startReceivingDesc'), icon: Package },
  ];

  const paymentFeatures = [
    { title: t('vendor.instantPayouts'), desc: t('vendor.instantPayoutsDesc') },
    { title: t('vendor.earningDashboard'), desc: t('vendor.earningDashboardDesc') },
    { title: t('vendor.paymentsMadeEasy'), desc: t('vendor.paymentsMadeEasyDesc') },
    { title: t('vendor.automatedInvoicing'), desc: t('vendor.automatedInvoicingDesc') },
  ];

  const testimonials = [
    { name: t('vendor.testimonial1Name'), role: t('vendor.testimonial1Role'), text: t('vendor.testimonial1') },
    { name: t('vendor.testimonial2Name'), role: t('vendor.testimonial2Role'), text: t('vendor.testimonial2') },
    { name: t('vendor.testimonial3Name'), role: t('vendor.testimonial3Role'), text: t('vendor.testimonial3') },
  ];

  const faqs = [
    { question: t('vendor.faq1'), answer: t('vendor.faq1Answer') },
    { question: t('vendor.faq2'), answer: t('vendor.faq2Answer') },
    { question: t('vendor.faq3'), answer: t('vendor.faq3Answer') },
    { question: t('vendor.faq4'), answer: t('vendor.faq4Answer') },
    { question: t('vendor.faq5'), answer: t('vendor.faq5Answer') },
    { question: t('vendor.faq6'), answer: t('vendor.faq6Answer') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${vendorHeroBanner})` }} />
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                <span className="text-primary">{t('vendor.listYour')}</span><br />
                <span className="text-foreground transition-all duration-500">{serviceTypes[currentServiceIndex]}</span><br />
                <span className="text-primary">{t('vendor.onMeelova')}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">{t('vendor.tagline')}</p>
            </div>
            <Card className="bg-card shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">{t('vendor.registerFree')}</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span>{t('vendor.genuineLeads')}</span></div>
                  <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span>{t('vendor.securePayments')}</span></div>
                  <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /><span>{t('vendor.customerService')}</span></div>
                </div>
                <Button asChild className="w-full" size="lg"><Link to="/vendor-registration">{t('vendor.registerNow')}</Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t('vendor.whyPartner')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index}><CardContent className="p-6"><benefit.icon className="h-8 w-8 text-primary mb-4" /><h3 className="text-xl font-bold mb-2">{benefit.title}</h3><p className="text-muted-foreground">{benefit.description}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Enroll Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">{t('vendor.howToEnroll')}</h2>
          <p className="text-center text-muted-foreground mb-12">{t('vendor.getStartedSteps')}</p>
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative">
                <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center mb-4 border-2 border-primary/20"><step.icon className="h-10 w-10 text-primary" /></div>
                <h3 className="text-xl font-bold mb-2">{step.step}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < 4 && <ChevronRight className="h-8 w-8 text-muted-foreground/40 absolute -right-4 top-8 hidden lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payments Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">{t('vendor.securePaymentsTitle')}</h2>
          <p className="text-center text-muted-foreground mb-12">{t('vendor.securePaymentsSubtitle')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {paymentFeatures.map((item, index) => (
              <Card key={index}><CardContent className="p-6"><CheckCircle2 className="h-6 w-6 text-primary mb-3" /><h3 className="font-bold mb-2">{item.title}</h3><p className="text-sm text-muted-foreground">{item.desc}</p></CardContent></Card>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-6">{t('vendor.supportedPayments')}</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
                <span className="text-lg font-semibold">{t('vendor.cashfree')}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <span className="text-lg font-semibold">{t('vendor.upi')}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <span className="text-lg font-semibold">{t('vendor.cards')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t('vendor.whatVendorsSay')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}><CardContent className="p-6"><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}</div><p className="text-muted-foreground mb-4">{testimonial.text}</p><div><p className="font-bold">{testimonial.name}</p><p className="text-sm text-muted-foreground">{testimonial.role}</p></div></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">{t('vendor.faqTitle')}</h2>
          <p className="text-center text-muted-foreground mb-12">{t('vendor.faqSubtitle')}</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}><CardContent className="p-6"><p className="font-semibold mb-2 text-lg">{faq.question}</p><p className="text-muted-foreground">{faq.answer}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Size Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t('vendor.marketSize')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center"><CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-4" /><p className="text-4xl font-bold mb-2">$5.8B+</p><p className="text-muted-foreground">{t('vendor.marketValue')}</p></div>
            <div className="text-center"><CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-4" /><p className="text-4xl font-bold mb-2">1 Lakh+</p><p className="text-muted-foreground">{t('vendor.eventsPerDay')}</p></div>
            <div className="text-center"><CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-4" /><p className="text-4xl font-bold mb-2">11.2%</p><p className="text-muted-foreground">{t('vendor.projected')}</p></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('nav.meelova')}</h3>
              <p className="text-muted-foreground mb-4">{t('vendor.footerTagline')}</p>
              <div className="space-y-2"><p className="font-semibold">{t('vendor.contactUs')}</p><p className="text-muted-foreground">+91 9849957728</p><p className="text-muted-foreground">info@meelova.in</p></div>
            </div>
            <Card><CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">{t('vendor.registerFree')}</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /><span>{t('vendor.genuineLeads')}</span></div>
                <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /><span>{t('vendor.securePayments')}</span></div>
                <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /><span>{t('vendor.customerService')}</span></div>
              </div>
              <Button asChild className="w-full"><Link to="/vendor-registration">{t('vendor.registerNow')}</Link></Button>
            </CardContent></Card>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-8 border-t"><p>{t('vendor.copyright')}</p></div>
        </div>
      </footer>
    </div>
  );
};

export default VendorLanding;