import type { Metadata } from 'next';

import type { JSX } from 'react';

export const metadata: Metadata = {
    title: 'Home',
};

export default function Home(): JSX.Element {
    return <main>My content</main>;
}
