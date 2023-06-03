import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MainNavigator from './navigation/MainNavigator';
import AppLayout from './layouts/AppLayout';

const queryClient = new QueryClient();

export default function App() {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, loader: "bars" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications autoClose={4000} position="top-right" />
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <MainNavigator />
          </AppLayout>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}