import type { Metadata, NextPage } from 'next';

import Container from '@mui/material/Container';

export const metadata: Metadata = {
    title: 'About',
};

const AboutPage: NextPage = async () => <Container>About us. WIP.</Container>;

export default AboutPage;
