import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ShoppingCart,
  Bell,
  ChevronRight,
  ArrowRight,
  ThermometerSun,
  Zap,
  Clock,
  Wrench,
} from "lucide-react";

import DashboardSidebar from "./DashboardSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface CustomerDashboardProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  upcomingAppointments?: Array<{
    id: string;
    date: Date;
    time: string;
    service: string;
    status: "scheduled" | "completed" | "cancelled";
  }>;
  recentPurchases?: Array<{
    id: string;
    name: string;
    price: number;
    date: Date;
    image?: string;
  }>;
  notifications?: Array<{
    id: string;
    message: string;
    date: Date;
    read: boolean;
  }>;
}

const CustomerDashboard = ({
  user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  upcomingAppointments = [
    {
      id: "apt-1",
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      time: "10:00 AM - 12:00 PM",
      service: "AC Installation",
      status: "scheduled",
    },
    {
      id: "apt-2",
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      time: "2:30 PM - 4:30 PM",
      service: "AC Maintenance",
      status: "scheduled",
    },
  ],
  recentPurchases = [
    {
      id: "prod-1",
      name: "Premium AC Unit XC-5000",
      price: 1299.99,
      date: new Date(Date.now() - 86400000 * 10), // 10 days ago
      image:
        "https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
  ],
  notifications = [
    {
      id: "notif-1",
      message:
        "Your AC installation appointment is confirmed for tomorrow at 10:00 AM.",
      date: new Date(Date.now() - 86400000), // 1 day ago
      read: false,
    },
    {
      id: "notif-2",
      message:
        "Your recent purchase has been shipped and will arrive in 3-5 business days.",
      date: new Date(Date.now() - 86400000 * 3), // 3 days ago
      read: true,
    },
  ],
}: CustomerDashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Format date to readable string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days until next appointment
  const getNextAppointmentDays = () => {
    if (upcomingAppointments.length === 0) return null;

    const nextAppointment = upcomingAppointments.sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    )[0];
    const daysUntil = Math.ceil(
      (nextAppointment.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    return {
      days: daysUntil,
      appointment: nextAppointment,
    };
  };

  const nextAppointmentInfo = getNextAppointmentDays();
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar
        userType="customer"
        userName={user.name}
        userEmail={user.email}
        userAvatar={user.avatar}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.name.split(" ")[0]}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="relative"
                onClick={() => navigate("/notifications")}
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              <Button onClick={() => navigate("/appointments/new")}>
                Schedule Service
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="overview"
            className="mb-8"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Next Appointment Card */}
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      Next Appointment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {nextAppointmentInfo ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">
                            {nextAppointmentInfo.days}
                          </span>
                          <span className="text-muted-foreground">
                            days away
                          </span>
                        </div>
                        <p className="mt-2 text-sm">
                          {formatDate(nextAppointmentInfo.appointment.date)} at{" "}
                          {nextAppointmentInfo.appointment.time}
                        </p>
                        <p className="text-sm font-medium">
                          {nextAppointmentInfo.appointment.service}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">
                          No upcoming appointments
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => navigate("/appointments")}
                    >
                      View All Appointments
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* Recent Purchase Card */}
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
                      Recent Purchase
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentPurchases.length > 0 ? (
                      <div>
                        <div className="flex items-center gap-3">
                          {recentPurchases[0].image && (
                            <div className="h-12 w-12 rounded overflow-hidden">
                              <img
                                src={recentPurchases[0].image}
                                alt={recentPurchases[0].name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium truncate">
                              {recentPurchases[0].name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${recentPurchases[0].price.toFixed(2)} •{" "}
                              {formatDate(recentPurchases[0].date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">
                          No recent purchases
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => navigate("/products")}
                    >
                      Browse Products
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* AC Health Card */}
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <ThermometerSun className="h-5 w-5 mr-2 text-primary" />
                      AC Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Filter Status</span>
                          <span className="text-sm font-medium">Good</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Efficiency</span>
                          <span className="text-sm font-medium">Excellent</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => navigate("/maintenance")}
                    >
                      Schedule Maintenance
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Recommended Services */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Recommended Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Seasonal Tune-Up
                      </CardTitle>
                      <CardDescription>
                        Prepare your AC for optimal performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span>60-90 minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4" />
                        <span>Improves efficiency by up to 15%</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Filter Replacement
                      </CardTitle>
                      <CardDescription>
                        Ensure clean air and efficient operation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span>15-30 minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4" />
                        <span>Recommended every 60-90 days</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Duct Cleaning</CardTitle>
                      <CardDescription>
                        Remove dust and allergens from your system
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span>3-5 hours</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4" />
                        <span>Recommended every 3-5 years</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* Recent Notifications */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Recent Notifications
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/notifications")}
                  >
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <Card className="bg-white">
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {notifications.length > 0 ? (
                        notifications.slice(0, 3).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 ${!notification.read ? "bg-primary/5" : ""}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-3">
                                <Bell
                                  className={`h-5 w-5 mt-0.5 ${!notification.read ? "text-primary" : "text-muted-foreground"}`}
                                />
                                <div>
                                  <p
                                    className={`${!notification.read ? "font-medium" : ""}`}
                                  >
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.date.toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                      },
                                    )}
                                  </p>
                                </div>
                              </div>
                              {!notification.read && (
                                <Badge variant="secondary" className="ml-2">
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center">
                          <p className="text-muted-foreground">
                            No notifications
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appointments Tab Content */}
            <TabsContent value="appointments" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled AC services</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {appointment.service}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(appointment.date)} •{" "}
                                {appointment.time}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/appointments/${appointment.id}`)
                            }
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No Appointments
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        You don't have any upcoming appointments scheduled.
                      </p>
                      <Button onClick={() => navigate("/appointments/new")}>
                        Schedule Now
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/appointments/history")}
                  >
                    View History
                  </Button>
                  <Button onClick={() => navigate("/appointments/new")}>
                    Schedule New Appointment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Purchases Tab Content */}
            <TabsContent value="purchases" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Your Purchases</CardTitle>
                  <CardDescription>
                    AC units and accessories you've purchased
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentPurchases.length > 0 ? (
                    <div className="space-y-4">
                      {recentPurchases.map((purchase) => (
                        <div
                          key={purchase.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            {purchase.image && (
                              <div className="h-16 w-16 rounded overflow-hidden">
                                <img
                                  src={purchase.image}
                                  alt={purchase.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <h3 className="font-medium">{purchase.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                ${purchase.price.toFixed(2)} • Purchased on{" "}
                                {formatDate(purchase.date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(`/products/${purchase.id}`)
                              }
                            >
                              View Product
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(`/maintenance/${purchase.id}`)
                              }
                            >
                              <Wrench className="h-4 w-4 mr-1" />
                              Maintenance
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Purchases</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't made any purchases yet.
                      </p>
                      <Button onClick={() => navigate("/products")}>
                        Browse Products
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/products")}
                  >
                    Browse More Products
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
