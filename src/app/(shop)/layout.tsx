import type { FC, PropsWithChildren } from 'react';

import Navbar from '@/components/common/Navbar';

import Box from '@mui/material/Box';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <Box>
        <Navbar />
        <Box mt={1} marginX={1}>
            <main>{children}</main>
        </Box>
    </Box>
);

export default Layout;
