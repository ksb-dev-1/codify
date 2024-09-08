import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ThemeContextProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Initialize state with localStorage value
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light"; // Fallback for SSR
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.className = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    // setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (typeof window !== "undefined") {
      document.documentElement.className = newTheme; // Update the class on the html element
      localStorage.setItem("theme", newTheme); // Store the theme in localStorage
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
