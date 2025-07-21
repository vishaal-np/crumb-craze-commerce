import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star } from "lucide-react";
import featuredImage from "@/assets/featured-cookies.jpg";

// Mock product data
const featuredProducts = [
  {
    id: 1,
    name: "Classic Chocolate Chip",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviews: 245,
    image: featuredImage,
    category: "cookies",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Double Fudge Brownie",
    price: 8.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 189,
    image: featuredImage,
    category: "brownies",
    badge: "New"
  },
  {
    id: 3,
    name: "Oatmeal Raisin Delight",
    price: 10.99,
    originalPrice: 13.99,
    rating: 4.7,
    reviews: 156,
    image: featuredImage,
    category: "cookies",
    badge: null
  },
  {
    id: 4,
    name: "Caramel Popcorn Mix",
    price: 14.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 98,
    image: featuredImage,
    category: "popcorn",
    badge: "Popular"
  }
];

const FeaturedProducts = () => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved treats, carefully crafted with premium ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-warm transition-all duration-300 hover:scale-105 border-0 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-white/90 hover:bg-white h-8 w-8"
                      onClick={() => toggleLike(product.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${likedProducts.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </Button>
                    <Button 
                      variant="cart" 
                      size="icon" 
                      className="h-8 w-8"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sale Overlay */}
                  {product.originalPrice && (
                    <div className="absolute bottom-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-semibold">
                      SALE
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="warm" size="lg" className="px-8">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;