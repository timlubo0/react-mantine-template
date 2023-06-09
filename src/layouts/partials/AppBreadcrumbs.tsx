import { Breadcrumbs, Anchor, Box } from '@mantine/core';
import { Routes } from '../../navigation/routes';
import { Link } from 'react-router-dom';
import { useFeaturePermissions } from '../../features/accessControl/hooks/permissions';

const items = [
  { title: 'Dashboard', href: Routes.home },
  { title: 'Mantine hooks', href: '#' },
].map((item, index) => (
  <Link to={item.href} key={index} style={{ textDecoration: 'none' }}>
    <Anchor>
      {item.title}
    </Anchor>
  </Link>
));

function AppBreadcrumbs() {
    
  return (
    <Box
      maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
      miw={{ xl: 1200 }}
      mx={{ xl: 'auto' }}
    >
      <Breadcrumbs>{items}</Breadcrumbs>
      {/* <Breadcrumbs separator="→" mt="xs">{items}</Breadcrumbs> */}
    </Box>
  );
}

export default AppBreadcrumbs;