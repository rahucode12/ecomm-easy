// filepath: /Users/rimmi/Documents/code_repo/ecomm-easy/src/app/ClientRootLayout.tsx
"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { useEffect, useState } from "react";



const theme = createTheme();

export default function ClientRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Prevent rendering on the server
    }

    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>

    );
}