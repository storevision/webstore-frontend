import { useTheme } from '@mui/material';

const useMobileBreakpoint = (): string => {
    const theme = useTheme();

    return theme.breakpoints.down('md');
};

export default useMobileBreakpoint;
