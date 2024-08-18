import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getThemeIcon = () => {
    return effectiveTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />;
  };

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <header className="p-4 transition-colors duration-300 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-primary-600 dark:text-primary-400"
        >
          Waylake
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="hover:text-secondary-400 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                className="hover:text-secondary-400 transition-colors"
                title={`Switch to ${effectiveTheme === "light" ? "dark" : "light"} mode`}
              >
                {getThemeIcon()}
              </button>
            </li>
          </ul>
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-600 dark:text-primary-400 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg" />
            <nav className="relative z-50 h-full flex flex-col items-center justify-center text-black dark:text-gray-300">
              {menuItems.map((item) => (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.to}
                    className="text-2xl py-4 hover:text-secondary-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="mt-4 text-2xl py-4 hover:text-secondary-400 transition-colors"
              >
                {getThemeIcon()}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
