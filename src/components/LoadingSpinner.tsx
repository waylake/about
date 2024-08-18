import React from "react";
import { PuffLoader } from "react-spinners";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <PuffLoader color="#8B5CF6" size={60} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
