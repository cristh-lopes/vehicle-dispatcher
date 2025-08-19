'use client';

import * as React from 'react';
import { ThemeProvider, createTheme, type Theme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from './customs/inputs';
import { dataDisplayCustomizations } from './customs/dataDisplay';
import { feedbackCustomizations } from './customs/feedback';
import { navigationCustomizations } from './customs/navigation';
import { surfacesCustomizations } from './customs/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions['components'];
}

export default function AppTheme({ children, disableCustomTheme, themeComponents }: AppThemeProps) {
  const theme: Theme = React.useMemo(() => {
    return createTheme(
      disableCustomTheme
        ? {}
        : {
            cssVariables: {
              colorSchemeSelector: 'data-mui-color-scheme',
              cssVarPrefix: 'template',
            },
            colorSchemes,
            typography,
            shadows,
            shape,
            components: {
              ...inputsCustomizations,
              ...dataDisplayCustomizations,
              ...feedbackCustomizations,
              ...navigationCustomizations,
              ...surfacesCustomizations,
              ...themeComponents,
            },
          },
    );
  }, [disableCustomTheme, themeComponents]);

  if (disableCustomTheme) {
    return <>{children}</>;
  }

  return (
    <div className={theme?.typography?.fontFamily}>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </div>
  );
}
