import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Asset, Entry, EntryFields } from "contentful";
import contentfulClient from "../utils/contentfulClient";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

// Contentful 콘텐츠 타입 정의
interface BlogPostFields {
  title: EntryFields.Text;
  content: EntryFields.RichText;
  slug: EntryFields.Text;
  category: Entry<{ name: EntryFields.Text }>;
  tags: EntryFields.Array<EntryFields.Text>;
  coverImage: Asset;
  publishDate: EntryFields.Date;
}

// 컴포넌트에서 사용할 데이터 타입
interface BlogPost {
  title: string;
  content: any;
  category: string;
  tags: string[];
  coverImage: string;
  publishDate: string;
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const renderOptions = {
    renderMark: {
      [MARKS.CODE]: (text: string) => {
        return (
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            className="rounded-md"
          >
            {text}
          </SyntaxHighlighter>
        );
      },
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        if (!node?.data?.target?.fields?.file) {
          return null;
        }
        const { url, title, description } = node.data.target.fields.file;
        return (
          <div className="my-8">
            <img
              src={url}
              alt={description || title}
              className="w-full rounded-lg shadow-card"
            />
            {description && (
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2 text-center">
                {description}
              </p>
            )}
          </div>
        );
      },
      [BLOCKS.CODE]: (node: any) => {
        return (
          <SyntaxHighlighter
            language={node.data?.language || "javascript"}
            style={tomorrow}
            className="rounded-md my-4"
          >
            {node.content[0].value}
          </SyntaxHighlighter>
        );
      },
    },
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await contentfulClient.getEntries<BlogPostFields>({
          content_type: "blog", // 실제 content type ID로 변경 필요
          "fields.slug": slug,
          include: 2,
        });

        if (!response.items.length) {
          setError("Post not found");
          return;
        }

        const item = response.items[0];

        // 안전한 데이터 파싱
        const post: BlogPost = {
          title: item.fields.title || "",
          content: item.fields.content || "",
          category: item.fields.category?.fields?.name || "Uncategorized",
          tags: Array.isArray(item.fields.tags)
            ? item.fields.tags.filter(
                (tag): tag is string => typeof tag === "string",
              )
            : [],
          coverImage: item.fields.coverImage?.fields?.file?.url || "",
          publishDate: item.fields.publishDate || new Date().toISOString(),
        };

        setPost(post);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load blog post",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-container py-section">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-container py-section">
        <div className="text-center text-red-500">
          {error || "Post not found"}
        </div>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-container py-section max-w-4xl">
      <div className="backdrop-blur-sm bg-background-card-light/30 dark:bg-background-card-dark/30 p-8 rounded-lg shadow-card">
        <h1 className="text-h1 font-bold mb-6 text-text-base-light dark:text-text-base-dark">
          {post.title}
        </h1>
        <div className="space-y-2 mb-8 text-body text-text-muted-light dark:text-text-muted-dark">
          <time className="block">
            {new Date(post.publishDate).toLocaleDateString()}
          </time>
          <div>Category: {post.category}</div>
          {post.tags.length > 0 && (
            <div>
              Tags:{" "}
              <span className="text-secondary dark:text-secondary-dark">
                {post.tags.join(", ")}
              </span>
            </div>
          )}
        </div>
        {post.coverImage && (
          <div className="mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
          </div>
        )}
        <div
          className="mt-8 prose-lg max-w-none text-text-base-light dark:text-text-base-dark
            prose-headings:text-text-base-light dark:prose-headings:text-text-base-dark
            prose-a:text-primary dark:prose-a:text-primary-400
            prose-strong:text-text-base-light dark:prose-strong:text-text-base-dark
            prose-code:bg-background-card-light dark:prose-code:bg-background-card-dark
            prose-code:text-primary dark:prose-code:text-primary-400
            prose-blockquote:text-text-muted-light dark:prose-blockquote:text-text-muted-dark
            prose-blockquote:border-l-4 prose-blockquote:border-primary dark:prose-blockquote:border-primary-400"
        >
          {documentToReactComponents(post.content, renderOptions)}
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
