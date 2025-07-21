import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-cookies.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Freshly Baked
            <span className="block text-primary-glow">Delicious Cookies</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Indulge in our handcrafted cookies, brownies, and treats made with love and the finest ingredients
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 animate-glow">
                🛒 Shop Now
              </Button>
            </Link>
            
            <Link to="/categories/cookies">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                View Menu
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white border border-white/30">
              ✨ Fresh Daily
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white border border-white/30">
              🚚 Free Delivery
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white border border-white/30">
              🌟 Premium Quality
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce-gentle">
        <div className="text-center">
          <div className="text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto">
            <div className="w-1 h-3 bg-white/60 rounded-full mx-auto mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;