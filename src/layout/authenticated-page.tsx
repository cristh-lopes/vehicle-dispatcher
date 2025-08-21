'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/auth/context';
import AppTheme from '@/theme/AppTheme';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CssBaseline } from '@mui/material';
import AppNavbar from '@/components/AppNavbar';
import Header from '@/components/Header';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '@/theme/customs';
import { AuthenticatedPageProps } from '@/types/page';
import SideMenu from '@/components/SideMenu';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export function AuthenticatedPage({ children, page }: AuthenticatedPageProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // router.push('/login');
    }
  }, [user, loading, router]);

  if (!user) {
    // return null;
  }

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : theme.palette.background.default,
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header breadcrumbs={page.breadcrumbs} />
            {loading ? <>Carregando</> : children}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
