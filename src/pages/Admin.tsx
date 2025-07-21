import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Eye,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sampleProducts } from "@/data/products";

interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
  date: string;
}

interface User {
  id: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "blocked";
}

const Admin = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for admin dashboard
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "John Doe",
      email: "john@example.com",
      total: 45.99,
      status: "pending",
      items: 3,
      date: "2024-01-20"
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      total: 32.50,
      status: "shipped",
      items: 2,
      date: "2024-01-19"
    },
    {
      id: "ORD-003",
      customerName: "Bob Johnson",
      email: "bob@example.com",
      total: 78.25,
      status: "delivered",
      items: 5,
      date: "2024-01-18"
    }
  ]);

  const [users] = useState<User[]>([
    {
      id: "USR-001",
      firstName: "John Doe",
      email: "john@example.com",
      phoneNumber: "+1-555-0123",
      joinDate: "2024-01-15",
      totalOrders: 3,
      totalSpent: 156.74,
      status: "active"
    },
    {
      id: "USR-002",
      firstName: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "+1-555-0124",
      joinDate: "2024-01-10",
      totalOrders: 7,
      totalSpent: 298.50,
      status: "active"
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from inventory.",
    });
  };

  const toggleUserStatus = (userId: string) => {
    toast({
      title: "User Status Updated",
      description: "User status has been changed.",
    });
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(o => o.status === "pending").length,
    lowStock: products.filter(p => p.stock < 20).length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-accent text-accent-foreground shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-primary-glow">
                🍪 CookieStore Admin
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, Admin</span>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                      <p className="text-2xl font-bold">{stats.totalProducts}</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    Add Product
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    View Orders
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts & Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <span>📦 {stats.lowStock} products are low in stock</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span>📋 {stats.pendingOrders} orders pending processing</span>
                  <Button variant="outline" size="sm">Process</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Product Management</h1>
              <Button variant="warm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Products Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4">Product</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Stock</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 10).map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 capitalize">{product.category}</td>
                          <td className="p-4">${product.price}</td>
                          <td className="p-4">
                            <Badge variant={product.stock < 20 ? "destructive" : "default"}>
                              {product.stock}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                              {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h1 className="text-3xl font-bold">Order Management</h1>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4">Order ID</th>
                        <th className="text-left p-4">Customer</th>
                        <th className="text-left p-4">Items</th>
                        <th className="text-left p-4">Total</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-4 font-medium">{order.id}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{order.customerName}</p>
                              <p className="text-sm text-muted-foreground">{order.email}</p>
                            </div>
                          </td>
                          <td className="p-4">{order.items}</td>
                          <td className="p-4">${order.total}</td>
                          <td className="p-4">
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value as Order["status"])}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-4">{order.date}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <h1 className="text-3xl font-bold">User Management</h1>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4">User</th>
                        <th className="text-left p-4">Contact</th>
                        <th className="text-left p-4">Join Date</th>
                        <th className="text-left p-4">Orders</th>
                        <th className="text-left p-4">Total Spent</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{user.firstName}</p>
                              <p className="text-sm text-muted-foreground">{user.id}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p>{user.email}</p>
                              <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
                            </div>
                          </td>
                          <td className="p-4">{user.joinDate}</td>
                          <td className="p-4">{user.totalOrders}</td>
                          <td className="p-4">${user.totalSpent}</td>
                          <td className="p-4">
                            <Badge variant={user.status === "active" ? "default" : "destructive"}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => toggleUserStatus(user.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Today's Sales:</span>
                      <span className="font-bold">$234.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Week:</span>
                      <span className="font-bold">$1,456.75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month:</span>
                      <span className="font-bold">$5,678.90</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Selling Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Cookies:</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Brownies:</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ice Cakes:</span>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Popcorn:</span>
                      <span className="font-bold">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;