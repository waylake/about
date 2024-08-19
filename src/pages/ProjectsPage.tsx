import React from "react";
import ProjectCard from "../components/ProjectCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useImageLoader } from "../hooks/useImageLoader";
import { ProjectCardProps } from "../components/ProjectCard";

const ProjectsPage: React.FC = () => {
  const projectsData: ProjectCardProps[] = [
    {
      title: "Sakura Link Tree",
      description:
        "A beautiful cherry blossom-themed personal link tree web app. Features dark mode and unique cherry blossom animations.",
      imageUrl:
        "https://raw.githubusercontent.com/waylake/tree-waylake/main/screenshots/screenshot1.png",
      projectUrl: "https://tree-waylake.vercel.app/",
      githubUrl: "https://github.com/waylake/tree-waylake",
    },
    {
      title: "Sakura Gallery",
      description:
        "A beautiful, responsive web application showcasing cherry blossom images using the Pixabay API. Features infinite scrolling, dark mode, and a masonry layout.",
      imageUrl:
        "https://raw.githubusercontent.com/waylake/sakura-gallery/main/background-1.png",
      projectUrl: "https://sakura-gallery.vercel.app/",
      githubUrl: "https://github.com/waylake/sakura-gallery",
    },
    {
      title: "Sakura Type",
      description:
        "Sakura Type is a web application that allows users to practice typing using Japanese cherry blossom poems. This project aims to improve typing speed and accuracy through beautiful haiku and tanka poetry.",
      imageUrl:
        "https://raw.githubusercontent.com/waylake/sakura-type/main/screenshot.png",
      projectUrl: "https://sakura-type.vercel.app/",
      githubUrl: "https://github.com/waylake/sakura-type.git",
    },
  ];

  const imageUrls = projectsData.map((project) => project.imageUrl);
  const imagesLoaded = useImageLoader(imageUrls);

  if (!imagesLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2 className="text-4xl font-bold mb-10 text-center text-purple-800 dark:text-purple-200">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
