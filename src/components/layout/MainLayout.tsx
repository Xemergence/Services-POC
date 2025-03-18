import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
  isLoggedIn?: boolean;
  userRole?: "customer" | "admin";
}

const MainLayout = ({
  children,
  isLoggedIn = false,
  userRole = "customer",
}: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
