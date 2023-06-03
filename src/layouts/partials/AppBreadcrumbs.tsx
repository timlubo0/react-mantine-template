import { Breadcrumbs, Anchor, Box } from '@mantine/core';

const items = [
  { title: 'Mantine', href: '#' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
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