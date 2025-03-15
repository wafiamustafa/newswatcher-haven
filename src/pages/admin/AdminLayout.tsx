
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
  X
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
import { useState } from "react";

const AdminLayout = () => {
  const { user, isAdmin, logout } = useAuth();
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
      <div className="min-h-screen w-full flex">
        {/* Sidebar */}
        <Sidebar className="hidden md:flex bg-news-primary text-white">
          <SidebarHeader>
            <div className="p-4">
              <Link to="/" className="text-xl font-bold flex items-center gap-2 text-white">
                NewsWatcher
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-white opacity-80">Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:text-white">
                      <Link to="/admin">
                        <LayoutDashboard className="h-5 w-5 mr-2" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:text-white">
                      <Link to="/admin/articles">
                        <FileText className="h-5 w-5 mr-2" />
                        <span>Articles</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:text-white">
                      <Link to="/admin/articles/create">
                        <PlusCircle className="h-5 w-5 mr-2" />
                        <span>Create Article</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:text-white">
                      <Link to="/admin/reported">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        <span>Reported Content</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:text-white">
                      <Link to="/admin/comments">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        <span>Comments</span>
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
                    <SidebarMenuButton asChild className="text-white hover:text-white">
                      <Link to="/">
                        <Home className="h-5 w-5 mr-2" />
                        <span>View Site</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} className="text-white hover:text-white">
                      <LogOut className="h-5 w-5 mr-2" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-news-primary text-white z-50 border-b border-news-primary/20">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">NewsWatcher</Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-news-primary/50"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="bg-news-primary">
              <nav className="px-4 py-3 space-y-2">
                <Link 
                  to="/admin" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/admin/articles" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  <span>Articles</span>
                </Link>
                <Link 
                  to="/admin/articles/create" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  <span>Create Article</span>
                </Link>
                <Link 
                  to="/admin/reported" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>Reported Content</span>
                </Link>
                <Link 
                  to="/admin/comments" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Comments</span>
                </Link>
                <Link 
                  to="/" 
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5 mr-2" />
                  <span>View Site</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center p-2 hover:bg-news-primary/50 rounded-md w-full text-left"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
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

