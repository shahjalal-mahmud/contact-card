// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const defaultFont = localStorage.getItem("font") || "Inter"; // default font

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [font, setFont] = useState(defaultFont);

  // Add this function
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Add this function
  const toggleFont = (newFont) => {
    setFont(newFont);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fontLinkId = "dynamic-font-link";

    // Remove existing font link
    const existing = document.getElementById(fontLinkId);
    if (existing) existing.remove();

    // Add new Google font link
    const link = document.createElement("link");
    link.id = fontLinkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.replaceAll(
      " ",
      "+"
    )}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);

    // Apply to html
    document.documentElement.style.setProperty("--user-font", `'${font}', sans-serif`);
    localStorage.setItem("font", font);
  }, [font]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, font, toggleFont }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
