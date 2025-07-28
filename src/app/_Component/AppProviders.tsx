"use client";

import { ReactNode, useState } from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/lib/emotionCache";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/lib/theme";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const clientSideEmotionCache = createEmotionCache();

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
