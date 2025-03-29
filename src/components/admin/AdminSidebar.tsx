
import { Link } from "react-router-dom";
import { Globe, LucideIcon } from "lucide-react";
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
import { adminNavigation, NavItem } from "@/data/adminNavigation";

interface AdminSidebarProps {
  handleLogout: () => void;
}

export const AdminSidebar = ({ handleLogout }: AdminSidebarProps) => {
  const { language, setLanguage, t, dir } = useLanguage();
  
  return (
    <Sidebar className="hidden md:flex bg-news-primary" side={dir === "rtl" ? "right" : "left"}>
      <SidebarHeader>
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold flex items-center gap-2 text-black">
            NewsWatcher
          </Link>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {adminNavigation.map((section, index) => (
          <SidebarGroup key={index}>
            {section.labelTranslationKey && (
              <SidebarGroupLabel className="text-black opacity-80">
                {t(section.labelTranslationKey)}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIndex) => {
                  // Special case for logout button
                  if (item.translationKey === "common.logout") {
                    return (
                      <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton onClick={handleLogout} className="text-black hover:text-black">
                          <item.icon className={`h-5 w-5 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                          <span>{t(item.translationKey)}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }
                  
                  // Regular navigation items
                  return (
                    <NavMenuItem 
                      key={itemIndex}
                      to={item.to}
                      icon={<item.icon className={`h-5 w-5 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />}
                      label={t(item.translationKey)}
                    />
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
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
