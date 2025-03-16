
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./AdminSidebar";
import { adminNavigation } from "@/data/adminNavigation";

interface AdminMobileMenuProps {
  handleLogout: () => void;
}

export const AdminMobileMenu = ({ handleLogout }: AdminMobileMenuProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-news-primary z-50 border-b border-news-primary/20">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">NewsWatcher</Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black hover:bg-news-primary/50"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="bg-news-primary">
            <nav className="px-4 py-3 space-y-2">
              {adminNavigation.flat().map((section) => 
                section.items.map((item, index) => {
                  // Special case for logout button
                  if (item.translationKey === "common.logout") {
                    return (
                      <button 
                        key={index}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center p-2 hover:bg-news-primary/50 rounded-md w-full text-left text-black"
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span>{t(item.translationKey)}</span>
                      </button>
                    );
                  }
                  
                  // Regular navigation items
                  return (
                    <MobileNavItem 
                      key={index}
                      to={item.to} 
                      icon={<item.icon className="h-5 w-5 mr-2" />} 
                      label={t(item.translationKey)} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                    />
                  );
                })
              )}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MobileNavItem = ({ to, icon, label, onClick }: MobileNavItemProps) => (
  <Link 
    to={to} 
    className="flex items-center p-2 hover:bg-news-primary/50 rounded-md text-black"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);
