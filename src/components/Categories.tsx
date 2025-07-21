import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "Cookies",
    description: "Classic & gourmet cookies",
    emoji: "🍪",
    path: "/categories/cookies",
    color: "from-amber-400 to-orange-500"
  },
  {
    name: "Brownies",
    description: "Rich & fudgy brownies",
    emoji: "🧁",
    path: "/categories/brownies", 
    color: "from-amber-700 to-amber-900"
  },
  {
    name: "Popcorn",
    description: "Gourmet flavored popcorn",
    emoji: "🍿",
    path: "/categories/popcorn",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    name: "Ice Cakes",
    description: "Frozen delicious cakes",
    emoji: "🍰",
    path: "/categories/ice-cakes",
    color: "from-blue-400 to-purple-500"
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious range of handcrafted treats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} to={category.path}>
              <Card className="group hover:shadow-warm transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${category.color} p-8 text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                    <div className="relative z-10">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {category.emoji}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/90">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-card text-center">
                    <div className="text-primary font-semibold group-hover:text-primary-glow transition-colors duration-300">
                      Explore {category.name} →
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;