
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  MessageSquare, 
  Home, 
  LogOut, 
  PlusCircle,
  Globe
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdminSidebarProps {
  handleLogout: () => void;
}

export const AdminSidebar = ({ handleLogout }: AdminSidebarProps) => {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <Sidebar className="hidden md:flex bg-news-primary">
      <SidebarHeader>
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold flex items-center gap-2 text-black">
            NewsWatcher
          </Link>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black opacity-80">{t("common.home")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavMenuItem to="/admin" icon={<LayoutDashboard className="h-5 w-5 mr-2" />} label={t("admin.dashboard")} />
              <NavMenuItem to="/admin/articles" icon={<FileText className="h-5 w-5 mr-2" />} label={t("admin.articles")} />
              <NavMenuItem to="/admin/articles/create" icon={<PlusCircle className="h-5 w-5 mr-2" />} label={t("admin.createArticle")} />
              <NavMenuItem to="/admin/reported" icon={<AlertTriangle className="h-5 w-5 mr-2" />} label={t("admin.reportedContent")} />
              <NavMenuItem to="/admin/comments" icon={<MessageSquare className="h-5 w-5 mr-2" />} label={t("admin.comments")} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavMenuItem to="/" icon={<Home className="h-5 w-5 mr-2" />} label={t("common.viewSite")} />
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="text-black hover:text-black">
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>{t("common.logout")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

interface NavMenuItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavMenuItem = ({ to, icon, label }: NavMenuItemProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild className="text-black hover:text-black">
      <Link to={to}>
        {icon}
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

interface LanguageSwitcherProps {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

export const LanguageSwitcher = ({ language, setLanguage }: LanguageSwitcherProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="text-black">
        <Globe className="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => setLanguage("en")}>
        English {language === "en" && "✓"}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setLanguage("ar")}>
        العربية {language === "ar" && "✓"}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
