
import React, { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from '@/context/AuthContext';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <AuthProvider>
                    {children}
                    <Toaster position="bottom-center" richColors />
                    <Analytics />
                </AuthProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}
