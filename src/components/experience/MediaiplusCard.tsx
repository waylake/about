import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaCloud, FaBriefcase } from "react-icons/fa";

export const MediaiplusCard: React.FC = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <FaBriefcase className="text-primary-600 dark:text-primary-400 text-3xl mr-4" />
        <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          Mediaiplus
        </h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Worked as a Systems Engineer focusing on full-stack development and
        cloud-based solutions. Here are the key projects I contributed to during
        my tenure:
      </p>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-lg text-secondary-500">
            Clinical Trial Data & Warehousing (2022)
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Led data collection and warehousing of clinical trial data,
            automating regular updates using Python and MySQL.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-secondary-500">
            Clinical Trial Data Software (2022)
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Developed software to gather and standardize clinical trial data
            across platforms.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-secondary-500">
            Regulation & Guidelines API (2023)
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built an API and frontend to provide clinical trial regulations with
            search and pagination features using React and Node.js.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-secondary-500">
            LLM Model API Server (2023)
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Developed an API server powered by LLMs to automate clinical data
            processing, improving data quality.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-secondary-500">
            Infrastructure as Code (2023)
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Implemented AWS infrastructure provisioning using Terraform and
            Ansible to automate deployment and configuration.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-secondary-500">
            Website Migration (2024)
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Migrated legacy systems to a modern stack (React, Express, AWS),
            improving performance and CI/CD processes.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const skills = [
  {
    name: "Frontend",
    level: 90,
    icon: <FaCode />,
    children: [
      { name: "React", level: 95, icon: <FaCode /> },
      { name: "Next.js", level: 85, icon: <FaCode /> },
      { name: "Tailwind CSS", level: 90, icon: <FaCode /> },
    ],
  },
  {
    name: "Backend",
    level: 85,
    icon: <FaServer />,
    children: [
      { name: "Node.js", level: 90, icon: <FaServer /> },
      { name: "Express", level: 85, icon: <FaServer /> },
      { name: "Python", level: 80, icon: <FaServer /> },
    ],
  },
  {
    name: "DevOps",
    level: 80,
    icon: <FaCloud />,
    children: [
      { name: "AWS", level: 85, icon: <FaCloud /> },
      { name: "Docker", level: 80, icon: <FaCloud /> },
      { name: "Terraform", level: 75, icon: <FaCloud /> },
    ],
  },
];
