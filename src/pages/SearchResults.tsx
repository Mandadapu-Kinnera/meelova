import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Calendar, ArrowLeft, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import banquetHall1 from "@/assets/banquet-hall-1.jpg";
import banquetHall2 from "@/assets/banquet-hall-2.jpg";
import weddingVenue1 from "@/assets/wedding-venue-1.jpg";
import catering1 from "@/assets/catering-1.jpg";
import weddingDecor1 from "@/assets/wedding-decor-1.jpg";
import partyCelebration from "@/assets/party-celebration.jpg";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  
  const location = searchParams.get("location") || "";
  const date = searchParams.get("date") || "";
  const category = searchParams.get("category") || "";

  const allVendors = [
    {
      id: 1,
      name: t('vendor.royalPalace'),
      rating: 4.9,
      location: t('location.gachibowli'),
      description: t('vendor.royalPalaceDesc'),
      image: banquetHall1,
      price: "₹50,000 - ₹1,50,000",
      category: "venue"
    },
    {
      id: 2,
      name: t('vendor.grandHeritage'),
      rating: 4.8,
      location: t('location.hiTechCity'),
      description: t('vendor.grandHeritageDesc'),
      image: banquetHall2,
      price: "₹75,000 - ₹2,00,000",
      category: "venue"
    },
    {
      id: 3,
      name: t('vendor.premiumGarden'),
      rating: 4.9,
      location: t('location.jubileeHills'),
      description: t('vendor.premiumGardenDesc'),
      image: weddingVenue1,
      price: "₹80,000 - ₹2,50,000",
      category: "venue"
    },
    {
      id: 4,
      name: language === 'hi' ? 'स्वादिष्ट खानपान सेवाएं' : language === 'te' ? 'రుచికరమైన క్యాటరింగ్ సేవలు' : 'Delicious Catering Services',
      rating: 4.6,
      location: t('location.banjaraHills'),
      description: language === 'hi' ? 'स्वादिष्ट भोजन' : language === 'te' ? 'రుచికరమైన ఆహారం' : 'Delicious food options',
      image: catering1,
      price: "₹45,000 - ₹1,00,000",
      category: "catering"
    },
    {
      id: 5,
      name: language === 'hi' ? 'एलीट सजावट स्टूडियो' : language === 'te' ? 'ఎలైట్ డెకర్ స్టూడియో' : 'Elite Decor Studio',
      rating: 4.9,
      location: t('location.gachibowli'),
      description: language === 'hi' ? 'सुंदर सजावट' : language === 'te' ? 'అందమైన అలంకరణ' : 'Beautiful decorations',
      image: weddingDecor1,
      price: "₹90,000 - ₹2,50,000",
      category: "decoration"
    },
    {
      id: 6,
      name: language === 'hi' ? 'बीट मास्टर्स डीजे' : language === 'te' ? 'బీట్ మాస్టర్స్ DJ' : 'Beat Masters DJ',
      rating: 4.7,
      location: t('location.hiTechCity'),
      description: language === 'hi' ? 'शानदार संगीत' : language === 'te' ? 'అద్భుతమైన సంగీతం' : 'Amazing music experience',
      image: partyCelebration,
      price: "₹35,000 - ₹80,000",
      category: "dj"
    },
  ];

  // Filter vendors based on search params
  const filteredVendors = allVendors.filter(vendor => {
    const matchLocation = !location || vendor.location.toLowerCase().includes(location.toLowerCase());
    const matchCategory = !category || vendor.category.toLowerCase().includes(category.toLowerCase());
    return matchLocation && matchCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        {/* Back Button & Search Summary */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{t('search.results')}</h1>
            <p className="text-muted-foreground">
              {location && `${t('search.location')}: ${location}`}
              {date && ` | ${t('search.dateTime')}: ${date}`}
              {category && ` | ${t('search.category')}: ${category}`}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            {t('search.filters')}
          </Button>
          <Button variant="outline">{t('vendorStats.venue')}</Button>
          <Button variant="outline">{t('vendorStats.catering')}</Button>
          <Button variant="outline">{t('vendorStats.decorator')}</Button>
          <Button variant="outline">{t('vendorStats.photography')}</Button>
          <Button variant="outline">{t('vendorStats.djMusic')}</Button>
        </div>

        {/* Results */}
        <p className="text-muted-foreground mb-4">
          {t('search.found')} {filteredVendors.length} {t('search.vendors')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{vendor.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{vendor.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{vendor.location}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{vendor.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">{vendor.price}</span>
                  <Link to="/login">
                    <Button size="sm">{t('vendors.viewDetails')}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">{t('search.noResults')}</p>
            <Link to="/">
              <Button className="mt-4">{t('search.backToHome')}</Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
