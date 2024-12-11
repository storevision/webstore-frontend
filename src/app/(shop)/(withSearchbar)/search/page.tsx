import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { searchProducts } from '@/app/_api/products';
import SearchedProductList from '@/app/(shop)/(withSearchbar)/search/_components/SearchedProductList';

import { homeLink } from '@/constants/navigation';

export interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

const SearchPage: NextPage<SearchPageProps> = async ({ searchParams }) => {
    const { q: query } = await searchParams;

    if (!query) {
        redirect(homeLink);
    }

    const searchResponse = await searchProducts(query);

    const productsFound = searchResponse.success ? searchResponse.data : [];

    return (
        <>
            <SearchedProductList
                searchedProducts={productsFound}
                query={query}
            />
        </>
    );
};

export default SearchPage;
