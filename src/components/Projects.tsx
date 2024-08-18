import React from "react";
import ProjectCard from "./ProjectCard";

interface ProjectsProps {
  isVisible: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isVisible }) => {
  const projectsData = [
    {
      title: "Sakura Link Tree",
      description:
        "A beautiful cherry blossom-themed personal link tree web app. Features dark mode and unique cherry blossom animations.",
      imageUrl:
        "https://raw.githubusercontent.com/waylake/tree-waylake/main/screenshots/screenshot1.png",
      projectUrl: "https://tree-waylake.vercel.app/",
    },
    {
      title: "Sakura Gallery",
      description:
        "A beautiful, responsive web application showcasing cherry blossom images using the Pixabay API. Features infinite scrolling, dark mode, and a masonry layout.",
      imageUrl:
        "https://raw.githubusercontent.com/waylake/sakura-gallery/main/background-1.png",
      projectUrl: "https://sakura-gallery.vercel.app/",
    },
  ];

  return (
    <section
      id="projects"
      className={`fixed inset-0 overflow-y-auto transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center text-purple-800">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
