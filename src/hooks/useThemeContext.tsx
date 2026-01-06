import { createContext, useContext, useEffect, useState } from 'react';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export type Theme = Themes.LIGHT | Themes.DARK;

type ThemeContextValue = {
  theme: Theme;
  changeTheme: (mode: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useThemeContext = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error('useThemeContext must be used within a ThemeProvider');
  return ctx;
};

interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Themes.LIGHT);

  const changeTheme = (value: Theme) => {
    setTheme(value);
    localStorage.setItem('theme', value);
  };

  useEffect(() => {
    const localStorageValue = localStorage.getItem('theme');

    if (localStorageValue) {
      setTheme(localStorageValue === 'light' ? Themes.LIGHT : Themes.DARK);
    } else {
      setTheme(Themes.LIGHT);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
