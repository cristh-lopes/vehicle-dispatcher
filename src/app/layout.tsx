import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { AuthProvider } from '@/contexts/auth/context';
import AppTheme from '@/theme/AppTheme';

export const metadata: Metadata = {
  title: 'Despachante Veicular',
  description: 'Gerencie os seus serviços prestados.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <AppTheme>
            <AuthProvider>{children}</AuthProvider>
          </AppTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
