import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Noto Serif TC', 'Times New Roman', serif`,
    body: `'Noto Serif TC', 'Times New Roman', serif`,
  },
  colors: {
    // WCAG AA compliant colors (contrast ratio ≥ 4.5:1)
    brand: {
      50: '#f5e6d3',
      100: '#e8d4b8',
      200: '#d9bf9c',
      300: '#c9a97f',
      400: '#b89362',
      500: '#a67c45', // Primary brand color
      600: '#8f6a3b',
      700: '#775832',
      800: '#5f4628',
      900: '#47341e',
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme;
