import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const stored = localStorage.getItem("dahmi-theme");
      return stored === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("dahmi-theme", theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  const setTheme = (t) => setThemeState(t === "dark" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
