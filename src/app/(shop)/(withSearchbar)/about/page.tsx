import type { Metadata, NextPage } from 'next';

import { pageName } from '@/constants';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
    title: 'About',
};

// generate information for about us page

const AboutPage: NextPage = async () => (
    <Container>
        <Typography variant="h4">About Us</Typography>
        <Typography mb={2}>
            {pageName} is a online store that sells a variety of products. We
            have a wide range of products that are available for purchase. We
            are dedicated to providing the best customer service and products to
            our customers. We are constantly updating our inventory to provide
            the latest and greatest products to our customers. We are committed
            to providing the best shopping experience possible for our
            customers. We are always looking for ways to improve our store and
            make it better for our customers.
        </Typography>
        <Typography variant="h6">How did we start?</Typography>
        <Typography>
            {pageName} was started by a group of friends who wanted to create a
            store that offered a wide range of products at affordable prices. We
            started with a small inventory of products and have grown
            exponentially since then. We are constantly looking for ways to
            improve our store and provide the best shopping experience possible
            for our customers. We are dedicated to providing the best customer
            service and products to our customers. We are always looking for
            ways to improve our store and make it better for our customers.
        </Typography>
        <Typography variant="h6">Our Mission</Typography>
        <Typography>
            Our mission is to provide the best shopping experience possible for
            our customers. We are dedicated to providing the best customer
            service and products to our customers. We are always looking for
            ways to improve our store and make it better for our customers. We
            are committed to providing the best shopping experience possible for
            our customers. We are always looking for ways to improve our store
            and make it better for our customers.
        </Typography>
        <Box width="100%" display="flex" justifyContent="flex-end">
            <Typography variant="caption" fontSize={3}>
                Note: Above is completely fictional and AI generated content.
            </Typography>
        </Box>
    </Container>
);

export default AboutPage;
