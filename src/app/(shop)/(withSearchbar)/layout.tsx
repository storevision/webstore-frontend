import type { FC, PropsWithChildren } from 'react';

import Navbar from '@/components/common/Navbar';
import ProductSearchbar from '@/components/common/ProductSearchbar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Navbar withSearch />
        <Box mt={3} marginX={1}>
            <main>
                <Container maxWidth="lg">
                    <Box display={{ xs: 'block', md: 'none' }}>
                        <ProductSearchbar />
                    </Box>
                    {children}
                </Container>
            </main>
        </Box>
    </>
);

export default Layout;
