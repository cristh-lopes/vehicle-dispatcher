import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { BreadcrumbProps } from '@/types/page';
import { Link } from '@mui/material';
import { useRouter } from 'next/navigation';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbProps[] }) {
  const router = useRouter();

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((b, i, { length }) => (
        <Link
          key={b.name}
          onClick={() => {
            router.push(b.link);
          }}
          variant="body1"
          sx={i + 1 == length ? { color: 'text.primary', fontWeight: 600 } : {}}
        >
          {b.name}
        </Link>
      ))}
    </StyledBreadcrumbs>
  );
}
