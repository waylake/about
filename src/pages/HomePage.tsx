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
        className="flex flex-col justify-between px-12 py-20 space-y-12"
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
          <p className="mt-4 text-lg text-base dark:text-inverted">
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
          <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            MBTI: INTP
          </h2>
          <h3 className="text-xl font-semibold mt-2 text-secondary-500 dark:text-secondary-400">
            "The Contemplative Craftsman"
          </h3>
          <p className="mt-4 text-lg text-base dark:text-inverted">
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
