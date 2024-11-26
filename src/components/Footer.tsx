import React from "react";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Github size={20} />, url: "https://github.com/waylake" },
    { icon: <Mail size={20} />, url: "mailto:waylake2003@gmail.com" },
  ];

  return (
    <footer className="py-8 mt-auto">
      <div className="container mx-auto px-container">
        <div className="backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 rounded-lg p-6 shadow-card">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-body text-text-base-light dark:text-text-base-dark"
            >
              &copy; 2024 Waylake Portfolio. All rights reserved.
            </motion.p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-base-light dark:text-text-base-dark hover:text-primary dark:hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
