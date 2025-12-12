import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, Send, X, Bot, User, Loader2, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// IMPORTANT: Replace with your own Gemini API key
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

const HelpCenter = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [callNumber, setCallNumber] = useState("");
  const [callLanguage, setCallLanguage] = useState("");
  const [callResponse, setCallResponse] = useState("");

  const systemPrompt = language === 'hi' 
    ? `आप Meelova के AI सहायक हैं। Meelova भारत का प्रमुख इवेंट बुकिंग प्लेटफॉर्म है जो विक्रेताओं को ग्राहकों से जोड़ता है। 
       आप उपयोगकर्ताओं को निम्नलिखित में मदद करते हैं:
       - इवेंट प्लानिंग और वेंडर खोज
       - बुकिंग प्रक्रिया और भुगतान
       - विक्रेता पंजीकरण और डैशबोर्ड
       - सामान्य प्रश्न और समस्या समाधान
       कृपया हिंदी में संक्षिप्त और सहायक उत्तर दें।`
    : language === 'te'
    ? `మీరు Meelova యొక్క AI సహాయకుడు. Meelova భారతదేశంలో అగ్రశ్రేణి ఈవెంట్ బుకింగ్ ప్లాట్‌ఫారమ్, ఇది విక్రేతలను క్లయింట్లతో అనుసంధానం చేస్తుంది.
       మీరు వినియోగదారులకు ఈ క్రింది వాటిలో సహాయం చేస్తారు:
       - ఈవెంట్ ప్లానింగ్ మరియు వెండార్ శోధన
       - బుకింగ్ ప్రక్రియ మరియు చెల్లింపు
       - విక్రేత నమోదు మరియు డాష్‌బోర్డ్
       - సాధారణ ప్రశ్నలు మరియు సమస్య పరిష్కారం
       దయచేసి తెలుగులో సంక్షిప్తంగా మరియు సహాయకరంగా సమాధానం ఇవ్వండి.`
    : `You are the AI assistant for Meelova. Meelova is India's premier event booking platform that connects vendors with clients.
       You help users with:
       - Event planning and vendor search
       - Booking process and payments
       - Vendor registration and dashboard
       - General inquiries and troubleshooting
       Please provide concise and helpful responses in English.`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = language === 'hi'
        ? 'नमस्ते! मैं Meelova का AI सहायक हूं। मैं इवेंट प्लानिंग, वेंडर खोज, बुकिंग और भुगतान में आपकी कैसे मदद कर सकता हूं?'
        : language === 'te'
        ? 'హలో! నేను Meelova AI సహాయకుడిని. ఈవెంట్ ప్లానింగ్, వెండార్ శోధన, బుకింగ్ మరియు చెల్లింపులలో నేను మీకు ఎలా సహాయం చేయగలను?'
        : 'Hello! I\'m the Meelova AI assistant. How can I help you with event planning, vendor search, booking and payments?';
      
      setMessages([{ role: "assistant", content: welcomeMessage }]);
    }
  }, [isOpen, language]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemPrompt },
                  ...messages.map(msg => ({ text: `${msg.role}: ${msg.content}` })),
                  { text: `user: ${userMessage}` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        (language === 'hi' ? 'क्षमा करें, कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।' 
         : language === 'te' ? 'క్షమించండి, ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.'
         : 'Sorry, something went wrong. Please try again.');

      setMessages(prev => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = language === 'hi'
        ? 'क्षमा करें, अभी सेवा उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।'
        : language === 'te'
        ? 'క్షమించండి, సేవ ప్రస్తుతం అందుబాటులో లేదు. దయచేసి తర్వాత మళ్ళీ ప్రయత్నించండి.'
        : 'Sorry, the service is currently unavailable. Please try again later.';
      
      setMessages(prev => [...prev, { role: "assistant", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetCallState = () => {
    setCallNumber("");
    setCallLanguage("");
    setCallResponse("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callNumber.trim() || !callLanguage) return;

    setCallResponse("You will receive a call within 5 minutes from our team regarding your help.");
  };

  const toggleCallPanel = () => {
    setIsCallOpen((prev) => {
      const next = !prev;
      if (!next) {
        resetCallState();
      }
      return next;
    });
  };

  return (
    <>
      {/* Call Support Button */}
      <Button
        onClick={toggleCallPanel}
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary text-primary-foreground hover:bg-primary/90"
        size="icon"
      >
        <Phone className="h-6 w-6" />
      </Button>

      {/* Call Support Card */}
      {isCallOpen && (
        <Card className="fixed bottom-44 right-6 w-[340px] shadow-2xl z-50">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-3 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5" />
              Call Support
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleCallPanel}
              className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <form className="space-y-4" onSubmit={handleCallSubmit}>
              <div className="space-y-2">
                <Label htmlFor="callNumber" className="text-sm font-medium">
                  Phone number
                </Label>
                <Input
                  id="callNumber"
                  value={callNumber}
                  onChange={(e) => setCallNumber(e.target.value)}
                  placeholder="Enter the number to call"
                  className="border-primary/40 focus-visible:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="callLanguage" className="text-sm font-medium">
                  Preferred language
                </Label>
                <Select value={callLanguage} onValueChange={setCallLanguage}>
                  <SelectTrigger
                    id="callLanguage"
                    className="border-primary/40 focus:ring-0 focus:ring-offset-0"
                  >
                    <SelectValue placeholder="Choose a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!callNumber.trim() || !callLanguage}
              >
                Submit
              </Button>

              {callResponse && (
                <div className="flex items-start justify-between gap-2 rounded-md bg-primary/10 p-3 text-sm font-semibold text-primary">
                  <p className="flex-1">{callResponse}</p>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-primary"
                    onClick={toggleCallPanel}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[380px] h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              {t('helpCenter.title')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`p-2 rounded-full ${msg.role === "user" ? "bg-primary" : "bg-muted"}`}>
                      {msg.role === "user" 
                        ? <User className="h-4 w-4 text-primary-foreground" />
                        : <Bot className="h-4 w-4" />
                      }
                    </div>
                    <div
                      className={`max-w-[75%] p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-muted">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('helpCenter.placeholder')}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={isLoading || !input.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default HelpCenter;
