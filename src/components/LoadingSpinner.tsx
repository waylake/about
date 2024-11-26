import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Tailwind CSS Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-opacity-75"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
