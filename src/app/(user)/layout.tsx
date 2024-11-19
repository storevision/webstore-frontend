import type { FC, PropsWithChildren } from 'react';

import Navbar from '@/components/common/Navbar';

import Box from '@mui/material/Box';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <Box>
        <Navbar />
        {children}
    </Box>
);

export default Layout;
