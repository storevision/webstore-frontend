import '@mui/material/styles';
import type { PaletteColor } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        white: PaletteColor;
        black: PaletteColor;
    }

    interface PaletteOptions {
        white?: PaletteColor;
        black?: PaletteColor;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        white: true;
        black: true;
    }
}
