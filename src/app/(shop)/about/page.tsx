import type { Metadata } from 'next';

import type { FC } from 'react';

import Container from '@mui/material/Container';

export const metadata: Metadata = {
    title: 'About',
};

const AboutPage: FC = async () => <Container>About us. WIP.</Container>;

export default AboutPage;
