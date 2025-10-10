import { Menu, MenuButton, MenuList, MenuItem, IconButton, Icon } from '@chakra-ui/react';
import { MdTextFields } from 'react-icons/md';
import { useFontSize } from '../../hooks/useFontSize';
import { FONT_SIZE_LABELS } from '../../types/fontSize';
import type { FontSize } from '../../types/fontSize';

export default function FontSizeControl() {
  const { fontSize, setFontSize } = useFontSize();

  const fontSizeOptions: FontSize[] = ['small', 'medium', 'large', 'x-large'];

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="調整字體大小"
        icon={<Icon as={MdTextFields} fontSize="1.5em" />}
        variant="ghost"
        color="white"
        _hover={{ bg: 'whiteAlpha.200' }}
        _active={{ bg: 'whiteAlpha.300' }}
      />
      <MenuList>
        {fontSizeOptions.map((size) => (
          <MenuItem
            key={size}
            onClick={() => setFontSize(size)}
            fontWeight={fontSize === size ? 'bold' : 'normal'}
            color={fontSize === size ? 'brand.600' : 'gray.700'}
            bg={fontSize === size ? 'brand.50' : 'transparent'}
            _dark={{
              color: fontSize === size ? 'brand.200' : 'gray.300',
              bg: fontSize === size ? 'brand.900' : 'transparent',
            }}
          >
            {FONT_SIZE_LABELS[size]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
