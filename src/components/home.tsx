import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Snowflake,
  ThermometerSun,
  Wind,
  Zap,
  CheckCircle,
  Calendar,
  Star,
  X,
} from "lucide-react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import AuthForm from "./auth/AuthForm";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface HomeProps {
  isLoggedIn?: boolean;
  userRole?: "customer" | "admin";
}

const Home = ({ isLoggedIn = false, userRole = "customer" }: HomeProps) => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
  };

  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login data:", data);
    // In a real app, you would handle authentication here
    setShowAuthModal(false);

    // For demo purposes, we'll just check if the email contains "admin"
    const isAdmin = data.email.includes("admin");

    // Save to localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", isAdmin ? "admin" : "customer");
    localStorage.setItem("userEmail", data.email);

    // Redirect to dashboard
    navigate(isAdmin ? "/admin" : "/dashboard");
  };

  const handleSignup = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log("Signup data:", data);
    // In a real app, you would handle registration here

    // For demo purposes, we'll just log the user in
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "customer");
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userName", data.name);

    // Redirect to dashboard
    navigate("/dashboard");
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    // Redirect to home
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogin={handleLoginClick}
        onSignup={handleSignupClick}
        onLogout={handleLogout}
        cartItemCount={2}
        notificationCount={3}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Expert AC Installation & Maintenance Services
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Professional air conditioning solutions for your home or business.
              Stay cool with our reliable installation, maintenance, and repair
              services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/products">Browse AC Units</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/appointments/new">Schedule Service</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Modern AC unit"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer comprehensive AC solutions to keep your environment
              comfortable year-round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Snowflake className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AC Installation</CardTitle>
                <CardDescription>
                  Professional installation of new air conditioning systems for
                  residential and commercial spaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Expert technicians with years of experience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>All major brands and models supported</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Warranty on all installation services</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/services/installation">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <ThermometerSun className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AC Maintenance</CardTitle>
                <CardDescription>
                  Regular maintenance services to ensure optimal performance and
                  extend the life of your AC unit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Comprehensive system inspection and cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Filter replacement and refrigerant check</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Preventative maintenance plans available</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/services/maintenance">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AC Repair</CardTitle>
                <CardDescription>
                  Fast and reliable repair services for all types of air
                  conditioning systems and issues.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>24/7 emergency repair services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Diagnosis and repair of all AC problems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Genuine replacement parts guaranteed</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/services/repair">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our simple process makes it easy to get the AC services you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Choose Your Service
              </h3>
              <p className="text-muted-foreground">
                Browse our range of AC units or select the service you need from
                our comprehensive offerings.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Schedule an Appointment
              </h3>
              <p className="text-muted-foreground">
                Choose a convenient date and time for our technicians to visit
                your location.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Cool Comfort</h3>
              <p className="text-muted-foreground">
                Our experts will handle everything, ensuring your AC system
                works perfectly for your comfort.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/appointments/new">Schedule Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured AC Units</h2>
            <Button variant="outline" asChild>
              <Link to="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.title}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ${product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Wind className="h-4 w-4 mr-1" />
                      <span>{product.efficiency} Efficiency</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to={`/products/${product.id}`}>View Details</Link>
                  </Button>
                  <Button>
                    <Link to={`/products/${product.id}`}>Buy Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied
              customers have to say.
            </p>
          </div>

          <Tabs defaultValue="residential" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="residential">Residential</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
            </TabsList>
            <TabsContent value="residential" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {residentialTestimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="italic mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="commercial" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commercialTestimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="italic mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Superior AC Services?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Schedule an appointment today and enjoy a comfortable environment
            all year round.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">Browse AC Units</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
              asChild
            >
              <Link to="/appointments/new">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Service
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-gray-500 z-10"
                onClick={handleAuthClose}
              >
                <X className="h-5 w-5" />
              </Button>
              <AuthForm
                defaultTab={authType}
                onLogin={handleLogin}
                onSignup={handleSignup}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    title: "Premium AC Unit XC-5000",
    description: "High-efficiency split system with smart temperature control.",
    price: 1299.99,
    rating: 4.5,
    efficiency: "A+++",
    image:
      "https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    title: "Economy Window AC Unit",
    description: "Affordable window-mounted unit perfect for small rooms.",
    price: 499.99,
    rating: 4.0,
    efficiency: "A+",
    image:
      "https://images.unsplash.com/photo-1580595999172-187fdd051bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    title: "Deluxe Inverter AC System",
    description: "Advanced inverter technology for maximum energy efficiency.",
    price: 1899.99,
    rating: 4.8,
    efficiency: "A+++",
    image:
      "https://images.unsplash.com/photo-1585770536735-27993a080586?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

// Mock data for testimonials
const residentialTestimonials = [
  {
    name: "John Smith",
    location: "Anytown, USA",
    rating: 5,
    text: "The installation team was professional and efficient. My new AC unit works perfectly and has significantly reduced my energy bills.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    name: "Sarah Johnson",
    location: "Somewhere, USA",
    rating: 4,
    text: "Great service from start to finish. The technicians were knowledgeable and took the time to explain everything about my new system.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
];

const commercialTestimonials = [
  {
    name: "Robert Williams",
    company: "Williams Retail Group",
    rating: 5,
    text: "CoolBreeze installed AC systems across all our retail locations. The service was consistent and the systems have been reliable for years.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
  },
  {
    name: "Emily Davis",
    company: "Davis & Associates",
    rating: 5,
    text: "As a property management company, we rely on CoolBreeze for all our HVAC needs. Their response time and quality of work is unmatched.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
  },
];

export default Home;
