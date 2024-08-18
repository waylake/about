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
      className="text-center py-20"
    >
      <h2 className="text-4xl font-bold mb-10 text-primary-600 dark:text-primary-400 transition-colors">
        Contact Me
      </h2>
      <div className="max-w-2xl mx-auto transition-colors">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <Mail className="mr-2" size={24} />
          <a
            href="mailto:waylake2003@gmail.com"
            className="hover:text-secondary-500 transition-colors"
          >
            waylake2003@gmail.com
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <Phone className="mr-2" size={24} />
          <a
            href="tel:+821051722003"
            className="hover:text-secondary-500 transition-colors"
          >
            +82 1051722003
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <MapPin className="mr-2" size={24} />
          <p>Seoul, South Korea</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
