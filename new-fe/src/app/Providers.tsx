'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import ToasterProvider from './components/ToastProvider';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ToasterProvider /> {/* ✅ Global toaster provider */}
      {children}
    </NextThemesProvider>
  );
}
