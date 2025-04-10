import { createContext, useState } from "react";

export const themes = {
     light: {
          background: '#fff',
          color: '#000',
          toggleBorder: '#fff',
     },

     dark: {
          background: '#333',
          color: '#ffffff',
          toggleBorder: '#6B8096',
     }
};

export const ThemeContext = createContext()
export const ThemeProvider = ({ children }) => {
     const [theme, setTheme] = useState(themes.light)

     const toggleTheme = () => {
          setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
     };

     return (
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
               {children}
          </ThemeContext.Provider>
     )
}