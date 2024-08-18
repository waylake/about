import React from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const SkillCard: React.FC<{
  name: string;
  level: number;
  icon: React.ReactNode;
}> = ({ name, level, icon }) => {
  return (
    <motion.div
      className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-lg p-6 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl text-primary-600 dark:text-primary-400 mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-4 text-secondary-500">{name}</h4>
      <CircularProgressbar
        value={level}
        text={`${level}%`}
        styles={buildStyles({
          textColor: "#1d4ed8",
          pathColor: "#1d4ed8",
          trailColor: "#d1d5db",
        })}
        className="w-24 h-24"
      />
    </motion.div>
  );
};

export default SkillCard;
