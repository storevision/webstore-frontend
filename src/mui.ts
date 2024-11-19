import '@mui/material/styles';
import type { PaletteColor } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        white: PaletteColor;
    }

    interface PaletteOptions {
        white?: PaletteColor;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        white: true;
    }
}
