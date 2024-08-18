import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6 text-primary-600 dark:text-primary-400 transition-colors">
        Hello, I'm Waylake
      </h1>
      <p className="text-xl mb-10 max-w-2xl mx-auto transition-colors">
        A versatile developer covering frontend, backend, and DevOps. I enjoy
        solving complex problems efficiently, drawing from my experience with
        healthcare data.
      </p>
      <Link
        to="/projects"
        className="bg-secondary-500 text-inverted px-8 py-3 rounded-full hover:bg-secondary-600 transition-colors duration-300 shadow-lg"
      >
        View Projects
      </Link>
    </div>
  );
};

export default About;
