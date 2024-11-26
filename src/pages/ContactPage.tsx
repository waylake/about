import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const ContactPage: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="text-center py-section"
    >
      <h2 className="text-h1 font-bold mb-10 text-primary dark:text-primary-400 transition-colors">
        Contact Me
      </h2>

      <div className="max-w-2xl mx-auto backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 p-8 rounded-lg shadow-card">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-6 hover:scale-105 transition-transform"
        >
          <Mail className="mr-2 text-primary dark:text-primary-400" size={24} />
          <a
            href="mailto:waylake2003@gmail.com"
            className="text-body-lg text-text-base-light dark:text-text-base-dark hover:text-secondary dark:hover:text-secondary-dark transition-colors"
          >
            waylake2003@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center mb-6 hover:scale-105 transition-transform"
        >
          <Phone
            className="mr-2 text-primary dark:text-primary-400"
            size={24}
          />
          <a
            href="tel:+821051722003"
            className="text-body-lg text-text-base-light dark:text-text-base-dark hover:text-secondary dark:hover:text-secondary-dark transition-colors"
          >
            +82 1051722003
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center hover:scale-105 transition-transform"
        >
          <MapPin
            className="mr-2 text-primary dark:text-primary-400"
            size={24}
          />
          <p className="text-body-lg text-text-base-light dark:text-text-base-dark">
            Seoul, South Korea
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
