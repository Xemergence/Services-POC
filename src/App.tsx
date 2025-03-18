import { Suspense, lazy, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoadingSpinner from "./components/ui/loading-spinner";

// Lazy load components
const CustomerDashboard = lazy(
  () => import("./components/dashboard/CustomerDashboard"),
);
const AdminDashboard = lazy(
  () => import("./components/dashboard/AdminDashboard"),
);
const ProductCatalog = lazy(
  () => import("./components/products/ProductCatalog"),
);
const ProductDetails = lazy(
  () => import("./components/products/ProductDetails"),
);
const AppointmentsList = lazy(
  () => import("./components/appointments/AppointmentsList"),
);
const SchedulingCalendar = lazy(
  () => import("./components/scheduling/SchedulingCalendar"),
);
const UserProfile = lazy(() => import("./components/profile/UserProfile"));
const AuthForm = lazy(() => import("./components/auth/AuthForm"));

// Create placeholder pages for navigation
const ServicesPage = () => (
  <div className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-6">Our Services</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-3">AC Installation</h2>
        <p className="text-gray-600 mb-4">
          Professional installation of new air conditioning systems for
          residential and commercial spaces.
        </p>
        <img
          src="https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="AC Installation"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      </div>
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-3">AC Maintenance</h2>
        <p className="text-gray-600 mb-4">
          Regular maintenance services to ensure optimal performance and extend
          the life of your AC unit.
        </p>
        <img
          src="https://images.unsplash.com/photo-1580595999172-187fdd051bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="AC Maintenance"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      </div>
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-3">AC Repair</h2>
        <p className="text-gray-600 mb-4">
          Fast and reliable repair services for all types of air conditioning
          systems and issues.
        </p>
        <img
          src="https://images.unsplash.com/photo-1585770536735-27993a080586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="AC Repair"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-6">About Us</h1>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <p className="text-lg mb-4">
          CoolBreeze AC Solutions has been providing top-quality air
          conditioning services for over 15 years. Our team of certified
          technicians is dedicated to ensuring your comfort year-round.
        </p>
        <p className="text-lg mb-4">
          We pride ourselves on our commitment to customer satisfaction,
          technical excellence, and environmental responsibility.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
        <p className="text-lg">
          To provide reliable, efficient, and affordable air conditioning
          solutions that enhance the comfort and well-being of our customers
          while minimizing environmental impact.
        </p>
      </div>
      <div className="md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Our Team"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-6">
          Have questions or need to schedule a service? Reach out to us using
          the contact information below or fill out the form.
        </p>
        <div className="space-y-4">
          <p className="flex items-center">
            <span className="font-medium mr-2">Address:</span> 123 Cooling
            Street, Anytown, USA 12345
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2">Phone:</span> (555) 123-4567
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2">Email:</span>{" "}
            info@coolbreeze.example
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2">Hours:</span> Monday-Friday:
            8am-6pm, Saturday: 9am-2pm
          </p>
        </div>
      </div>
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full p-2 border rounded-md h-32"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"customer" | "admin">("customer");

  // Check if user is logged in from localStorage on app load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const savedUserRole = localStorage.getItem("userRole") as
      | "customer"
      | "admin"
      | null;

    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
      if (savedUserRole) {
        setUserRole(savedUserRole);
      }
    }
  }, []);

  // Handle login
  const handleLogin = (data: { email: string; password: string }) => {
    // For demo purposes, we'll just check if the email contains "admin"
    const isAdmin = data.email.includes("admin");
    setIsLoggedIn(true);
    setUserRole(isAdmin ? "admin" : "customer");

    // Save to localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", isAdmin ? "admin" : "customer");
    localStorage.setItem("userEmail", data.email);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("customer");

    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <>
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} userRole={userRole} />}
          />
          <Route
            path="/login"
            element={<AuthForm defaultTab="login" onLogin={handleLogin} />}
          />
          <Route path="/signup" element={<AuthForm defaultTab="signup" />} />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <CustomerDashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin"
            element={
              isLoggedIn && userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/appointments"
            element={
              isLoggedIn ? <AppointmentsList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/appointments/new"
            element={
              isLoggedIn ? <SchedulingCalendar /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />}
          />
          <Route path="/services/*" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
