'use client';

import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import { Button, type ButtonProps } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ColorModeSelect(props: ButtonProps) {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  return (
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} {...props}>
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  );
}
