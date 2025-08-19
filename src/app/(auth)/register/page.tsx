'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import ColorModeSelect from '@/theme/ColorModeSelect';
import Content from '@/components/Content';
import { brand } from '@/theme/themePrimitives';
import RegisterCard from '@/components/RegisterCard';

export default function Register() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage: `radial-gradient(ellipse at 50% 50%, ${brand[25]}, ${brand[100]})`,
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage: `radial-gradient(at 50% 50%, ${brand[900]}, ${brand[975]})`,
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <RegisterCard />
            <Content />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
