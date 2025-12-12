import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Mock login - customers only
    navigate("/customer-dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
            <CardDescription>{t('login.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleLogin}
            >
              {t('login.button')}
            </Button>
            
            <div className="mt-4 text-center text-sm">
              {t('login.noAccount')}{" "}
              <Link to="/signup" className="text-primary hover:underline">
                {t('login.signupLink')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
