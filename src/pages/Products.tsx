import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingCart, Star, Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sampleProducts } from "@/data/products";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  useEffect(() => {
    let filtered = [...sampleProducts];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Apply price filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-15":
          filtered = filtered.filter(product => product.price < 15);
          break;
        case "15-25":
          filtered = filtered.filter(product => product.price >= 15 && product.price <= 25);
          break;
        case "25-40":
          filtered = filtered.filter(product => product.price >= 25 && product.price <= 40);
          break;
        case "over-40":
          filtered = filtered.filter(product => product.price > 40);
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    setProducts(filtered);
  }, [searchTerm, sortBy, filterCategory, priceRange]);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of handcrafted treats
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cookies">Cookies</SelectItem>
                <SelectItem value="brownies">Brownies</SelectItem>
                <SelectItem value="popcorn">Popcorn</SelectItem>
                <SelectItem value="ice-cakes">Ice Cakes</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-15">Under $15</SelectItem>
                <SelectItem value="15-25">$15 - $25</SelectItem>
                <SelectItem value="25-40">$25 - $40</SelectItem>
                <SelectItem value="over-40">Over $40</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
                setPriceRange("all");
                setSortBy("newest");
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {products.length} of {sampleProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
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

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        New
                      </div>
                    )}
                    {product.isBestSeller && (
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        Best Seller
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-semibold">
                        SALE
                      </div>
                    )}
                  </div>

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

                  <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>

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
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.stock}
                    </span>
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

        {/* No Results */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
                setPriceRange("all");
                setSortBy("newest");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;