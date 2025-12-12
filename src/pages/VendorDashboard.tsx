import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import logo from "@/assets/logo.png";
import { 
  LayoutDashboard, 
  Calendar, 
  Plus, 
  Wallet, 
  MessageSquare, 
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Upload,
  X,
  User,
  LogOut,
  Edit,
  Trash2,
  Eye,
  Globe,
  Bell,
  History,
  Banknote,
  CreditCard
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const earningsData = [
  { month: "Jan", earnings: 4000 },
  { month: "Feb", earnings: 3000 },
  { month: "Mar", earnings: 5000 },
  { month: "Apr", earnings: 4500 },
  { month: "May", earnings: 6000 },
  { month: "Jun", earnings: 5500 },
];

const VendorDashboard = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [editingService, setEditingService] = useState<any>(null);
  const [viewingService, setViewingService] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any>(null);

  const getTitle = () => {
    if (language === 'hi') return 'मीलोवा';
    if (language === 'te') return 'మీలోవా';
    return 'Meelova';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const [services, setServices] = useState([
    { id: 1, name: t('vendorDash.weddingPhotography'), price: "₹50,000", status: t('vendorDash.active'), description: "Professional wedding photography with high-quality equipment" },
    { id: 2, name: t('vendorDash.birthdayDecoration'), price: "₹15,000", status: t('vendorDash.active'), description: "Creative and colorful birthday decorations" },
    { id: 3, name: t('vendorDash.corporateEventCatering'), price: "₹80,000", status: t('vendorDash.active'), description: "Premium catering for corporate events" },
  ]);

  const calendarEvents = [
    { date: new Date(), event: "Wedding Reception - Sharma Family", client: "Rahul Sharma" },
    { date: new Date(Date.now() + 86400000), event: "Birthday Party - Priya", client: "Priya Patel" },
    { date: new Date(Date.now() + 172800000), event: "Corporate Event - TechCorp", client: "TechCorp Ltd" },
  ];

  const bookingHistory = [
    { id: 1, event: "Wedding Reception", client: "John Doe", date: "Dec 15, 2025", amount: "₹75,000", status: t('vendorDash.completed') },
    { id: 2, event: "Birthday Decoration", client: "Priya Sharma", date: "Dec 10, 2025", amount: "₹25,000", status: t('vendorDash.completed') },
    { id: 3, event: "Corporate Catering", client: "ABC Corp", date: "Dec 5, 2025", amount: "₹1,20,000", status: t('vendorDash.completed') },
    { id: 4, event: "Engagement Party", client: "Amit Kumar", date: "Nov 28, 2025", amount: "₹45,000", status: t('vendorDash.completed') },
  ];

  const handleEditService = (service: any) => {
    setEditingService({ ...service });
  };

  const handleSaveEdit = () => {
    setServices(prev => prev.map(s => s.id === editingService.id ? editingService : s));
    setEditingService(null);
    toast({ title: t('vendorDash.serviceUpdated') });
  };

  const handleViewService = (service: any) => {
    setViewingService(service);
  };

  const handleDeleteService = (service: any) => {
    setServiceToDelete(service);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
    setShowDeleteDialog(false);
    setServiceToDelete(null);
    toast({ title: t('vendorDash.serviceDeleted') });
  };

  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return calendarEvents.filter(e => 
      e.date.toDateString() === date.toDateString()
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('vendorDash.totalEarnings')}</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹28,000</div>
                  <p className="text-xs text-muted-foreground">{t('vendorDash.fromLastMonth')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('vendorDash.activeBookings')}</CardTitle>
                  <Calendar className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">{t('vendorDash.fromLastWeek')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('vendorDash.totalClients')}</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48</div>
                  <p className="text-xs text-muted-foreground">{t('vendorDash.newThisMonth')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('vendorDash.pendingRequests')}</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">{t('vendorDash.respondQuickly')}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {t('vendorDash.earningsOverview')}
                </CardTitle>
                <CardDescription>{t('vendorDash.earningsOverviewDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="earnings" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('vendorDash.quickActions')}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <Button className="w-full" onClick={() => setActiveTab("add-service")}>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('vendorDash.addNewService')}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("bookings")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('vendorDash.viewBookings')}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("messages")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {t('vendorDash.checkMessages')}
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "bookings":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {t('vendorDash.myBookings')}
              </CardTitle>
              <CardDescription>{t('vendorDash.myBookingsDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((booking) => (
                  <div key={booking} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{t('vendorDash.weddingReception')}</h4>
                      <p className="text-sm text-muted-foreground">{t('vendorDash.bookingDate')}</p>
                    </div>
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      {t('vendorDash.viewDetailsBtn')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "services":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-primary" />
                {t('vendorDash.myServicesTitle')}
              </CardTitle>
              <CardDescription>{t('vendorDash.myServicesDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary mb-2">{service.price}</p>
                      <p className="text-sm text-muted-foreground mb-4">{t('vendorDash.status')}: {service.status}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditService(service)}>
                          <Edit className="h-4 w-4 mr-1" />
                          {t('vendorDash.edit')}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => handleViewService(service)}>
                          <Eye className="h-4 w-4 mr-1" />
                          {t('vendorDash.view')}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteService(service)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "add-service":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                {t('vendorDash.addServiceTitle')}
              </CardTitle>
              <CardDescription>{t('vendorDash.addServiceDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t('vendorDash.serviceName')}</Label>
                <Input placeholder={t('vendorDash.serviceNamePlaceholder')} />
              </div>
              <div className="space-y-2">
                <Label>{t('vendorDash.serviceDescription')}</Label>
                <Textarea placeholder={t('vendorDash.serviceDescPlaceholder')} rows={4} />
              </div>
              <div className="space-y-2">
                <Label>{t('vendorDash.price')}</Label>
                <Input type="number" placeholder="50000" />
              </div>
              <div className="space-y-2">
                <Label>{t('vendorDash.serviceImages')}</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">{t('vendorDash.clickToUpload')}</p>
                    <p className="text-xs text-muted-foreground">{t('vendorDash.uploadLimit')}</p>
                  </label>
                </div>
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {t('vendorDash.addServiceBtn')}
              </Button>
            </CardContent>
          </Card>
        );

      case "calendar":
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {t('vendorDash.calendar')}
                </CardTitle>
                <CardDescription>{t('vendorDash.calendarDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate?.toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-4">
                    {getEventsForDate(selectedDate).map((event, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-primary/5">
                        <h4 className="font-semibold">{event.event}</h4>
                        <p className="text-sm text-muted-foreground">{t('vendorDash.client')}: {event.client}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">{t('vendorDash.noEventsToday')}</p>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "history":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                {t('vendorDash.history')}
              </CardTitle>
              <CardDescription>{t('vendorDash.historyDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{booking.event}</h4>
                      <p className="text-sm text-muted-foreground">{booking.client} • {booking.date}</p>
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
        );

      case "wallet":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('vendorDash.availableBalance')}</CardTitle>
                  <Wallet className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">₹28,000</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('vendorDash.cashOnSpot')}</CardTitle>
                  <Banknote className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">₹12,500</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('vendorDash.currentTransactions')}</CardTitle>
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">₹45,000</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  {t('vendorDash.walletTitle')}
                </CardTitle>
                <CardDescription>{t('vendorDash.walletDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Button className="w-full">
                    <Wallet className="h-4 w-4 mr-2" />
                    {t('vendorDash.withdrawFunds')}
                  </Button>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-4">{t('vendorDash.recentTransactions')}</h4>
                    <div className="space-y-3">
                      {[
                        { type: "received", amount: 15000, date: "Dec 8, 2025", description: "Wedding Photography" },
                        { type: "received", amount: 8000, date: "Dec 6, 2025", description: "Birthday Decoration" },
                        { type: "withdrawn", amount: 20000, date: "Dec 5, 2025", description: "Bank Transfer" },
                        { type: "received", amount: 25000, date: "Dec 3, 2025", description: "Corporate Event" },
                      ].map((txn, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{txn.description}</p>
                            <p className="text-sm text-muted-foreground">{txn.date}</p>
                          </div>
                          <p className={`font-bold ${txn.type === 'received' ? 'text-green-600' : 'text-red-600'}`}>
                            {txn.type === 'received' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "messages":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                {t('vendorDash.messagesTitle')}
              </CardTitle>
              <CardDescription>{t('vendorDash.messagesDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((msg) => (
                  <div key={msg} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                    <Avatar>
                      <AvatarFallback>C{msg}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{t('vendorDash.client')} {msg}</h4>
                      <p className="text-sm text-muted-foreground">{t('vendorDash.lastMessagePreview')}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{t('vendorDash.hoursAgo')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  {t('vendorDash.profileSettings')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('vendorDash.businessName')}</Label>
                  <Input placeholder={t('vendorDash.businessNamePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label>{t('vendorDash.email')}</Label>
                  <Input type="email" placeholder={t('vendorDash.emailPlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label>{t('vendorDash.phone')}</Label>
                  <Input placeholder={t('vendorDash.phonePlaceholder')} />
                </div>
                <Button>{t('vendorDash.updateProfile')}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  {t('vendorDash.language')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder={t('vendorDash.selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="te">తెలుగు</SelectItem>
                    <SelectItem value="ta">தமிழ்</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  {t('vendorDash.notifications')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{t('vendorDash.emailNotifications')}</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{t('vendorDash.smsNotifications')}</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{t('vendorDash.bookingAlerts')}</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Meelova Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-primary">{t('vendorDash.title')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                  <User className="mr-2 h-4 w-4" />
                  {t('vendorDash.profile')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  {t('vendorDash.settings')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('vendorDash.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r bg-card p-4">
          <nav className="space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {t('vendorDash.dashboard')}
            </Button>
            <Button
              variant={activeTab === "bookings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("bookings")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t('vendorDash.bookings')}
            </Button>
            <Button
              variant={activeTab === "calendar" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("calendar")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t('vendorDash.calendar')}
            </Button>
            <Button
              variant={activeTab === "services" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("services")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {t('vendorDash.services')}
            </Button>
            <Button
              variant={activeTab === "add-service" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("add-service")}
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('vendorDash.addService')}
            </Button>
            <Button
              variant={activeTab === "wallet" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("wallet")}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {t('vendorDash.wallet')}
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("history")}
            >
              <History className="mr-2 h-4 w-4" />
              {t('vendorDash.history')}
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {t('vendorDash.messages')}
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              {t('vendorDash.settings')}
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>

      {/* Edit Service Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('vendorDash.editService')}</DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t('vendorDash.serviceName')}</Label>
                <Input 
                  value={editingService.name} 
                  onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('vendorDash.price')}</Label>
                <Input 
                  value={editingService.price} 
                  onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('vendorDash.serviceDescription')}</Label>
                <Textarea 
                  value={editingService.description || ''} 
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingService(null)}>{t('customerDash.cancel')}</Button>
            <Button onClick={handleSaveEdit}>{t('vendorDash.updateProfile')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Service Dialog */}
      <Dialog open={!!viewingService} onOpenChange={() => setViewingService(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('vendorDash.viewService')}</DialogTitle>
          </DialogHeader>
          {viewingService && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{viewingService.name}</h3>
                <p className="text-2xl font-bold text-primary mt-2">{viewingService.price}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">{t('vendorDash.status')}</Label>
                <p className="font-medium">{viewingService.status}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">{t('vendorDash.serviceDescription')}</Label>
                <p>{viewingService.description || 'No description available'}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewingService(null)}>{t('customerDash.close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('vendorDash.confirmDelete')}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>{t('customerDash.cancel')}</Button>
            <Button variant="destructive" onClick={confirmDelete}><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorDashboard;