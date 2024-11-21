import type { components } from '@/generated/schema';

import type {
    CssVarsPalette,
    CssVarsTheme,
    PaletteActionChannel,
    PaletteColorChannel,
    PaletteCommonChannel,
    PaletteTextChannel,
} from '@mui/material';
import type { PaletteBackgroundChannel } from '@mui/material/styles/createThemeWithVars';

export type Product = components['schemas']['Product'];

export type Category = components['schemas']['Category'];

/**
 * Enhance the theme types to include new properties from the CssVarsProvider.
 * The theme is typed with CSS variables in `styled`, `sx`, `useTheme`, etc.
 */
declare module '@mui/material/styles' {
    // The palette must be extended in each node.
    interface Theme extends Omit<CssVarsTheme, 'palette'> {}

    // Extend the type that will be used in palette
    interface CommonColors extends PaletteCommonChannel {}
    interface PaletteColor extends PaletteColorChannel {}
    interface TypeBackground extends PaletteBackgroundChannel {}
    interface TypeText extends PaletteTextChannel {}
    interface TypeAction extends PaletteActionChannel {}

    // The extended Palette should be in sync with `extendTheme`
    interface Palette extends CssVarsPalette {}
}
