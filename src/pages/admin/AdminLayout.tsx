
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileMenu } from "@/components/admin/AdminMobileMenu";

const AdminLayout = () => {
  const { user, isAdmin, logout } = useAuth();
  const { dir } = useLanguage();
  const navigate = useNavigate();
  
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
      <div className={`min-h-screen w-full flex overflow-hidden`} dir={dir}>
        {/* Desktop Sidebar - will be positioned based on the dir attribute */}
        <AdminSidebar handleLogout={handleLogout} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-x-hidden">
          {/* Mobile Header & Menu */}
          <AdminMobileMenu handleLogout={handleLogout} />
          
          <main className="flex-1 p-4 md:p-8 bg-gray-50 w-full max-w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
