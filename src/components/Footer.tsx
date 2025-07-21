import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-3xl font-bold text-primary-glow">
                🍪 CookieStore
              </div>
            </div>
            <p className="text-accent-foreground/80 mb-6 max-w-md">
              We're passionate about creating the most delicious cookies, brownies, and treats. 
              Made fresh daily with love and the finest ingredients.
            </p>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary-glow">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary-glow">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary-glow">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary-glow">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-accent-foreground/80 hover:text-primary-glow transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-accent-foreground/80 hover:text-primary-glow transition-colors duration-300">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories/cookies" className="text-accent-foreground/80 hover:text-primary-glow transition-colors duration-300">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/categories/brownies" className="text-accent-foreground/80 hover:text-primary-glow transition-colors duration-300">
                  Brownies
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-accent-foreground/80 hover:text-primary-glow transition-colors duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary-glow">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-accent-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-accent-foreground/80">hello@cookiestore.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-accent-foreground/80">123 Baker Street, Sweet City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-accent-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-accent-foreground/60 text-sm mb-4 md:mb-0">
              © 2024 CookieStore. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-accent-foreground/60 hover:text-primary-glow transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-accent-foreground/60 hover:text-primary-glow transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-accent-foreground/60 hover:text-primary-glow transition-colors duration-300">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;