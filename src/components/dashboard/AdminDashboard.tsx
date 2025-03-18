import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  BarChart,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Bell,
  Settings,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Percent,
} from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import UserManagement from "../admin/UserManagement";
import ProductManagement from "../admin/ProductManagement";
import AppointmentManagement from "../admin/AppointmentManagement";
import Analytics from "../admin/Analytics";
import NotificationManagement from "../admin/NotificationManagement";

interface DashboardStat {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface AdminDashboardProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  activeTab?: string;
}

const AdminDashboard = ({
  userName = "Admin User",
  userEmail = "admin@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  activeTab = "dashboard",
}: AdminDashboardProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [searchQuery, setSearchQuery] = useState("");

  const dashboardStats: DashboardStat[] = [
    {
      title: "Total Users",
      value: "1,248",
      change: 12.5,
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Total Sales",
      value: "$48,592",
      change: 8.2,
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Appointments",
      value: "324",
      change: -3.1,
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Products Sold",
      value: "156",
      change: 14.2,
      icon: <ShoppingCart className="h-5 w-5 text-orange-500" />,
    },
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case "dashboard":
        return renderDashboardContent();
      case "users":
        return <UserManagement />;
      case "products":
        return <ProductManagement />;
      case "appointments":
        return <AppointmentManagement />;
      case "analytics":
        return <Analytics />;
      case "notifications":
        return <NotificationManagement />;
      case "settings":
        return renderSettingsContent();
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight mt-1">
                      {stat.value}
                    </h3>
                  </div>
                  <div className="rounded-full bg-muted p-2">{stat.icon}</div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.change > 0 ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      {stat.change}%
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                      {Math.abs(stat.change)}%
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground ml-2">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">
                Revenue Overview
              </CardTitle>
              <Tabs defaultValue="weekly" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full flex items-center justify-center">
                <BarChart className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Revenue chart visualization would go here
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-md font-medium">
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: <Users className="h-4 w-4" />,
                    description: "New user registered",
                    time: "2 minutes ago",
                  },
                  {
                    icon: <ShoppingCart className="h-4 w-4" />,
                    description: "New order placed",
                    time: "1 hour ago",
                  },
                  {
                    icon: <Calendar className="h-4 w-4" />,
                    description: "Appointment scheduled",
                    time: "3 hours ago",
                  },
                  {
                    icon: <DollarSign className="h-4 w-4" />,
                    description: "Payment received",
                    time: "5 hours ago",
                  },
                  {
                    icon: <Activity className="h-4 w-4" />,
                    description: "System update completed",
                    time: "1 day ago",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 mt-0.5 rounded-full bg-primary/10 p-1">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-md font-medium">
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Premium AC Unit XC-5000",
                    sales: 42,
                    revenue: "$54,600",
                  },
                  {
                    name: "Smart Thermostat Pro",
                    sales: 38,
                    revenue: "$15,200",
                  },
                  {
                    name: "Air Purifier System",
                    sales: 27,
                    revenue: "$13,500",
                  },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.sales} units sold
                      </p>
                    </div>
                    <p className="text-sm font-medium">{product.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md font-medium">
                Customer Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[180px]">
                <div className="relative h-40 w-40 flex items-center justify-center">
                  <svg
                    className="h-full w-full"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="stroke-muted-foreground/20"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      strokeWidth="10"
                    />
                    <circle
                      className="stroke-primary"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      strokeWidth="10"
                      strokeDasharray="282.7"
                      strokeDashoffset="56.5"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">80%</span>
                    <span className="text-xs text-muted-foreground">
                      Satisfaction Rate
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium">4.7/5</p>
                    <p className="text-xs text-muted-foreground">
                      Average Rating
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">92%</p>
                    <p className="text-xs text-muted-foreground">
                      Would Recommend
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md font-medium">
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    customer: "John Smith",
                    service: "AC Installation",
                    date: "Today, 2:30 PM",
                  },
                  {
                    customer: "Emily Johnson",
                    service: "AC Maintenance",
                    date: "Tomorrow, 10:00 AM",
                  },
                  {
                    customer: "Michael Brown",
                    service: "AC Repair",
                    date: "Jul 15, 1:15 PM",
                  },
                ].map((appointment, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 mt-0.5 rounded-full bg-primary/10 p-1">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {appointment.customer}
                      </p>
                      <p className="text-xs">{appointment.service}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Appointments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderSettingsContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Settings panel would go here. This is a placeholder.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        userType="admin"
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] sm:w-[300px] pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
