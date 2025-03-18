import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Calendar,
  ShoppingCart,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink = ({ to, icon, label, active = false }: SidebarLinkProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to}>
            <Button
              variant={active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 mb-1",
                active ? "bg-secondary" : "hover:bg-secondary/50",
              )}
            >
              {icon}
              <span>{label}</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface DashboardSidebarProps {
  userType?: "customer" | "admin";
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const DashboardSidebar = ({
  userType = "customer",
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
}: DashboardSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define navigation links based on user type
  const customerLinks = [
    { to: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    { to: "/profile", icon: <User size={18} />, label: "My Profile" },
    {
      to: "/appointments",
      icon: <Calendar size={18} />,
      label: "My Appointments",
    },
    { to: "/products", icon: <ShoppingCart size={18} />, label: "AC Products" },
  ];

  const adminLinks = [
    { to: "/admin", icon: <Home size={18} />, label: "Dashboard" },
    { to: "/admin/users", icon: <User size={18} />, label: "User Management" },
    {
      to: "/admin/products",
      icon: <ShoppingCart size={18} />,
      label: "Product Management",
    },
    {
      to: "/admin/appointments",
      icon: <Calendar size={18} />,
      label: "Appointments",
    },
  ];

  const links = userType === "admin" ? adminLinks : customerLinks;

  return (
    <div className="h-full w-64 bg-background border-r flex flex-col">
      {/* User profile section */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">{userEmail}</span>
          </div>
        </div>
        <Separator className="my-4" />
      </div>

      {/* Navigation links */}
      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={currentPath === link.to}
            />
          ))}
        </nav>
      </div>

      {/* Bottom section with settings and logout */}
      <div className="p-4 mt-auto border-t">
        <nav className="space-y-1">
          <SidebarLink
            to="/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
          <SidebarLink
            to="/help"
            icon={<HelpCircle size={18} />}
            label="Help & Support"
          />
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
