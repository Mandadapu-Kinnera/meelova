import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Star, MapPin, UserPlus, Search, Calendar as CalendarIcon, Check, PartyPopper, Building2, Sparkles, Camera, Music, Palette, UtensilsCrossed, X, Grid3x3, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import banquetHall1 from "@/assets/banquet-hall-1.jpg";
import banquetHall2 from "@/assets/banquet-hall-2.jpg";
import weddingVenue1 from "@/assets/wedding-venue-1.jpg";
import eventWedding from "@/assets/event-wedding.jpg";
import eventBirthday from "@/assets/event-birthday.jpg";
import eventReception from "@/assets/event-reception.jpg";
import eventHousewarming from "@/assets/event-housewarming.jpg";
import eventEngagement from "@/assets/event-engagement.jpg";
import eventCorporate from "@/assets/event-corporate.jpg";

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showEventDetails, setShowEventDetails] = React.useState(false);
  const [selectedVendor, setSelectedVendor] = React.useState<any>(null);
  const [showVendorDetails, setShowVendorDetails] = React.useState(false);
  
  // Search form state
  const [searchLocation, setSearchLocation] = React.useState("");
  const [searchDate, setSearchDate] = React.useState<Date | undefined>(undefined);
  const [searchTime, setSearchTime] = React.useState("");
  const [searchCategory, setSearchCategory] = React.useState("");
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.append("location", searchLocation);
    if (searchDate) params.append("date", format(searchDate, "PPP"));
    if (searchTime) params.append("time", searchTime);
    if (searchCategory) params.append("category", searchCategory);
    navigate(`/search?${params.toString()}`);
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const getEventSlug = (eventName: string) => {
    const slugMap: Record<string, string> = {
      [t('events.wedding')]: 'wedding',
      [t('events.birthday')]: 'birthday',
      [t('events.reception')]: 'reception',
      [t('events.houseWarming')]: 'housewarming',
      [t('events.engagement')]: 'engagement',
      [t('events.corporate')]: 'corporate'
    };
    return slugMap[eventName] || 'wedding';
  };
  
  const eventTypes = [
    { name: t('events.wedding'), image: eventWedding, slug: 'wedding' },
    { name: t('events.birthday'), image: eventBirthday, slug: 'birthday' },
    { name: t('events.reception'), image: eventReception, slug: 'reception' },
    { name: t('events.houseWarming'), image: eventHousewarming, slug: 'housewarming' },
    { name: t('events.engagement'), image: eventEngagement, slug: 'engagement' },
    { name: t('events.corporate'), image: eventCorporate, slug: 'corporate' }
  ];

  const featuredVendors = [
    {
      id: 1,
      name: t('vendor.royalPalace'),
      rating: 4.9,
      description: t('vendor.royalPalaceDesc'),
      fullDescription: t('vendor.royalPalaceFull'),
      image: banquetHall1,
      location: t('location.gachibowli'),
      services: [t('vendor.weddingVenue'), t('vendor.receptionHall'), t('vendor.corporateEvents')],
      capacity: "500+ " + t('customerDash.guests'),
      price: "₹1,50,000 - ₹3,00,000",
      amenities: [t('vendor.centralAc'), t('vendor.ledLighting'), t('vendor.soundSystem'), t('vendor.parkingAvailable'), t('vendor.cateringAvailable')]
    },
    {
      id: 2,
      name: t('vendor.grandHeritage'),
      rating: 4.9,
      description: t('vendor.grandHeritageDesc'),
      fullDescription: t('vendor.grandHeritageFull'),
      image: banquetHall2,
      location: t('location.gachibowli'),
      services: [t('vendor.weddingService'), t('vendor.engagementService'), t('vendor.receptionService')],
      capacity: "300+ " + t('customerDash.guests'),
      price: "₹1,00,000 - ₹2,50,000",
      amenities: [t('vendor.gardenArea'), t('vendor.decorativeLighting'), t('vendor.inHouseCatering'), t('vendor.valetParking'), t('vendor.bridalRoom')]
    },
    {
      id: 3,
      name: t('vendor.premiumGarden'),
      rating: 4.9,
      description: t('vendor.premiumGardenDesc'),
      fullDescription: t('vendor.premiumGardenFull'),
      image: weddingVenue1,
      location: t('location.gachibowli'),
      services: [t('vendor.outdoorEvents'), t('vendor.gardenWeddings'), t('vendor.birthdayParties')],
      capacity: "400+ " + t('customerDash.guests'),
      price: "₹80,000 - ₹2,00,000",
      amenities: [t('vendor.landscapedGarden'), t('vendor.outdoorLighting'), t('vendor.gazebo'), t('vendor.amplePar'), t('vendor.flexibleCatering')]
    },
  ];

  const vendorCategories = [
    { name: t('vendorStats.venue'), count: "190+", icon: Building2 },
    { name: t('vendorStats.decorator'), count: "180+", icon: Sparkles },
    { name: t('vendorStats.photography'), count: "170+", icon: Camera },
    { name: t('vendorStats.djMusic'), count: "160+", icon: Music },
    { name: t('vendorStats.makeup'), count: "150+", icon: Palette },
    { name: t('vendorStats.catering'), count: "190+", icon: UtensilsCrossed },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white space-y-6 px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold">{t('hero.title')}</h1>
          <p className="text-xl md:text-2xl">{t('hero.subtitle')}</p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row gap-2 items-center max-w-4xl mx-auto mt-8">
            <div className="flex items-center gap-2 px-4 py-2 flex-1 w-full md:w-auto">
              <MapPin className="h-5 w-5 text-primary" />
              <input 
                type="text" 
                placeholder={t('search.location')}
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="outline-none text-foreground w-full"
              />
            </div>
            <div className="hidden md:block h-8 w-px bg-border"></div>
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 px-4 py-2 flex-1 w-full md:w-auto cursor-pointer hover:bg-muted/50 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span className={cn("text-foreground", !searchDate && "text-muted-foreground")}>
                    {searchDate ? format(searchDate, "PPP") : t('search.selectDate')}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={searchDate}
                  onSelect={setSearchDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <div className="hidden md:block h-8 w-px bg-border"></div>
            {/* Time Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 px-4 py-2 flex-1 w-full md:w-auto cursor-pointer hover:bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className={cn("text-foreground", !searchTime && "text-muted-foreground")}>
                    {searchTime || t('search.selectTime')}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="start">
                <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={searchTime === time ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSearchTime(time)}
                      className="text-xs"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <div className="hidden md:block h-8 w-px bg-border"></div>
            <div className="flex items-center gap-2 px-4 py-2 flex-1 w-full md:w-auto">
              <Grid3x3 className="h-5 w-5 text-primary" />
              <input 
                type="text" 
                placeholder={t('search.topCategories')}
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="outline-none text-foreground w-full"
              />
            </div>
            <Button size="lg" className="rounded-full px-8 w-full md:w-auto" onClick={handleSearch}>
              <Search className="h-5 w-5 mr-2" />
              {t('search.button')}
            </Button>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Link to="/login">
              <Button size="lg" className="text-lg">
                {t('hero.getStarted')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Meelova Section */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('whyMeelova.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('whyMeelova.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('whyMeelova.easyDiscovery')}</h3>
              <p className="text-muted-foreground">
                {t('whyMeelova.easyDiscoveryDesc')}
              </p>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('whyMeelova.trustedPartners')}</h3>
              <p className="text-muted-foreground">
                {t('whyMeelova.trustedPartnersDesc')}
              </p>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('whyMeelova.seamlessBooking')}</h3>
              <p className="text-muted-foreground">
                {t('whyMeelova.seamlessBookingDesc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Steps of Process */}
      <section className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-12">{t('steps.title')}</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-4">
              <UserPlus className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t('steps.signUp')}</h3>
            <p className="text-muted-foreground">{t('steps.signUpDesc')}</p>
          </div>
          
          <div className="hidden md:block text-4xl font-bold">→</div>
          
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t('steps.discover')}</h3>
            <p className="text-muted-foreground">{t('steps.discoverDesc')}</p>
          </div>
          
          <div className="hidden md:block text-4xl font-bold">→</div>
          
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-4">
              <CalendarIcon className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t('steps.findService')}</h3>
            <p className="text-muted-foreground">{t('steps.findServiceDesc')}</p>
          </div>
          
          <div className="hidden md:block text-4xl font-bold">→</div>
          
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-4">
              <Check className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t('steps.confirm')}</h3>
            <p className="text-muted-foreground">{t('steps.confirmDesc')}</p>
          </div>
          
          <div className="hidden md:block text-4xl font-bold">→</div>
          
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center mb-4">
              <PartyPopper className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{t('steps.enjoy')}</h3>
            <p className="text-muted-foreground">{t('steps.enjoyDesc')}</p>
          </div>
        </div>
      </section>

      {/* Vendor Statistics */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">{t('vendorStats.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {vendorCategories.map((category) => (
              <div
                key={category.name}
                className="group bg-card p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-1 text-foreground">{category.count}</div>
                <div className="h-1 w-16 bg-primary mx-auto mb-2 rounded-full"></div>
                <div className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">{t('events.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {eventTypes.map((event) => (
            <Card 
              key={event.name} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => navigate(`/event/${event.slug}`)}
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-foreground">{event.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => setShowEventDetails(true)}
            className="min-w-[200px]"
          >
            {t('events.viewDetails')}
          </Button>
        </div>
      </section>

      {/* Event Details Dialog */}
      {showEventDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEventDetails(false)}>
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">{t('events.allEventTypes')}</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowEventDetails(false)}>
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {eventTypes.map((event) => (
                  <Card key={event.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">{event.name}</h3>
                      <p className="text-muted-foreground mb-4">
                        {t('events.browseVendors').replace('{event}', event.name.toLowerCase())}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-primary/10 border-2 border-primary rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">{t('events.readyToBook')}</h3>
                <p className="text-lg mb-6 text-muted-foreground">
                  {t('events.loginToAccess')}
                </p>
                <Link to="/login">
                  <Button size="lg" className="min-w-[200px]">
                    {t('events.loginToBookServices')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vendor Details Dialog */}
      {selectedVendor && (
        <div 
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${showVendorDetails ? 'block' : 'hidden'}`}
          onClick={() => setShowVendorDetails(false)}
        >
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold">{selectedVendor.name}</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowVendorDetails(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">{t('vendors.close')}</span>
                </Button>
              </div>
              
              <img 
                src={selectedVendor.image} 
                alt={selectedVendor.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">({selectedVendor.rating})</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-red-500" />
                    {selectedVendor.location}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('vendors.about')}</h3>
                  <p className="text-muted-foreground">{selectedVendor.fullDescription}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('vendors.servicesOffered')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.services.map((service: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">{t('vendors.capacity')}</h3>
                    <p className="text-muted-foreground">{selectedVendor.capacity}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{t('vendors.priceRange')}</h3>
                    <p className="text-muted-foreground">{selectedVendor.price}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('vendors.amenities')}</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedVendor.amenities.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-center text-muted-foreground mb-4">
                    {t('vendors.loginPrompt')}
                  </p>
                  <Link to="/login" className="block">
                    <Button className="w-full" size="lg">
                      {t('vendors.loginToBook')}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Featured Vendors */}
      <section className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{t('vendors.title')}</h2>
          <Button variant="link" className="text-primary">{t('vendors.viewAll')}</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVendors.map((vendor) => (
            <Card key={vendor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={vendor.image} 
                alt={vendor.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{vendor.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">({vendor.rating})</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 text-red-500" />
                  {vendor.location}
                </div>
                <p className="text-muted-foreground mb-4">{vendor.description}</p>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setSelectedVendor(vendor);
                    setShowVendorDetails(true);
                  }}
                >
                  {t('vendors.viewDetails')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
