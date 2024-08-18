import React from "react";
import { motion } from "framer-motion";

interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  description: string;
  technologies?: string; // 기술 스택을 추가로 표시할 수 있도록 수정
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  company,
  description,
  technologies, // 기술 스택을 표시할 필드
}) => (
  <motion.div
    className="mb-8 flex justify-between items-center w-full"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* 빈 공간을 더 활용적으로 변경 */}
    <div className="order-1 w-5/12 hidden md:block"></div>
    <div className="z-20 flex items-center order-1 bg-primary-600 shadow-xl w-10 h-10 rounded-full">
      <h1 className="mx-auto font-semibold text-lg text-white">
        {date.slice(-2)} {/* 연도의 마지막 두 자리를 표시 */}
      </h1>
    </div>
    <motion.div
      className="order-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="mb-2 font-bold text-primary-600 text-xl">{title}</h3>
      <h4 className="mb-3 font-semibold text-secondary-500 text-lg">
        {company}
      </h4>
      <p className="text-sm leading-snug tracking-wide text-gray-700 dark:text-gray-300 mb-2">
        {description}
      </p>
      {technologies && (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Technologies used:</strong> {technologies}
        </p>
      )}
    </motion.div>
  </motion.div>
);

const Timeline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="container mx-auto w-full h-full">
    <div className="relative wrap overflow-hidden p-10 h-full">
      <div
        className="border-2-2 absolute border-opacity-20 border-primary-600 h-full border"
        style={{ left: "50%" }}
      ></div>
      {children}
    </div>
  </div>
);

export { Timeline, TimelineItem };
