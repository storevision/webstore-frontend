import type { FC, PropsWithChildren } from 'react';

import Navbar from '@/components/common/Navbar';
import WelcomeModal from '@/components/modals/WelcomeModal';

import Box from '@mui/material/Box';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Navbar />
        <Box mt={1} marginX={1}>
            <main>{children}</main>
        </Box>
        <WelcomeModal />
    </>
);

export default Layout;
