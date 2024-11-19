import type { FC } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading: FC = () => (
    <Box
        zIndex={9999}
        position="fixed"
        top="50%"
        left="50%"
        style={{ transform: 'translate(-50%, -50%)' }}
    >
        <CircularProgress />
    </Box>
);

export default Loading;
