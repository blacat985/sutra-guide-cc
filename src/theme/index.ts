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
    // Modern sans-serif for UI elements if needed
    ui: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  colors: {
    // Earthy, solemn palette
    brand: {
      50: '#F9F5F0', // Very light beige
      100: '#EADBC8',
      200: '#DBC1A0',
      300: '#CCA778',
      400: '#BD8D50',
      500: '#A67C45', // Primary Gold/Bronze
      600: '#856337',
      700: '#634A29',
      800: '#42311B',
      900: '#21180D',
    },
    bg: {
      paper: '#F9F5F0', // Light mode background
      deep: '#1A1612',  // Dark mode background
    },
    text: {
      primary: '#2D2418',
      secondary: '#634A29',
      dark: '#EADBC8',
    }
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'bg.deep' : 'bg.paper',
        color: props.colorMode === 'dark' ? 'text.dark' : 'text.primary',
        lineHeight: '1.8', // More breathing room for text
      },
      '::selection': {
        bg: 'brand.200',
        color: 'brand.900',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        fontFamily: 'ui',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
        ghost: {
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'medium',
        letterSpacing: 'wide',
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.lg',
        px: { base: 4, md: 8 },
      },
    },
  },
});

export default theme;
