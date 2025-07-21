import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3); // Mock cart items count

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">
              🍪 CookieStore
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors duration-300">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors duration-300">
              Products
            </Link>
            <Link to="/categories/cookies" className="text-foreground hover:text-primary transition-colors duration-300">
              Cookies
            </Link>
            <Link to="/categories/brownies" className="text-foreground hover:text-primary transition-colors duration-300">
              Brownies
            </Link>
            <Link to="/categories/popcorn" className="text-foreground hover:text-primary transition-colors duration-300">
              Popcorn
            </Link>
            <Link to="/categories/ice-cakes" className="text-foreground hover:text-primary transition-colors duration-300">
              Ice Cakes
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-gentle">
                    {cartItems}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/products">
              <Button variant="warm" size="sm">
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border/50 shadow-soft">
            <nav className="py-4 space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link 
                to="/categories/cookies" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300"
                onClick={toggleMenu}
              >
                Cookies
              </Link>
              <Link 
                to="/categories/brownies" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300"
                onClick={toggleMenu}
              >
                Brownies
              </Link>
              <Link 
                to="/categories/popcorn" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300"
                onClick={toggleMenu}
              >
                Popcorn
              </Link>
              <Link 
                to="/categories/ice-cakes" 
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300"
                onClick={toggleMenu}
              >
                Ice Cakes
              </Link>
              
              <div className="flex items-center justify-around pt-4 border-t border-border/50">
                <Link to="/wishlist" onClick={toggleMenu}>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                </Link>
                <Link to="/cart" onClick={toggleMenu}>
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                    {cartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="warm" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;