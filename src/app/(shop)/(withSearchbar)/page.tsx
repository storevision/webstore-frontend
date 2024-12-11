import type { Metadata, NextPage } from 'next';

import HomePageComponent from '@/app/(shop)/_components/HomePageComponent';

export const metadata: Metadata = {
    title: 'Home',
};

const HomePage: NextPage = () => <HomePageComponent />;

export default HomePage;
