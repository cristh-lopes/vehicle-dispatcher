import { ReactNode } from 'react';

export type BreadcrumbProps = {
  name: string;
  link: string;
};

export type PageProps = {
  name: string;
  breadcrumbs: BreadcrumbProps[];
};

export type AuthenticatedPageProps = {
  children: ReactNode;
  page: PageProps;
};
