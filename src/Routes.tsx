import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from "./components/LoadingSpinner";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <HomePage />
            </React.Suspense>
          }
        />
        <Route
          path="/projects"
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <ProjectsPage />
            </React.Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <ContactPage />
            </React.Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
