import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Tag,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import contentfulClient from "../utils/contentfulClient";
import BlogPostCard from "../components/BlogPostCard";
import { EntryCollection } from "contentful";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishDate: string;
}

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: EntryCollection<any> =
          await contentfulClient.getEntries({
            content_type: "blog",
            order: ["-sys.createdAt"],
          });

        const fetchedPosts = response.items.map((item: any) => ({
          title: item.fields.title,
          slug: item.fields.slug,
          summary: item.fields.summary,
          category: item.fields.category?.fields?.name || "Uncategorized",
          tags: item.fields.tags || [],
          coverImage: item.fields.coverImage?.fields?.file?.url || "",
          publishDate: item.fields.publishDate,
        }));

        setPosts(fetchedPosts);

        const allCategories = [
          ...new Set(fetchedPosts.map((post) => post.category)),
        ];
        const allTags = [...new Set(fetchedPosts.flatMap((post) => post.tags))];

        setCategories(allCategories);
        setTags(allTags);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-container py-section">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-h1 font-bold text-primary dark:text-primary-400">
          Blog
        </h1>
        <p className="text-body-lg text-text-base-light/80 dark:text-text-base-dark/80 mt-4 max-w-2xl mx-auto">
          Explore my thoughts and experiences in web development, DevOps, and
          software engineering.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 rounded-xl shadow-card p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-primary-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-background-light/50 dark:bg-background-dark/50 
                       border border-primary/20 dark:border-primary-400/20 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-400/50
                       text-text-base-light dark:text-text-base-dark placeholder-text-base-light/50 
                       dark:placeholder-text-base-dark/50 transition-all duration-300"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-primary dark:text-primary-400 hover:text-secondary 
                     dark:hover:text-secondary-dark transition-colors mb-4"
          >
            <Filter size={20} />
            <span className="text-body font-medium">Filter Options</span>
          </button>

          {/* Filter Options */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap gap-4">
                  {/* Categories */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="flex items-center gap-2 text-text-base-light dark:text-text-base-dark mb-2">
                      <Bookmark size={16} />
                      <span className="text-body-sm">Category</span>
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-4 py-2 bg-background-light/50 dark:bg-background-dark/50
                               border border-primary/20 dark:border-primary-400/20 rounded-lg
                               text-text-base-light dark:text-text-base-dark
                               focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-400/50"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="flex items-center gap-2 text-text-base-light dark:text-text-base-dark mb-2">
                      <Tag size={16} />
                      <span className="text-body-sm">Tag</span>
                    </label>
                    <select
                      value={selectedTag}
                      onChange={(e) => {
                        setSelectedTag(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-4 py-2 bg-background-light/50 dark:bg-background-dark/50
                               border border-primary/20 dark:border-primary-400/20 rounded-lg
                               text-text-base-light dark:text-text-base-dark
                               focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-400/50"
                    >
                      <option value="">All Tags</option>
                      {tags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Summary */}
        <div className="text-body-sm text-text-muted-light dark:text-text-muted-dark mt-4">
          Found {filteredPosts.length} posts
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BlogPostCard {...post} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-background-card-light/30 
                     dark:bg-background-card-dark/30 backdrop-blur-sm disabled:opacity-50
                     text-text-base-light dark:text-text-base-dark hover:bg-background-card-light/50 
                     dark:hover:bg-background-card-dark/50 transition-all duration-300"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300
                ${
                  currentPage === page
                    ? "bg-primary dark:bg-primary-400 text-white"
                    : "bg-background-card-light/30 dark:bg-background-card-dark/30 text-text-base-light dark:text-text-base-dark hover:bg-background-card-light/50 dark:hover:bg-background-card-dark/50"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-background-card-light/30 
                     dark:bg-background-card-dark/30 backdrop-blur-sm disabled:opacity-50
                     text-text-base-light dark:text-text-base-dark hover:bg-background-card-light/50 
                     dark:hover:bg-background-card-dark/50 transition-all duration-300"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
