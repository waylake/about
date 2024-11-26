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
      className="backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 
                rounded-lg overflow-hidden shadow-card hover:shadow-card-hover 
                transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden group">
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-card-dark/50 to-transparent" />
      </div>

      <div className="relative p-6 space-y-4">
        <h3 className="text-h4 font-bold text-text-base-light dark:text-text-base-dark">
          {title}
        </h3>

        <p className="text-body text-text-base-light/80 dark:text-text-base-dark/80">
          {description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-primary/10 dark:border-primary-400/10">
          <motion.a
            href={projectUrl}
            className="flex items-center gap-2 text-primary dark:text-primary-400 
                     hover:text-secondary dark:hover:text-secondary-dark font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={18} />
            <span className="text-body-sm">Visit Project</span>
          </motion.a>

          <motion.a
            href={githubUrl}
            className="flex items-center gap-2 text-primary dark:text-primary-400 
                     hover:text-secondary dark:hover:text-secondary-dark font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
            <span className="text-body-sm">View Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
