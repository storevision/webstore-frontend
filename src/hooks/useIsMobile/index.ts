import useMobileBreakpoint from '@/hooks/useMobileBreakpoint';

import { useMediaQuery } from '@mui/material';

export default function useIsMobile(): boolean {
    const breakpoint = useMobileBreakpoint();

    return useMediaQuery(breakpoint);
}
