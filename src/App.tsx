import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import AnimatedRoutes from "./Routes";

const App: React.FC = () => {
  useEffect(() => {
    const preloadPages = async () => {
      await Promise.all([
        import("./pages/HomePage"),
        import("./pages/ProjectsPage"),
        import("./pages/ContactPage"),
        import("./pages/AboutPage"),
        import("./pages/BlogPage"),
        import("./pages/BlogPostPage"),
      ]);
    };
    preloadPages();
  }, []);

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Layout>
          <main className="flex-grow container mx-auto px-4 py-8">
            <AnimatedRoutes />
          </main>
        </Layout>
      </div>
    </ThemeProvider>
  );
};

export default App;
