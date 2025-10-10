import { IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={mode === 'light' ? <MoonIcon fontSize="1.2em" /> : <SunIcon fontSize="1.2em" />}
      onClick={toggleTheme}
      variant="ghost"
      color="white"
      _hover={{ bg: 'brand.600' }}
    />
  );
}
