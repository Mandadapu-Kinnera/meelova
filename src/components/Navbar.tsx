import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Meelova Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold text-primary">{t('nav.meelova')}</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/list-your-service">
            <Button variant="outline">{t('nav.listService')}</Button>
          </Link>
          <Link to="/login">
            <Button>{t('nav.loginRegister')}</Button>
          </Link>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
