import React from "react";
import { Link } from "react-router-dom";

interface BlogPostCardProps {
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishDate: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  slug,
  summary,
  category,
  tags,
  coverImage,
  publishDate,
}) => {
  return (
    <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">
              No Image Available
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-purple-900 dark:text-purple-300">
          {title}
        </h3>
        <p className="text-gray-800 dark:text-gray-300 mb-4">{summary}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Category: {category}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Tags: {tags.length > 0 ? tags.join(", ") : "No Tags"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Published: {new Date(publishDate).toLocaleDateString()}
        </p>
        <Link
          to={`/blog/${slug}`}
          className="text-purple-700 dark:text-purple-400 font-semibold hover:text-purple-900 dark:hover:text-purple-200 transition duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
