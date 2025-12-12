import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, ArrowLeft, Calendar, Users, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import banquetHall1 from "@/assets/banquet-hall-1.jpg";
import banquetHall2 from "@/assets/banquet-hall-2.jpg";
import weddingVenue1 from "@/assets/wedding-venue-1.jpg";
import catering1 from "@/assets/catering-1.jpg";
import weddingDecor1 from "@/assets/wedding-decor-1.jpg";
import partyCelebration from "@/assets/party-celebration.jpg";
import eventWedding from "@/assets/event-wedding.jpg";
import eventBirthday from "@/assets/event-birthday.jpg";
import eventReception from "@/assets/event-reception.jpg";
import eventHousewarming from "@/assets/event-housewarming.jpg";
import eventEngagement from "@/assets/event-engagement.jpg";
import eventCorporate from "@/assets/event-corporate.jpg";

const EventDetails = () => {
  const { eventType } = useParams();
  const { t, language } = useLanguage();

  const relatedVendors = [
    { id: 1, name: t('vendor.royalPalace'), rating: 4.9, location: t('location.gachibowli'), price: "₹50,000+", image: banquetHall1 },
    { id: 2, name: t('vendor.grandHeritage'), rating: 4.8, location: t('location.hiTechCity'), price: "₹75,000+", image: banquetHall2 },
    { id: 3, name: t('vendor.premiumGarden'), rating: 4.9, location: t('location.jubileeHills'), price: "₹80,000+", image: weddingVenue1 },
  ];

  const eventData: Record<string, {
    name: string;
    image: string;
    description: string;
    features: string[];
    vendors: typeof relatedVendors;
  }> = {
    wedding: {
      name: t('events.wedding'),
      image: eventWedding,
      description: language === 'hi' 
        ? 'अपनी शादी को यादगार बनाएं हमारे विश्वसनीय विक्रेताओं के साथ। वेन्यू, कैटरिंग, डेकोरेशन और बहुत कुछ।'
        : language === 'te'
        ? 'మీ వివాహాన్ని మరపురానిదిగా చేయండి మా విశ్వసనీయ విక్రేతలతో. వేదిక, క్యాటరింగ్, అలంకరణ మరియు మరిన్ని.'
        : 'Make your wedding memorable with our trusted vendors. Venue, catering, decoration and much more.',
      features: [
        language === 'hi' ? 'बैंक्वेट हॉल और गार्डन वेन्यू' : language === 'te' ? 'బ్యాంక్వెట్ హాల్ మరియు గార్డెన్ వేదికలు' : 'Banquet halls and garden venues',
        language === 'hi' ? 'प्रोफेशनल कैटरिंग सेवाएं' : language === 'te' ? 'ప్రొఫెషనల్ క్యాటరింగ్ సేవలు' : 'Professional catering services',
        language === 'hi' ? 'सुंदर सजावट और फूल' : language === 'te' ? 'అందమైన అలంకరణ మరియు పుష్పాలు' : 'Beautiful decoration and flowers',
        language === 'hi' ? 'फोटोग्राफी और वीडियोग्राफी' : language === 'te' ? 'ఫోటోగ్రఫీ మరియు వీడియోగ్రఫీ' : 'Photography and videography',
        language === 'hi' ? 'डीजे और संगीत' : language === 'te' ? 'DJ మరియు సంగీతం' : 'DJ and music'
      ],
      vendors: relatedVendors
    },
    birthday: {
      name: t('events.birthday'),
      image: eventBirthday,
      description: language === 'hi'
        ? 'जन्मदिन की पार्टी को खास बनाएं। थीम डेकोरेशन, केक, एंटरटेनमेंट और बहुत कुछ।'
        : language === 'te'
        ? 'పుట్టినరోజు పార్టీని ప్రత్యేకంగా చేయండి. థీమ్ డెకరేషన్, కేక్, వినోదం మరియు మరిన్ని.'
        : 'Make birthday party special. Theme decoration, cake, entertainment and much more.',
      features: [
        language === 'hi' ? 'थीम आधारित सजावट' : language === 'te' ? 'థీమ్ ఆధారిత అలంకరణ' : 'Theme based decoration',
        language === 'hi' ? 'कस्टम केक और डेज़र्ट' : language === 'te' ? 'కస్టమ్ కేక్ మరియు డెజర్ట్' : 'Custom cake and desserts',
        language === 'hi' ? 'गेम्स और एंटरटेनमेंट' : language === 'te' ? 'గేమ్స్ మరియు వినోదం' : 'Games and entertainment',
        language === 'hi' ? 'फोटो बूथ' : language === 'te' ? 'ఫోటో బూత్' : 'Photo booth',
        language === 'hi' ? 'रिटर्न गिफ्ट्स' : language === 'te' ? 'రిటర్న్ గిఫ్ట్స్' : 'Return gifts'
      ],
      vendors: relatedVendors
    },
    reception: {
      name: t('events.reception'),
      image: eventReception,
      description: language === 'hi'
        ? 'शानदार रिसेप्शन के लिए सभी सेवाएं। ग्रैंड वेन्यू, कैटरिंग और एंटरटेनमेंट।'
        : language === 'te'
        ? 'అద్భుతమైన రిసెప్షన్ కోసం అన్ని సేవలు. గ్రాండ్ వేదిక, క్యాటరింగ్ మరియు వినోదం.'
        : 'All services for grand reception. Grand venue, catering and entertainment.',
      features: [
        language === 'hi' ? 'ग्रैंड बैंक्वेट हॉल' : language === 'te' ? 'గ్రాండ్ బ్యాంక్వెట్ హాల్' : 'Grand banquet halls',
        language === 'hi' ? 'प्रीमियम कैटरिंग' : language === 'te' ? 'ప్రీమియం క్యాటరింగ్' : 'Premium catering',
        language === 'hi' ? 'स्टेज सेटअप' : language === 'te' ? 'స్టేజ్ సెటప్' : 'Stage setup',
        language === 'hi' ? 'लाइटिंग और साउंड' : language === 'te' ? 'లైటింగ్ మరియు సౌండ్' : 'Lighting and sound',
        language === 'hi' ? 'वैलेट पार्किंग' : language === 'te' ? 'వాలెట్ పార్కింగ్' : 'Valet parking'
      ],
      vendors: relatedVendors
    },
    housewarming: {
      name: t('events.houseWarming'),
      image: eventHousewarming,
      description: language === 'hi'
        ? 'गृह प्रवेश को शुभ और यादगार बनाएं। पूजा व्यवस्था, कैटरिंग और सजावट।'
        : language === 'te'
        ? 'గృహ ప్రవేశాన్ని శుభంగా మరియు మరపురానిదిగా చేయండి. పూజా ఏర్పాట్లు, క్యాటరింగ్ మరియు అలంకరణ.'
        : 'Make housewarming auspicious and memorable. Pooja arrangements, catering and decoration.',
      features: [
        language === 'hi' ? 'पूजा व्यवस्था' : language === 'te' ? 'పూజా ఏర్పాట్లు' : 'Pooja arrangements',
        language === 'hi' ? 'पारंपरिक सजावट' : language === 'te' ? 'సాంప్రదాయ అలంకరణ' : 'Traditional decoration',
        language === 'hi' ? 'शाकाहारी कैटरिंग' : language === 'te' ? 'శాఖాహార క్యాటరింగ్' : 'Vegetarian catering',
        language === 'hi' ? 'फूल और माला' : language === 'te' ? 'పుష్పాలు మరియు మాలలు' : 'Flowers and garlands',
        language === 'hi' ? 'संगीत व्यवस्था' : language === 'te' ? 'సంగీత ఏర్పాట్లు' : 'Music arrangements'
      ],
      vendors: relatedVendors
    },
    engagement: {
      name: t('events.engagement'),
      image: eventEngagement,
      description: language === 'hi'
        ? 'सगाई समारोह को खास बनाएं। रोमांटिक सेटअप, फोटोग्राफी और कैटरिंग।'
        : language === 'te'
        ? 'నిశ్చితార్థ వేడుకను ప్రత్యేకంగా చేయండి. రొమాంటిక్ సెటప్, ఫోటోగ్రఫీ మరియు క్యాటరింగ్.'
        : 'Make engagement ceremony special. Romantic setup, photography and catering.',
      features: [
        language === 'hi' ? 'रोमांटिक सजावट' : language === 'te' ? 'రొమాంటిక్ అలంకరణ' : 'Romantic decoration',
        language === 'hi' ? 'रिंग सेरेमनी सेटअप' : language === 'te' ? 'రింగ్ సెరమనీ సెటప్' : 'Ring ceremony setup',
        language === 'hi' ? 'प्रोफेशनल फोटोग्राफी' : language === 'te' ? 'ప్రొఫెషనల్ ఫోటోగ్రఫీ' : 'Professional photography',
        language === 'hi' ? 'लाइव संगीत' : language === 'te' ? 'లైవ్ సంగీతం' : 'Live music',
        language === 'hi' ? 'प्रीमियम कैटरिंग' : language === 'te' ? 'ప్రీమియం క్యాటరింగ్' : 'Premium catering'
      ],
      vendors: relatedVendors
    },
    corporate: {
      name: t('events.corporate'),
      image: eventCorporate,
      description: language === 'hi'
        ? 'कॉर्पोरेट इवेंट्स के लिए प्रोफेशनल सेवाएं। कॉन्फ्रेंस, सेमिनार और टीम बिल्डिंग।'
        : language === 'te'
        ? 'కార్పొరేట్ ఈవెంట్‌ల కోసం ప్రొఫెషనల్ సేవలు. కాన్ఫరెన్స్, సెమినార్ మరియు టీమ్ బిల్డింగ్.'
        : 'Professional services for corporate events. Conferences, seminars and team building.',
      features: [
        language === 'hi' ? 'कॉन्फ्रेंस रूम' : language === 'te' ? 'కాన్ఫరెన్స్ రూమ్' : 'Conference rooms',
        language === 'hi' ? 'प्रोजेक्टर और AV सेटअप' : language === 'te' ? 'ప్రొజెక్టర్ మరియు AV సెటప్' : 'Projector and AV setup',
        language === 'hi' ? 'कॉर्पोरेट कैटरिंग' : language === 'te' ? 'కార్పొరేట్ క్యాటరింగ్' : 'Corporate catering',
        language === 'hi' ? 'टीम बिल्डिंग एक्टिविटीज' : language === 'te' ? 'టీమ్ బిల్డింగ్ యాక్టివిటీస్' : 'Team building activities',
        language === 'hi' ? 'ट्रांसपोर्ट सुविधा' : language === 'te' ? 'ట్రాన్స్‌పోర్ట్ సదుపాయం' : 'Transport facility'
      ],
      vendors: relatedVendors
    }
  };


  const currentEvent = eventData[eventType || 'wedding'] || eventData.wedding;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentEvent.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container h-full flex flex-col justify-center">
          <Link to="/">
            <Button variant="ghost" className="text-white mb-4 hover:bg-white/20">
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t('search.backToHome')}
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{currentEvent.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{currentEvent.description}</p>
        </div>
      </section>

      <div className="container py-12">
        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('eventDetails.whatWeOffer')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentEvent.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                <Check className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Vendors */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t('eventDetails.relatedVendors')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedVendors.map((vendor) => (
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
                  <div className="flex items-center gap-1 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{vendor.location}</span>
                  </div>
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
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-primary/10 border-2 border-primary rounded-lg p-8 text-center">
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
      </div>

      <Footer />
    </div>
  );
};

export default EventDetails;
