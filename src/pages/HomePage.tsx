import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const HomePage: React.FC = () => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex justify-between px-12 py-20"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            Who am I?
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            I'm a software developer specializing in web development, DevOps,
            and clinical trial data management. With expertise in Python,
            JavaScript, AWS, and more, I build scalable solutions for complex
            projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            Latest Work
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Recently, I developed an LLM model API server, automated
            infrastructure with Terraform, and migrated legacy systems to modern
            architectures like React and Express.
          </p>
          <Link
            to="/projects"
            className="mt-6 inline-block bg-secondary-500 text-inverted px-6 py-2 rounded-full hover:bg-secondary-600 transition-colors duration-300 shadow-lg"
          >
            View Projects
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default HomePage;
