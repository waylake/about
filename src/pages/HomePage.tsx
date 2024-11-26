import React from "react";
import { motion } from "framer-motion";

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
        className="flex flex-col justify-between px-container py-section space-y-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <h2 className="text-h2 font-bold text-primary dark:text-primary-400 transition-colors">
            Who am I?
          </h2>
          <p className="mt-4 text-body-lg text-text-base-light dark:text-text-base-dark backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 p-4 rounded-lg shadow-card">
            I'm a software developer specializing in web development, DevOps,
            and clinical trial data management. With expertise in Python,
            JavaScript, AWS, and more, I build scalable solutions for complex
            projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md self-end"
        >
          <h2 className="text-h2 font-bold text-primary dark:text-primary-400">
            MBTI: INTP
          </h2>
          <h3 className="text-h4 font-semibold mt-2 text-secondary dark:text-secondary-dark">
            "The Contemplative Craftsman"
          </h3>
          <p className="mt-4 text-body-lg text-text-base-light dark:text-text-base-dark backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 p-4 rounded-lg shadow-card">
            As an INTP, I'm an innovative thinker with an insatiable thirst for
            knowledge. I excel at solving complex problems through logical
            reasoning and creative ideation. My ability to think outside the box
            allows me to craft unique solutions and push the boundaries of
            what's possible.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default HomePage;
