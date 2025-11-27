import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const iconColor = useColorModeValue('brand.700', 'brand.100');
  const hoverBg = useColorModeValue('brand.100', 'brand.700');

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={mode === 'light' ? <MoonIcon fontSize="1.2em" /> : <SunIcon fontSize="1.2em" />}
      onClick={toggleTheme}
      variant="ghost"
      color={iconColor}
      _hover={{ bg: hoverBg }}
    />
  );
}
