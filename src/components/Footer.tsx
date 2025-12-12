import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Meelova Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-primary">Meelova</span>
            </Link>
            <p className="text-muted-foreground">{t('footer.tagline')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/list-your-service" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.listServices')}
                </Link>
              </li>
              <li>
                <Link to="/list-your-service#faqs" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.faqs')}
                </Link>
              </li>
              <li>
                <Link to="/about#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.contactUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.getInTouch')}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>+91 9849957728</li>
              <li>info@meelova.in</li>
            </ul>
          </div>

          {/* Find Service */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.findService')}</h3>
            <Link to="/">
              <img src={logo} alt="Meelova" className="h-16 w-16" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; 2025 {t('nav.meelova')}. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
