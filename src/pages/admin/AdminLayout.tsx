
import { useEffect } from "react";
import { Outlet, Navigate, useNavigate, Link } from "react-router-dom";
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
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminLayout = () => {
  const { user, isAdmin, logout } = useAuth();
  const { language, setLanguage, t, dir } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // If not logged in or not an admin, redirect to login
  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex" dir={dir}>
        {/* Sidebar */}
        <Sidebar className="hidden md:flex bg-news-primary">
          <SidebarHeader>
            <div className="p-4 flex items-center justify-between">
              <Link to="/" className="text-xl font-bold flex items-center gap-2 text-black">
                NewsWatcher
              </Link>
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
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-black opacity-80">{t("common.home")}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-black hover:text-black">
                      <Link to="/admin">
                        <LayoutDashboard className="h-5 w-5 mr-2" />
                        <span>{t("admin.dashboard")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-black hover:text-black">
                      <Link to="/admin/articles">
                        <FileText className="h-5 w-5 mr-2" />
                        <span>{t("admin.articles")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-black hover:text-black">
                      <Link to="/admin/articles/create">
                        <PlusCircle className="h-5 w-5 mr-2" />
                        <span>{t("admin.createArticle")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-black hover:text-black">
                      <Link to="/admin/reported">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        <span>{t("admin.reportedContent")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-black hover:text-black">
                      <Link to="/admin/comments">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        <span>{t("admin.comments")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-black hover:text-black">
                      <Link to="/">
                        <Home className="h-5 w-5 mr-2" />
                        <span>{t("common.viewSite")}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
        
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-news-primary z-50 border-b border-news-primary/20">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">NewsWatcher</Link>
            <div className="flex items-center gap-2">
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
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="bg-news-primary">
              <nav className="px-4 py-3 space-y-2">
                <Link 
                  to="/admin" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  <span>{t("admin.dashboard")}</span>
                </Link>
                <Link 
                  to="/admin/articles" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  <span>{t("admin.articles")}</span>
                </Link>
                <Link 
                  to="/admin/articles/create" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  <span>{t("admin.createArticle")}</span>
                </Link>
                <Link 
                  to="/admin/reported" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>{t("admin.reportedContent")}</span>
                </Link>
                <Link 
                  to="/admin/comments" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>{t("admin.comments")}</span>
                </Link>
                <Link 
                  to="/" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5 mr-2" />
                  <span>{t("common.viewSite")}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md w-full text-left text-black"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>{t("common.logout")}</span>
                </button>
              </nav>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="md:hidden h-14"></div> {/* Spacer for mobile header */}
          <main className="flex-1 p-4 md:p-8 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
