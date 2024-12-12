import type { FC, PropsWithChildren } from 'react';

import Navbar from '@/components/common/Navbar';
import WelcomeModal from '@/components/modals/WelcomeModal';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Navbar withSearch />
        <Box mt={3} marginX={1}>
            <main>
                <Container maxWidth="lg">{children}</Container>
            </main>
        </Box>
        <WelcomeModal />
    </>
);

export default Layout;
