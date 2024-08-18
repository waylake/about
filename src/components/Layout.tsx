import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../contexts/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme} text-base dark:text-inverted transition-colors duration-300 ease-in-out`}
    >
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url(/background.jpg)" }}
      >
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
