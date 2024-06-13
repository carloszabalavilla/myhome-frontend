import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../styles/theme/theme';

export const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const userThemePreference = sessionStorage.getItem('theme');
    if (userThemePreference) {
      setTheme(userThemePreference === 'dark' ? darkTheme : lightTheme);
    } else {
      const hour = new Date().getHours();
      setTheme(hour >= 20 || hour <= 7 ? darkTheme : lightTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme.palette.mode === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    sessionStorage.setItem('theme', newTheme.palette.mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
