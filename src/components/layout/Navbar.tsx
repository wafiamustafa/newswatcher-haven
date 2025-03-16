
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Newspaper, 
  Search, 
  Menu, 
  X, 
  User,
  LogOut,
  Globe
} from "lucide-react";
import { getCategories } from "@/services/articleService";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { language, setLanguage, t, dir } = useLanguage();
  
  const categories = getCategories();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, navigate to search results
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Newspaper className="mr-2 h-6 w-6 text-news-primary" />
              <span className="text-xl font-bold text-news-primary">NewsWatcher</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t("common.home")}
            </Link>
            {categories.map((category) => (
              <Link 
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {category}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex relative w-60">
              <Input
                type="search"
                placeholder={t("common.search")}
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English {language === "en" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>
                  العربية {language === "ar" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t("common.home")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      {t("admin.dashboard")}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("common.logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">{t("common.login")}</Link>
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex relative">
              <Input
                type="search"
                placeholder={t("common.search")}
                className="pr-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("common.home")}
              </Link>
              {categories.map((category) => (
                <Link 
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
