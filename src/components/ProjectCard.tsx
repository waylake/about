import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  projectUrl,
  githubUrl,
}) => {
  return (
    <motion.div
      className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative p-6">
        <h3 className="font-bold text-xl mb-2 text-purple-900 dark:text-purple-300 flex items-center">
          {title}
        </h3>
        <p className="text-gray-800 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <a
            href={projectUrl}
            className="text-purple-700 dark:text-purple-400 font-semibold hover:text-purple-900 dark:hover:text-purple-200 transition duration-300 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={18} className="mr-1" />
            Visit Project
          </a>
          <a
            href={githubUrl}
            className="text-purple-700 dark:text-purple-400 font-semibold hover:text-purple-900 dark:hover:text-purple-200 transition duration-300 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} className="mr-1" />
            View Code
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
