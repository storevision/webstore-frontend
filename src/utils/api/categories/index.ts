import { unstable_cache } from 'next/cache';

import fetchApi from '@/utils/api/fetchApi';

export const getCategories = unstable_cache(
    async () => fetchApi('/categories/list'),
    ['categories'],
    { revalidate: 60, tags: ['categories'] },
);
