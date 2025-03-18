import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, ShoppingCart, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  isLoggedIn?: boolean;
  userRole?: "customer" | "admin";
  cartItemCount?: number;
  notificationCount?: number;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
}

const Navbar = ({
  isLoggedIn = false,
  userRole = "customer",
  cartItemCount = 0,
  notificationCount = 0,
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {},
}: NavbarProps) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const userNavLinks =
    userRole === "admin"
      ? [
          { name: "Dashboard", path: "/admin" },
          { name: "User Management", path: "/admin/users" },
          { name: "Product Management", path: "/admin/products" },
          { name: "Appointments", path: "/admin/appointments" },
          { name: "Analytics", path: "/admin/analytics" },
          { name: "Notifications", path: "/admin/notifications" },
        ]
      : [
          { name: "My Dashboard", path: "/dashboard" },
          { name: "My Profile", path: "/profile" },
          { name: "My Appointments", path: "/appointments" },
          { name: "Order History", path: "/orders" },
        ];

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">CoolBreeze</span>
          <span className="text-sm ml-2 text-muted-foreground">
            AC Solutions
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div
            className={cn(
              "relative",
              isSearchOpen ? "flex-1 md:flex-none" : "hidden md:block",
            )}
          >
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-full md:w-[200px] h-9"
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          {isLoggedIn && (
            <Link
              to="/cart"
              onClick={(e) => {
                e.preventDefault();
                navigate("/cart");
              }}
            >
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                    variant="destructive"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          {/* Notifications */}
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                      variant="destructive"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <div className="p-4 text-center">
                  {notificationCount > 0 ? (
                    <p>You have {notificationCount} unread notifications</p>
                  ) : (
                    <p>No new notifications</p>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* User Menu */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userNavLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.path}
                    asChild
                    onClick={() => navigate(link.path)}
                  >
                    <Link to={link.path}>{link.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={onLogout} className="text-red-500">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" onClick={onLogin}>
                Login
              </Button>
              <Button onClick={onSignup}>Sign Up</Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <span className="text-xl font-bold">Menu</span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col space-y-4 py-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.path}>
                      <Link
                        to={link.path}
                        className="text-base font-medium py-2 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto pb-6">
                  {!isLoggedIn ? (
                    <div className="flex flex-col space-y-3">
                      <Button
                        variant="outline"
                        onClick={onLogin}
                        className="w-full"
                      >
                        Login
                      </Button>
                      <Button onClick={onSignup} className="w-full">
                        Sign Up
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <div className="border-t border-gray-200 pt-4 mb-2">
                        <p className="text-sm font-medium mb-3">Account</p>
                        {userNavLinks.map((link) => (
                          <SheetClose asChild key={link.path}>
                            <Link
                              to={link.path}
                              className="block text-sm py-2 hover:text-primary transition-colors"
                            >
                              {link.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                      <Button
                        variant="destructive"
                        onClick={onLogout}
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
