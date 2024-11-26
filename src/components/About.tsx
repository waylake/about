import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-container py-section text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <h1 className="text-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400 transition-colors duration-300">
          Hello, I'm Waylake
        </h1>

        <p className="text-body-lg text-text-base dark:text-text-inverted leading-relaxed">
          A versatile developer covering frontend, backend, and DevOps. I enjoy
          solving complex problems efficiently, drawing from my experience with
          healthcare data.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/projects"
            className="
              inline-block
              px-8 py-3
              text-body font-medium
              bg-primary hover:bg-primary-600 
              dark:bg-primary-400 dark:hover:bg-primary-500
              text-white
              rounded-button
              shadow-card hover:shadow-card-hover
              transform transition-all duration-300
              animate-fade-in
            "
          >
            View Projects
          </Link>
        </motion.div>
      </motion.div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background-light/20 to-transparent dark:from-background-dark/20 backdrop-blur-sm" />
      </div>
    </motion.div>
  );
};

export default About;
