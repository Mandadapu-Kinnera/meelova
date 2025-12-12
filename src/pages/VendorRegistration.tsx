import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Upload, User, FileText, Image as ImageIcon, IndianRupee, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

const VendorRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const steps = [
    { number: 1, title: t('vendorReg.profile'), icon: User },
    { number: 2, title: t('vendorReg.documents'), icon: FileText },
    { number: 3, title: t('vendorReg.portfolio'), icon: ImageIcon },
    { number: 4, title: t('vendorReg.pricing'), icon: IndianRupee },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    toast({
      title: t('vendorReg.registrationComplete'),
      description: t('vendorReg.registrationSuccess'),
    });
    navigate("/vendor-dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('vendorReg.title')}</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        isCompleted || isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="h-8 w-8 text-primary -mt-6" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t('vendorReg.step')} {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Profile */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">{t('vendorReg.businessName')} *</Label>
                  <Input id="business-name" placeholder={t('vendorReg.businessName')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner-name">{t('vendorReg.ownerName')} *</Label>
                  <Input id="owner-name" placeholder={t('vendorReg.ownerName')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('signup.email')} *</Label>
                  <Input id="email" type="email" placeholder="business@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('vendorReg.phone')} *</Label>
                  <Input id="phone" type="tel" placeholder="+91 98499 57728" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">{t('vendorReg.category')} *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('vendorReg.category')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding-hall">Wedding Hall</SelectItem>
                      <SelectItem value="banquet-hall">Banquet Hall</SelectItem>
                      <SelectItem value="catering">Catering Service</SelectItem>
                      <SelectItem value="music">Music & DJ</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="decoration">Decoration</SelectItem>
                      <SelectItem value="seminar-hall">Seminar Hall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{t('vendorReg.address')} *</Label>
                  <Textarea id="address" placeholder={t('vendorReg.address')} rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('vendorReg.description')} *</Label>
                  <Textarea id="description" placeholder={t('vendorReg.description')} rows={4} />
                </div>
              </div>
            )}

            {/* Step 2: Documents */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pan">{t('vendorReg.panCard')} *</Label>
                  <Input id="pan" type="file" accept="image/*,.pdf" />
                  <p className="text-sm text-muted-foreground">{t('vendorReg.uploadPan')}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaar">{t('vendorReg.aadhaarCard')} *</Label>
                  <Input id="aadhaar" type="file" accept="image/*,.pdf" />
                  <p className="text-sm text-muted-foreground">{t('vendorReg.uploadAadhaar')}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gst">{t('vendorReg.gstCertificate')}</Label>
                  <Input id="gst" type="file" accept="image/*,.pdf" />
                  <p className="text-sm text-muted-foreground">{t('vendorReg.uploadGst')}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-license">{t('vendorReg.businessLicense')}</Label>
                  <Input id="business-license" type="file" accept="image/*,.pdf" />
                  <p className="text-sm text-muted-foreground">{t('vendorReg.uploadBusinessDoc')}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-details">{t('vendorReg.bankProof')} *</Label>
                  <Input id="bank-details" type="file" accept="image/*,.pdf" />
                  <p className="text-sm text-muted-foreground">{t('vendorReg.uploadBankProof')}</p>
                </div>
              </div>
            )}

            {/* Step 3: Portfolio */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="work-images">{t('vendorReg.workImages')} *</Label>
                  <Input id="work-images" type="file" accept="image/*" multiple />
                  <p className="text-sm text-muted-foreground">
                    {t('vendorReg.uploadWorkImages')}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificates">{t('vendorReg.certificates')}</Label>
                  <Input id="certificates" type="file" accept="image/*,.pdf" multiple />
                  <p className="text-sm text-muted-foreground">{t('vendorReg.uploadCertificates')}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-history">{t('vendorReg.workHistory')}</Label>
                  <Textarea
                    id="work-history"
                    placeholder={t('vendorReg.workHistoryPlaceholder')}
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="social-media">{t('vendorReg.socialMedia')}</Label>
                  <Input id="instagram" placeholder={t('vendorReg.instagramPlaceholder')} className="mb-2" />
                  <Input id="facebook" placeholder={t('vendorReg.facebookPlaceholder')} className="mb-2" />
                  <Input id="website" placeholder={t('vendorReg.websitePlaceholder')} />
                </div>
              </div>
            )}

            {/* Step 4: Pricing */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service-name">{t('vendorReg.serviceName')} *</Label>
                  <Input id="service-name" placeholder={t('vendorReg.serviceNamePlaceholder')} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="base-price">{t('vendorReg.basePrice')} *</Label>
                    <Input id="base-price" type="number" placeholder={t('vendorReg.basePricePlaceholder')} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">{t('vendorReg.capacity')}</Label>
                    <Input id="capacity" type="number" placeholder={t('vendorReg.capacityPlaceholder')} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricing-description">{t('vendorReg.pricingDescription')} *</Label>
                  <Textarea
                    id="pricing-description"
                    placeholder={t('vendorReg.pricingDescPlaceholder')}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="advance-payment">{t('vendorReg.advancePayment')} *</Label>
                  <Input id="advance-payment" type="number" placeholder={t('vendorReg.advancePaymentPlaceholder')} />
                  <p className="text-sm text-muted-foreground">{t('vendorReg.advancePaymentHelper')}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancellation">{t('vendorReg.cancellationPolicy')} *</Label>
                  <Textarea
                    id="cancellation"
                    placeholder={t('vendorReg.cancellationPlaceholder')}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">{t('vendorReg.availability')}</Label>
                  <Textarea
                    id="availability"
                    placeholder={t('vendorReg.availabilityPlaceholder')}
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                {t('vendorReg.previous')}
              </Button>
              {currentStep < 4 ? (
                <Button onClick={handleNext}>{t('vendorReg.next')}</Button>
              ) : (
                <Button onClick={handleComplete}>{t('vendorReg.goToDashboard')}</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorRegistration;
