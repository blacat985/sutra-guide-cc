export type FontSize = 'small' | 'medium' | 'large' | 'x-large';

export const FONT_SIZE_MAP = {
  small: '14px',
  medium: '18px',
  large: '22px',
  'x-large': '26px',
} as const;

export const FONT_SIZE_LABELS = {
  small: '小',
  medium: '中',
  large: '大',
  'x-large': '特大',
} as const;
