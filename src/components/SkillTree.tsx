import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaCloud } from "react-icons/fa"; // 아이콘 추가

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode; // 아이콘 필드 추가
  children?: Skill[];
}

const skills: Skill[] = [
  {
    name: "Frontend",
    level: 90,
    icon: <FaCode />, // 프론트엔드 관련 아이콘
    children: [
      { name: "React", level: 95, icon: <FaCode /> },
      { name: "Next.js", level: 85, icon: <FaCode /> },
      { name: "Tailwind CSS", level: 90, icon: <FaCode /> },
    ],
  },
  {
    name: "Backend",
    level: 85,
    icon: <FaServer />, // 백엔드 관련 아이콘
    children: [
      { name: "Node.js", level: 90, icon: <FaServer /> },
      { name: "Express", level: 85, icon: <FaServer /> },
      { name: "Python", level: 80, icon: <FaServer /> },
    ],
  },
  {
    name: "DevOps",
    level: 80,
    icon: <FaCloud />, // DevOps 관련 아이콘
    children: [
      { name: "AWS", level: 85, icon: <FaCloud /> },
      { name: "Docker", level: 80, icon: <FaCloud /> },
      { name: "Terraform", level: 75, icon: <FaCloud /> },
    ],
  },
];

const SkillNode: React.FC<{ skill: Skill; depth: number }> = ({
  skill,
  depth,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`mb-4 ${depth > 0 ? "ml-6" : ""}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: depth * 0.1 }}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {skill.children && (
          <span className="mr-2 text-lg">{isOpen ? "▼" : "▶"}</span>
        )}
        <span className="mr-3 text-2xl">{skill.icon}</span> {/* 아이콘 표시 */}
        <span className="font-semibold text-lg">{skill.name}</span>
        <div className="ml-4 flex-1 bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
          <div
            className="bg-primary-600 h-3 rounded-full"
            style={{ width: `${skill.level}%` }}
          ></div>
        </div>
      </div>
      {isOpen && skill.children && (
        <div className="mt-3">
          {skill.children.map((child, index) => (
            <SkillNode key={index} skill={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const SkillTree: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400">
      Skill Tree
    </h2>
    {skills.map((skill, index) => (
      <SkillNode key={index} skill={skill} depth={0} />
    ))}
  </div>
);

export default SkillTree;
