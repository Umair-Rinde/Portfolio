'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-ui-theme',
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme after mount to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
    const savedTheme = typeof window !== 'undefined' 
      ? (localStorage.getItem(storageKey) as Theme) || defaultTheme
      : defaultTheme;
    setTheme(savedTheme);
  }, [defaultTheme, storageKey]);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let currentTheme = theme;
    if (theme === 'system') {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    root.classList.add(currentTheme);
    setIsDark(currentTheme === 'dark');

    // Sync with local storage
    if (theme !== 'system') {
      localStorage.setItem(storageKey, theme);
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [theme, mounted, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(systemTheme);
      setIsDark(systemTheme === 'dark');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme, mounted]);

  if (!mounted) {
    // Return children without theme class during SSR
    return <>{children}</>;
  }

  const contextValue = {
    theme,
    setTheme,
    isDark
  };

  return (
    <ThemeProviderContext.Provider value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};