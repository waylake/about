import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaEnvelope } from "react-icons/fa";
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
      className="container mx-auto px-4 py-8"
    >
      <Helmet>
        <title>About Waylake - Full-stack Developer</title>
        <meta
          name="description"
          content="Learn about Waylake's experience, skills, and projects as a full-stack developer specializing in React, Node.js, and AWS."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-8 text-primary-600 dark:text-primary-400">
        About Me
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Hi! I'm Do-yeon Hwang, a passionate full-stack developer with a solid
          foundation in frontend, backend, and DevOps practices. I specialize in
          creating scalable solutions using modern web technologies and cloud
          infrastructure.
        </p>
        <p>
          My journey began at Hanse Cyber Security High School, where I built a
          strong foundation in programming and server security. I further
          expanded my skill set at Mediaiplus as a Systems Engineer, focusing on
          full-stack development and cloud-based solutions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              level={skill.level}
              icon={skill.icon}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        <MediaiplusCard />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="flex items-center">
          <FaEnvelope className="mr-2 text-primary-600 dark:text-primary-400" />
          <a
            href="mailto:waylake2003@gmail.com"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            waylake2003@gmail.com
          </a>
        </p>
      </section>
    </motion.div>
  );
};

export default AboutPage;
