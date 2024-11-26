import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaEnvelope } from "react-icons/fa";
import { User, Briefcase, Code, Mail } from "lucide-react";
import {
  skills,
  MediaiplusCard,
} from "../components/experience/MediaiplusCard";
import "react-circular-progressbar/dist/styles.css";
import SkillCard from "../components/SkillCard";

const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-container py-section"
    >
      <Helmet>
        <title>About Waylake - Full-stack Developer</title>
        <meta
          name="description"
          content="Learn about Waylake's experience, skills, and projects as a full-stack developer specializing in React, Node.js, and AWS."
        />
      </Helmet>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-h1 font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="text-body-lg text-text-base-light/80 dark:text-text-base-dark/80 max-w-2xl mx-auto">
          Full-stack developer with a passion for creating elegant solutions to
          complex problems
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="space-y-16">
        {/* Introduction Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 rounded-lg p-8 shadow-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <User className="text-primary dark:text-primary-400" size={24} />
            <h2 className="text-h3 font-semibold text-text-base-light dark:text-text-base-dark">
              Introduction
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-body-lg text-text-base-light/90 dark:text-text-base-dark/90 leading-relaxed">
              Hi! I'm Do-yeon Hwang, a passionate full-stack developer with a
              solid foundation in frontend, backend, and DevOps practices. I
              specialize in creating scalable solutions using modern web
              technologies and cloud infrastructure.
            </p>
            <p className="text-body-lg text-text-base-light/90 dark:text-text-base-dark/90 leading-relaxed">
              My journey began at Hanse Cyber Security High School, where I
              built a strong foundation in programming and server security. I
              further expanded my skill set at Mediaiplus as a Systems Engineer,
              focusing on full-stack development and cloud-based solutions.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Code className="text-primary dark:text-primary-400" size={24} />
            <h2 className="text-h3 font-semibold text-text-base-light dark:text-text-base-dark">
              Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <SkillCard
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Briefcase
              className="text-primary dark:text-primary-400"
              size={24}
            />
            <h2 className="text-h3 font-semibold text-text-base-light dark:text-text-base-dark">
              Experience
            </h2>
          </div>
          <MediaiplusCard />
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 rounded-lg p-8 shadow-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <Mail className="text-primary dark:text-primary-400" size={24} />
            <h2 className="text-h3 font-semibold text-text-base-light dark:text-text-base-dark">
              Contact
            </h2>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-background-light/50 dark:bg-background-dark/50 rounded-full"
          >
            <FaEnvelope
              className="text-primary dark:text-primary-400"
              size={20}
            />
            <a
              href="mailto:waylake2003@gmail.com"
              className="text-body text-primary dark:text-primary-400 hover:text-secondary dark:hover:text-secondary-dark transition-colors"
            >
              waylake2003@gmail.com
            </a>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default AboutPage;
