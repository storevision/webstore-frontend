import type { FC, PropsWithChildren } from 'react';

import Navbar from '@/components/common/Navbar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Navbar />
        <Box mt={2} marginX={1}>
            <main>
                <Container maxWidth="lg">{children}</Container>
            </main>
        </Box>
    </>
);

export default Layout;
