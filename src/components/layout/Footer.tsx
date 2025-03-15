
import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { getCategories } from "@/services/articleService";

const Footer = () => {
  const categories = getCategories();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-news-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Newspaper className="mr-2 h-6 w-6" />
              <span className="text-xl font-bold">NewsWatcher</span>
            </div>
            <p className="text-sm opacity-80">
              Delivering accurate and timely news across various categories to keep you informed about what matters most.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link 
                    to={`/category/${category.toLowerCase()}`}
                    className="text-sm opacity-80 hover:opacity-100"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm opacity-80 hover:opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm opacity-80 hover:opacity-100">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm opacity-80 hover:opacity-100">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-sm opacity-80 hover:opacity-100">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm opacity-80 hover:opacity-100">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm opacity-80 hover:opacity-100">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-sm opacity-80 hover:opacity-100">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-sm opacity-80">
            © {currentYear} NewsWatcher. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
