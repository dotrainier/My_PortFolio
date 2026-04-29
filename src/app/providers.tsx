"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
<<<<<<< HEAD
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
=======
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
>>>>>>> origin/professional
      {children}
    </NextThemesProvider>
  );
}
