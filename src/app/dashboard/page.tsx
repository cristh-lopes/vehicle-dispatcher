'use client';

import * as React from 'react';
import { AuthenticatedPage } from '@/layout/authenticated-page';
import MainGrid from '@/components/MainGrid';
import { PageProps } from '@/types/page';

export default function Dashboard() {
  const page: PageProps = {
    name: 'Dashboard',
    breadcrumbs: [
      { name: 'Dashboard', link: '/' },
      { name: 'Home', link: '/' },
    ],
  };

  return (
    <AuthenticatedPage page={page}>
      <MainGrid />
    </AuthenticatedPage>
  );
}
