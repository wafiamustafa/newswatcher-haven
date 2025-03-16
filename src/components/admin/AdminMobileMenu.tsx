
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  MessageSquare, 
  Home, 
  LogOut, 
  PlusCircle,
  Menu,
  X,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "./AdminSidebar";

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
              <MobileNavItem 
                to="/admin" 
                icon={<LayoutDashboard className="h-5 w-5 mr-2" />} 
                label={t("admin.dashboard")} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <MobileNavItem 
                to="/admin/articles" 
                icon={<FileText className="h-5 w-5 mr-2" />} 
                label={t("admin.articles")} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <MobileNavItem 
                to="/admin/articles/create" 
                icon={<PlusCircle className="h-5 w-5 mr-2" />} 
                label={t("admin.createArticle")} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <MobileNavItem 
                to="/admin/reported" 
                icon={<AlertTriangle className="h-5 w-5 mr-2" />} 
                label={t("admin.reportedContent")} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <MobileNavItem 
                to="/admin/comments" 
                icon={<MessageSquare className="h-5 w-5 mr-2" />} 
                label={t("admin.comments")} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <MobileNavItem 
                to="/" 
                icon={<Home className="h-5 w-5 mr-2" />} 
                label={t("common.viewSite")} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center p-2 hover:bg-news-primary/50 rounded-md w-full text-left text-black"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>{t("common.logout")}</span>
              </button>
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
