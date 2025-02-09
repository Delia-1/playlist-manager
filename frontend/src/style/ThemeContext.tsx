import React from 'react';
import {createContext, useContext, useState, ReactNode} from 'react';


//Type of the default valueof the context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children} : {children : ReactNode}) => {
const [darkMode, setDarkMode] = useState<boolean>(false);

const toggleDarkMode = () => { setDarkMode((prevDarkMode) => !prevDarkMode);
}

return (
  <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
    <div className={darkMode ? "dark-mode" : "light-mode"}>{children}</div>
  </ThemeContext.Provider>
)
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
