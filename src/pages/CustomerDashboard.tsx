import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, Clock, LogOut, X, Check, Wifi, Car, UtensilsCrossed, Music, Palette, Wind, Lightbulb, Monitor, Flower2, Layout, Package, Plane, History } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import logo from "@/assets/logo.png";
import banquetHall1 from "@/assets/banquet-hall-1.jpg";
import banquetHall2 from "@/assets/banquet-hall-2.jpg";
import weddingVenue1 from "@/assets/wedding-venue-1.jpg";
import catering1 from "@/assets/catering-1.jpg";
import weddingDecor1 from "@/assets/wedding-decor-1.jpg";
import partyCelebration from "@/assets/party-celebration.jpg";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [priceRange, setPriceRange] = useState([10000, 1000000]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [showVenueDetails, setShowVenueDetails] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [showRequestSent, setShowRequestSent] = useState(false);
  const [bookingVenue, setBookingVenue] = useState<any>(null);

  const getTitle = () => {
    if (language === 'hi') return 'मीलोवा';
    if (language === 'te') return 'మీలోవా';
    return 'Meelova';
  };

  const getLocation = (locationKey: string) => {
    return t(`location.${locationKey}`);
  };

  const venues = [
    {
      id: 1,
      name: t('vendor.royalPalace'),
      rating: 4.7,
      locationKey: "gachibowli",
      description: t('customerDash.perfectFor'),
      fullDescription: t('vendor.royalPalaceFull'),
      image: banquetHall1,
      price: 50000,
      services: [t('vendor.weddingVenue'), t('vendor.receptionHall'), t('vendor.corporateEvents')],
      capacity: "500+",
      priceRange: "₹50,000 - ₹1,50,000",
      amenities: [t('vendor.centralAc'), t('vendor.ledLighting'), t('vendor.soundSystem'), t('vendor.parkingAvailable'), t('vendor.cateringAvailable')],
      category: 'venue'
    },
    {
      id: 2,
      name: t('vendor.grandHeritage'),
      rating: 4.8,
      locationKey: "hiTechCity",
      description: t('customerDash.perfectFor'),
      fullDescription: t('vendor.grandHeritageFull'),
      image: banquetHall2,
      price: 75000,
      services: [t('vendor.weddingService'), t('vendor.engagementService'), t('vendor.receptionService')],
      capacity: "300+",
      priceRange: "₹75,000 - ₹2,00,000",
      amenities: [t('vendor.gardenArea'), t('vendor.decorativeLighting'), t('vendor.inHouseCatering'), t('vendor.valetParking'), t('vendor.bridalRoom')],
      category: 'venue'
    },
    {
      id: 3,
      name: t('vendor.premiumGarden'),
      rating: 4.9,
      locationKey: "jubileeHills",
      description: t('customerDash.perfectFor'),
      fullDescription: t('vendor.premiumGardenFull'),
      image: weddingVenue1,
      price: 80000,
      services: [t('vendor.outdoorEvents'), t('vendor.gardenWeddings'), t('vendor.birthdayParties')],
      capacity: "400+",
      priceRange: "₹80,000 - ₹2,50,000",
      amenities: [t('vendor.landscapedGarden'), t('vendor.outdoorLighting'), t('vendor.gazebo'), t('vendor.amplePar'), t('vendor.flexibleCatering')],
      category: 'venue'
    },
    {
      id: 4,
      name: language === 'hi' ? 'स्वादिष्ट खानपान सेवाएं' : language === 'te' ? 'రుచికరమైన క్యాటరింగ్ సేవలు' : 'Delicious Catering Services',
      rating: 4.6,
      locationKey: "banjaraHills",
      description: language === 'hi' ? 'स्वादिष्ट भोजन' : language === 'te' ? 'రుచికరమైన ఆహారం' : 'Delicious food options',
      fullDescription: language === 'hi' ? 'प्रीमियम खानपान सेवाएं जो पारंपरिक और आधुनिक व्यंजनों के साथ आपके मेहमानों को खुश करेंगी।' : language === 'te' ? 'సంప్రదాయ మరియు ఆధునిక వంటకాలతో మీ అతిథులను సంతోషపరిచే ప్రీమియం క్యాటరింగ్ సేవలు.' : 'Premium catering services that will delight your guests with traditional and modern cuisines.',
      image: catering1,
      price: 45000,
      services: [t('vendor.weddingService'), t('vendor.receptionService'), t('vendor.corporateEvents')],
      capacity: "200+",
      priceRange: "₹45,000 - ₹1,00,000",
      amenities: [language === 'hi' ? 'शाकाहारी विकल्प' : language === 'te' ? 'శాఖాహార ఎంపికలు' : 'Vegetarian Options', language === 'hi' ? 'मांसाहारी विकल्प' : language === 'te' ? 'మాంసాహార ఎంపికలు' : 'Non-Veg Options', language === 'hi' ? 'लाइव काउंटर' : language === 'te' ? 'లైవ్ కౌంటర్' : 'Live Counters'],
      category: 'catering'
    },
    {
      id: 5,
      name: language === 'hi' ? 'एलीट सजावट स्टूडियो' : language === 'te' ? 'ఎలైట్ డెకర్ స్టూడియో' : 'Elite Decor Studio',
      rating: 4.9,
      locationKey: "gachibowli",
      description: language === 'hi' ? 'सुंदर सजावट' : language === 'te' ? 'అందమైన అలంకరణ' : 'Beautiful decorations',
      fullDescription: language === 'hi' ? 'थीम आधारित सजावट, फूलों की व्यवस्था और आकर्षक लाइटिंग के साथ आपके कार्यक्रम को खास बनाएं।' : language === 'te' ? 'థీమ్ ఆధారిత అలంకరణలు, పుష్ప అమరికలు మరియు ఆకర్షణీయమైన లైటింగ్‌తో మీ ఈవెంట్‌ను ప్రత్యేకంగా చేయండి.' : 'Transform your event with theme-based decorations, floral arrangements, and stunning lighting.',
      image: weddingDecor1,
      price: 90000,
      services: [language === 'hi' ? 'थीम सजावट' : language === 'te' ? 'థీమ్ డెకర్' : 'Theme Decor', language === 'hi' ? 'फूलों की व्यवस्था' : language === 'te' ? 'పుష్ప అమరికలు' : 'Floral Setup', language === 'hi' ? 'प्रकाश व्यवस्था' : language === 'te' ? 'లైటింగ్ సెటప్' : 'Lighting Setup'],
      capacity: "350+",
      priceRange: "₹90,000 - ₹2,50,000",
      amenities: [t('vendor.gardenArea'), t('vendor.decorativeLighting'), t('vendor.inHouseCatering'), t('vendor.valetParking')],
      category: 'decoration'
    },
    {
      id: 6,
      name: language === 'hi' ? 'बीट मास्टर्स डीजे' : language === 'te' ? 'బీట్ మాస్టర్స్ DJ' : 'Beat Masters DJ',
      rating: 4.7,
      locationKey: "hiTechCity",
      description: language === 'hi' ? 'शानदार संगीत' : language === 'te' ? 'అద్భుతమైన సంగీతం' : 'Amazing music experience',
      fullDescription: language === 'hi' ? 'पेशेवर डीजे सेवाएं जो आपके कार्यक्रम को यादगार बनाएंगी। उच्च गुणवत्ता वाला साउंड सिस्टम और लेजर लाइट्स।' : language === 'te' ? 'మీ ఈవెంట్‌ను మరపురానిదిగా చేసే ప్రొఫెషనల్ DJ సేవలు. అధిక నాణ్యత సౌండ్ సిస్టమ్ మరియు లేజర్ లైట్స్.' : 'Professional DJ services that will make your event unforgettable. High-quality sound system and laser lights.',
      image: partyCelebration,
      price: 35000,
      services: [language === 'hi' ? 'डीजे सेवाएं' : language === 'te' ? 'DJ సేవలు' : 'DJ Services', language === 'hi' ? 'साउंड सिस्टम' : language === 'te' ? 'సౌండ్ సిస్టమ్' : 'Sound System', language === 'hi' ? 'लेजर लाइट्स' : language === 'te' ? 'లేజర్ లైట్స్' : 'Laser Lights'],
      capacity: "500+",
      priceRange: "₹35,000 - ₹80,000",
      amenities: [t('vendor.soundSystem'), language === 'hi' ? 'लेजर लाइट्स' : language === 'te' ? 'లేజర్ లైట్స్' : 'Laser Lights', language === 'hi' ? 'फॉग मशीन' : language === 'te' ? 'ఫాగ్ మెషిన్' : 'Fog Machine'],
      category: 'dj'
    },
    {
      id: 7,
      name: language === 'hi' ? 'शाइनिंग स्टार लाइट्स' : language === 'te' ? 'షైనింగ్ స్టార్ లైట్స్' : 'Shining Star Lights',
      rating: 4.8,
      locationKey: "jubileeHills",
      description: language === 'hi' ? 'आकर्षक लाइटिंग' : language === 'te' ? 'ఆకర్షణీయమైన లైటింగ్' : 'Stunning lighting',
      fullDescription: language === 'hi' ? 'एलईडी, फेयरी लाइट्स, और प्रोफेशनल इवेंट लाइटिंग के साथ अपने कार्यक्रम को जगमगाएं।' : language === 'te' ? 'LED, ఫెయిరీ లైట్స్ మరియు ప్రొఫెషనల్ ఈవెంట్ లైటింగ్‌తో మీ ఈవెంట్‌ను ప్రకాశవంతంగా చేయండి.' : 'Illuminate your event with LED, fairy lights, and professional event lighting.',
      image: banquetHall1,
      price: 25000,
      services: [language === 'hi' ? 'एलईडी लाइट्स' : language === 'te' ? 'LED లైట్స్' : 'LED Lights', language === 'hi' ? 'फेयरी लाइट्स' : language === 'te' ? 'ఫెయిరీ లైట్స్' : 'Fairy Lights', language === 'hi' ? 'स्पॉट लाइट्स' : language === 'te' ? 'స్పాట్ లైట్స్' : 'Spot Lights'],
      capacity: "Any",
      priceRange: "₹25,000 - ₹60,000",
      amenities: [t('vendor.ledLighting'), t('vendor.decorativeLighting'), t('vendor.outdoorLighting')],
      category: 'lights'
    },
    {
      id: 8,
      name: language === 'hi' ? 'क्रिएटिव फोटोग्राफी' : language === 'te' ? 'క్రియేటివ్ ఫోటోగ్రఫీ' : 'Creative Photography',
      rating: 4.9,
      locationKey: "banjaraHills",
      description: language === 'hi' ? 'यादगार तस्वीरें' : language === 'te' ? 'మరపురాని ఫోటోలు' : 'Memorable photos',
      fullDescription: language === 'hi' ? 'प्रोफेशनल फोटोग्राफी और वीडियोग्राफी सेवाएं। ड्रोन शूट, सिनेमैटिक वीडियो और एल्बम डिजाइन।' : language === 'te' ? 'ప్రొఫెషనల్ ఫోటోగ్రఫీ మరియు వీడియోగ్రఫీ సేవలు. డ్రోన్ షూట్, సినిమాటిక్ వీడియో మరియు ఆల్బమ్ డిజైన్.' : 'Professional photography and videography services. Drone shoots, cinematic videos, and album design.',
      image: weddingVenue1,
      price: 55000,
      services: [language === 'hi' ? 'फोटोग्राफी' : language === 'te' ? 'ఫోటోగ్రఫీ' : 'Photography', language === 'hi' ? 'वीडियोग्राफी' : language === 'te' ? 'వీడియోగ్రఫీ' : 'Videography', language === 'hi' ? 'ड्रोन शूट' : language === 'te' ? 'డ్రోన్ షూట్' : 'Drone Shoot'],
      capacity: "Any",
      priceRange: "₹55,000 - ₹1,50,000",
      amenities: [language === 'hi' ? '4K वीडियो' : language === 'te' ? '4K వీడియో' : '4K Video', language === 'hi' ? 'ड्रोन शूट' : language === 'te' ? 'డ్రోన్ షూట్' : 'Drone Shoot', language === 'hi' ? 'एल्बम डिजाइन' : language === 'te' ? 'ఆల్బమ్ డిజైన్' : 'Album Design'],
      category: 'photography'
    },
    {
      id: 9,
      name: language === 'hi' ? 'रॉयल स्टेज सेटअप' : language === 'te' ? 'రాయల్ స్టేజ్ సెటప్' : 'Royal Stage Setup',
      rating: 4.6,
      locationKey: "gachibowli",
      description: language === 'hi' ? 'शानदार स्टेज' : language === 'te' ? 'అద్భుతమైన స్టేజ్' : 'Grand stage setup',
      fullDescription: language === 'hi' ? 'शादी और रिसेप्शन के लिए शानदार स्टेज डिजाइन। कस्टम बैकड्रॉप और थीम आधारित सेटअप।' : language === 'te' ? 'పెళ్లి మరియు రిసెప్షన్ కోసం అద్భుతమైన స్టేజ్ డిజైన్. కస్టమ్ బ్యాక్‌డ్రాప్ మరియు థీమ్ ఆధారిత సెటప్.' : 'Stunning stage designs for weddings and receptions. Custom backdrops and theme-based setups.',
      image: banquetHall2,
      price: 40000,
      services: [language === 'hi' ? 'स्टेज डिजाइन' : language === 'te' ? 'స్టేజ్ డిజైన్' : 'Stage Design', language === 'hi' ? 'बैकड्रॉप' : language === 'te' ? 'బ్యాక్‌డ్రాప్' : 'Backdrop', language === 'hi' ? 'फ्लोरल सजावट' : language === 'te' ? 'పుష్ప అలంకరణ' : 'Floral Decor'],
      capacity: "Any",
      priceRange: "₹40,000 - ₹1,20,000",
      amenities: [language === 'hi' ? 'कस्टम डिजाइन' : language === 'te' ? 'కస్టమ్ డిజైన్' : 'Custom Design', t('vendor.decorativeLighting'), language === 'hi' ? 'फूलों की सजावट' : language === 'te' ? 'పుష్ప అలంకరణ' : 'Floral Decor'],
      category: 'stage'
    },
    {
      id: 10,
      name: language === 'hi' ? 'ग्लैम मेकअप स्टूडियो' : language === 'te' ? 'గ్లామ్ మేకప్ స్టూడియో' : 'Glam Makeup Studio',
      rating: 4.8,
      locationKey: "hiTechCity",
      description: language === 'hi' ? 'ब्राइडल मेकअप' : language === 'te' ? 'బ్రైడల్ మేకప్' : 'Bridal makeup',
      fullDescription: language === 'hi' ? 'प्रोफेशनल ब्राइडल मेकअप, हेयर स्टाइलिंग और मेहंदी सेवाएं। एयरब्रश मेकअप और HD फिनिश।' : language === 'te' ? 'ప్రొఫెషనల్ బ్రైడల్ మేకప్, హెయిర్ స్టైలింగ్ మరియు మెహందీ సేవలు. ఎయిర్‌బ్రష్ మేకప్ మరియు HD ఫినిష్.' : 'Professional bridal makeup, hair styling, and mehendi services. Airbrush makeup and HD finish.',
      image: partyCelebration,
      price: 30000,
      services: [language === 'hi' ? 'ब्राइडल मेकअप' : language === 'te' ? 'బ్రైడల్ మేకప్' : 'Bridal Makeup', language === 'hi' ? 'हेयर स्टाइलिंग' : language === 'te' ? 'హెయిర్ స్టైలింగ్' : 'Hair Styling', language === 'hi' ? 'मेहंदी' : language === 'te' ? 'మెహందీ' : 'Mehendi'],
      capacity: "Individual",
      priceRange: "₹30,000 - ₹80,000",
      amenities: [language === 'hi' ? 'एयरब्रश मेकअप' : language === 'te' ? 'ఎయిర్‌బ్రష్ మేకప్' : 'Airbrush Makeup', language === 'hi' ? 'HD फिनिश' : language === 'te' ? 'HD ఫినిష్' : 'HD Finish', language === 'hi' ? 'ट्रायल सेशन' : language === 'te' ? 'ట్రయల్ సెషన్' : 'Trial Session'],
      category: 'makeup'
    },
    {
      id: 11,
      name: language === 'hi' ? 'स्वीट ट्रीट्स बेकरी' : language === 'te' ? 'స్వీట్ ట్రీట్స్ బేకరీ' : 'Sweet Treats Bakery',
      rating: 4.7,
      locationKey: "jubileeHills",
      description: language === 'hi' ? 'स्वादिष्ट केक' : language === 'te' ? 'రుచికరమైన కేక్‌లు' : 'Delicious cakes',
      fullDescription: language === 'hi' ? 'कस्टम वेडिंग केक, कपकेक और डेज़र्ट टेबल। थीम आधारित केक और एगलेस विकल्प उपलब्ध।' : language === 'te' ? 'కస్టమ్ వెడ్డింగ్ కేక్‌లు, కప్‌కేక్‌లు మరియు డెజర్ట్ టేబుల్. థీమ్ ఆధారిత కేక్‌లు మరియు ఎగ్‌లెస్ ఆప్షన్స్ అందుబాటులో ఉన్నాయి.' : 'Custom wedding cakes, cupcakes, and dessert tables. Theme-based cakes and eggless options available.',
      image: catering1,
      price: 20000,
      services: [language === 'hi' ? 'वेडिंग केक' : language === 'te' ? 'వెడ్డింగ్ కేక్' : 'Wedding Cake', language === 'hi' ? 'कपकेक' : language === 'te' ? 'కప్‌కేక్‌లు' : 'Cupcakes', language === 'hi' ? 'डेज़र्ट टेबल' : language === 'te' ? 'డెజర్ట్ టేబుల్' : 'Dessert Table'],
      capacity: "Any",
      priceRange: "₹20,000 - ₹50,000",
      amenities: [language === 'hi' ? 'कस्टम डिजाइन' : language === 'te' ? 'కస్టమ్ డిజైన్' : 'Custom Design', language === 'hi' ? 'एगलेस विकल्प' : language === 'te' ? 'ఎగ్‌లెస్ ఆప్షన్స్' : 'Eggless Options', language === 'hi' ? 'थीम केक' : language === 'te' ? 'థీమ్ కేక్‌లు' : 'Theme Cakes'],
      category: 'catering'
    },
    {
      id: 12,
      name: language === 'hi' ? 'इवेंट टेंट हाउस' : language === 'te' ? 'ఈవెంట్ టెంట్ హౌస్' : 'Event Tent House',
      rating: 4.5,
      locationKey: "banjaraHills",
      description: language === 'hi' ? 'टेंट और पंडाल' : language === 'te' ? 'టెంట్ మరియు పందిరి' : 'Tents and Pandals',
      fullDescription: language === 'hi' ? 'शादी और कार्यक्रमों के लिए प्रीमियम टेंट, पंडाल, शामियाना और फर्नीचर किराए पर।' : language === 'te' ? 'పెళ్లి మరియు ఈవెంట్‌ల కోసం ప్రీమియం టెంట్‌లు, పందిరి, షామియానా మరియు ఫర్నీచర్ అద్దెకు.' : 'Premium tents, pandals, shamianas, and furniture rental for weddings and events.',
      image: weddingDecor1,
      price: 35000,
      services: [language === 'hi' ? 'टेंट' : language === 'te' ? 'టెంట్' : 'Tent', language === 'hi' ? 'पंडाल' : language === 'te' ? 'పందిరి' : 'Pandal', language === 'hi' ? 'फर्नीचर' : language === 'te' ? 'ఫర్నీచర్' : 'Furniture'],
      capacity: "500+",
      priceRange: "₹35,000 - ₹1,00,000",
      amenities: [language === 'hi' ? 'एसी टेंट' : language === 'te' ? 'AC టెంట్' : 'AC Tent', language === 'hi' ? 'कार्पेट' : language === 'te' ? 'కార్పెట్' : 'Carpet', language === 'hi' ? 'सोफा सेट' : language === 'te' ? 'సోఫా సెట్' : 'Sofa Sets'],
      category: 'tent'
    },
  ];

  const amenitiesList = [
    { id: 'ac', label: t('customerDash.ac'), icon: Wind },
    { id: 'parking', label: t('customerDash.parking'), icon: Car },
    { id: 'catering', label: t('customerDash.catering'), icon: UtensilsCrossed },
    { id: 'wifi', label: t('customerDash.wifi'), icon: Wifi },
    { id: 'sound', label: t('customerDash.sound'), icon: Music },
    { id: 'decoration', label: t('customerDash.decoration'), icon: Palette },
    { id: 'lights', label: t('customerDash.lights'), icon: Lightbulb },
    { id: 'stage', label: t('customerDash.stage'), icon: Layout },
    { id: 'floralDecor', label: t('customerDash.floralDecor'), icon: Flower2 },
    { id: 'videoScreen', label: t('customerDash.videoScreen'), icon: Monitor },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleBookNow = (venue: any) => {
    setBookingVenue(venue);
    setShowBookingConfirm(true);
  };

  const handleConfirmBooking = () => {
    setShowBookingConfirm(false);
    setShowVenueDetails(false);
    setShowRequestSent(true);
  };

  const handleRequestService = (venue: any) => {
    setBookingVenue(venue);
    setShowBookingConfirm(true);
  };

  const packages = [
    { id: 1, name: language === 'hi' ? 'शादी पैकेज' : language === 'te' ? 'పెళ్లి ప్యాకేజ్' : 'Wedding Package', price: '₹2,50,000', includes: ['Venue', 'Catering', 'Decoration', 'Photography', 'DJ'], image: banquetHall1 },
    { id: 2, name: language === 'hi' ? 'बर्थडे पार्टी पैकेज' : language === 'te' ? 'పుట్టినరోజు పార్టీ ప్యాకేజ్' : 'Birthday Party Package', price: '₹50,000', includes: ['Venue', 'Cake', 'Decoration', 'DJ'], image: partyCelebration },
    { id: 3, name: language === 'hi' ? 'कॉर्पोरेट इवेंट पैकेज' : language === 'te' ? 'కార్పొరేట్ ఈవెంట్ ప్యాకేజ్' : 'Corporate Event Package', price: '₹1,00,000', includes: ['Venue', 'Catering', 'AV Setup', 'Stage'], image: banquetHall2 },
  ];

  const destinationServices = [
    { id: 1, location: t('location.gachibowli'), vendors: 45, image: weddingVenue1 },
    { id: 2, location: t('location.hiTechCity'), vendors: 38, image: banquetHall1 },
    { id: 3, location: t('location.jubileeHills'), vendors: 52, image: banquetHall2 },
    { id: 4, location: t('location.banjaraHills'), vendors: 41, image: catering1 },
  ];

  const bookingHistory = [
    { id: 1, venue: language === 'hi' ? 'रॉयल पैलेस' : language === 'te' ? 'రాయల్ ప్యాలెస్' : 'Royal Palace', date: 'Dec 10, 2025', status: language === 'hi' ? 'पूर्ण' : language === 'te' ? 'పూర్తయింది' : 'Completed', amount: '₹75,000' },
    { id: 2, venue: language === 'hi' ? 'ग्रैंड हेरिटेज' : language === 'te' ? 'గ్రాండ్ హెరిటేజ్' : 'Grand Heritage', date: 'Nov 25, 2025', status: language === 'hi' ? 'पूर्ण' : language === 'te' ? 'పూర్తయింది' : 'Completed', amount: '₹1,20,000' },
    { id: 3, venue: language === 'hi' ? 'प्रीमियम गार्डन' : language === 'te' ? 'ప్రీమియం గార్డెన్' : 'Premium Garden', date: 'Nov 15, 2025', status: language === 'hi' ? 'पూర్ణ' : language === 'te' ? 'పూర్తయింది' : 'Completed', amount: '₹90,000' },
  ];

  const [activeMainTab, setActiveMainTab] = useState('services');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Meelova Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-primary">{getTitle()}</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button 
                variant={activeMainTab === 'services' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveMainTab('services')}
              >
                {t('customerDash.discoverVenue')}
              </Button>
              <Button 
                variant={activeMainTab === 'packages' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveMainTab('packages')}
              >
                <Package className="h-4 w-4 mr-1" />
                {t('customerDash.packages')}
              </Button>
              <Button 
                variant={activeMainTab === 'destinations' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveMainTab('destinations')}
              >
                <Plane className="h-4 w-4 mr-1" />
                {t('customerDash.destinationServices')}
              </Button>
              <Button 
                variant={activeMainTab === 'history' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveMainTab('history')}
              >
                <History className="h-4 w-4 mr-1" />
                {t('customerDash.history')}
              </Button>
            </div>
            <LanguageSelector />
            <Button variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              {t('customerDash.logout')}
            </Button>
          </div>
        </div>
      </header>

      {/* Packages Tab */}
      {activeMainTab === 'packages' && (
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-8">{t('customerDash.packages')}</h1>
          <p className="text-muted-foreground mb-8">{t('customerDash.packagesDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">{pkg.price}</p>
                  <div className="space-y-2 mb-4">
                    {pkg.includes.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" onClick={() => handleRequestService({ name: pkg.name, price: parseInt(pkg.price.replace(/[^\d]/g, '')), locationKey: 'gachibowli' })}>
                    {t('customerDash.bookNow')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Destination Services Tab */}
      {activeMainTab === 'destinations' && (
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-8">{t('customerDash.destinationServices')}</h1>
          <p className="text-muted-foreground mb-8">{t('customerDash.destinationServicesDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationServices.map((dest) => (
              <Card key={dest.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setActiveMainTab('services')}>
                <img src={dest.image} alt={dest.location} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">{dest.location}</h3>
                  </div>
                  <p className="text-muted-foreground">{dest.vendors} {language === 'hi' ? 'विक्रेता' : language === 'te' ? 'విక్రేతలు' : 'vendors'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Booking History Tab */}
      {activeMainTab === 'history' && (
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-8">{t('customerDash.history')}</h1>
          <p className="text-muted-foreground mb-8">{t('customerDash.historyDesc')}</p>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{booking.venue}</h4>
                      <p className="text-sm text-muted-foreground">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{booking.amount}</p>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{booking.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Services Tab (Main Content) */}
      {activeMainTab === 'services' && (
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-80 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('customerDash.filterBy')}</h2>
              </div>

              {/* Event Type */}
              <div>
                <h3 className="font-semibold mb-4 border-b pb-2">{t('customerDash.eventType')}</h3>
                <RadioGroup value={selectedEvent} onValueChange={setSelectedEvent}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wedding" id="wedding" />
                      <Label htmlFor="wedding" className="cursor-pointer">{t('customerDash.wedding')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reception" id="reception" />
                      <Label htmlFor="reception" className="cursor-pointer">{t('customerDash.reception')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="birthday" id="birthday" />
                      <Label htmlFor="birthday" className="cursor-pointer">{t('customerDash.birthdayParty')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ceremonies" id="ceremonies" />
                      <Label htmlFor="ceremonies" className="cursor-pointer">{t('customerDash.ceremonies')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="anniversaries" id="anniversaries" />
                      <Label htmlFor="anniversaries" className="cursor-pointer">{t('customerDash.anniversaries')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="cursor-pointer">{t('customerDash.privateParties')}</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4 border-b pb-2">{t('customerDash.priceRange')}</h3>
                <Slider
                  min={10000}
                  max={1000000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-20"
                  />
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-24"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <h3 className="font-semibold mb-4 border-b pb-2">{t('customerDash.dateTime')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="time" 
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Amenities & Features */}
              <div>
                <h3 className="font-semibold mb-4 border-b pb-2">{t('customerDash.amenitiesFeatures')}</h3>
                <div className="space-y-3">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={() => handleAmenityToggle(amenity.id)}
                      />
                      <Label htmlFor={amenity.id} className="cursor-pointer flex items-center gap-2">
                        <amenity.icon className="h-4 w-4 text-muted-foreground" />
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <h1 className="text-4xl font-bold mb-8">{t('customerDash.discoverVenue')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <Card key={venue.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-1">{venue.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{venue.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(venue.rating) ? 'fill-primary text-primary' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      {getLocation(venue.locationKey)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{venue.description}</p>
                    <p className="text-lg font-bold mb-4">₹{venue.price.toLocaleString('en-IN')}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedVenue(venue);
                          setShowVenueDetails(true);
                        }}
                      >
                        {t('customerDash.viewDetails')}
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => handleRequestService(venue)}
                      >
                        {t('customerDash.requestService')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
      )}

      {/* Venue Details Modal */}
      {selectedVenue && showVenueDetails && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVenueDetails(false)}
        >
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold">{selectedVenue.name}</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowVenueDetails(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">{t('customerDash.close')}</span>
                </Button>
              </div>
              
              <img 
                src={selectedVenue.image} 
                alt={selectedVenue.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">({selectedVenue.rating})</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-red-500" />
                    {getLocation(selectedVenue.locationKey)}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('customerDash.about')}</h3>
                  <p className="text-muted-foreground">{selectedVenue.fullDescription}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('customerDash.servicesOffered')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVenue.services.map((service: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">{t('customerDash.capacity')}</h3>
                    <p className="text-muted-foreground">{selectedVenue.capacity} {t('customerDash.guests')}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{t('customerDash.priceRangeLabel')}</h3>
                    <p className="text-muted-foreground">{selectedVenue.priceRange}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2">{t('customerDash.amenities')}</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedVenue.amenities.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleBookNow(selectedVenue)}
                  >
                    {t('customerDash.bookNow')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBookingConfirm && bookingVenue && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowBookingConfirm(false)}
        >
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{t('customerDash.confirmBooking')}</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowBookingConfirm(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{bookingVenue.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {getLocation(bookingVenue.locationKey)}
                  </p>
                  <p className="text-lg font-bold mt-2">₹{bookingVenue.price.toLocaleString('en-IN')}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowBookingConfirm(false)}
                  >
                    {t('customerDash.cancel')}
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handleConfirmBooking}
                  >
                    {t('customerDash.confirmBooking')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Request Sent Success Modal */}
      {showRequestSent && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowRequestSent(false)}
        >
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t('customerDash.requestSent')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('customerDash.waitForStatus')}
              </p>
              <Button 
                className="w-full"
                onClick={() => setShowRequestSent(false)}
              >
                {t('customerDash.okGotIt')}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
