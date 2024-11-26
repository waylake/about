import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark" | "system";
type EffectiveTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: EffectiveTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      return savedTheme || "system";
    }
    return "system"; // 서버에서 기본값 반환
  });

  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>("light");

  const applyTheme = (newTheme: EffectiveTheme) => {
    setEffectiveTheme(newTheme);
    if (typeof window !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        if (theme === "system") {
          applyTheme(mediaQuery.matches ? "dark" : "light");
        }
      };

      handleChange();
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme !== "system") {
        localStorage.setItem("theme", theme);
        applyTheme(theme);
      } else {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        applyTheme(systemTheme);
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "system") {
        return "light";
      } else {
        return prevTheme === "light" ? "dark" : "light";
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
