import React from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  projectUrl,
}) => {
  return (
    <motion.div
      className="shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative p-6 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-80">
        <h3 className="font-bold text-xl mb-2 text-purple-900 dark:text-purple-300">
          {title}
        </h3>
        <p className="text-gray-800 dark:text-gray-300 mb-4">{description}</p>
        <a
          href={projectUrl}
          className="text-purple-700 dark:text-purple-400 font-semibold hover:text-purple-900 dark:hover:text-purple-200 transition duration-300"
        >
          Learn More →
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
