import type { SearchedProducts } from '@/app/_api/products';

import type { Category, Product } from '@/types';

import { currency } from '@/constants';

export type SplittedProducts = Record<Category['name'], Product[]>;

export const splitProductsByCategory = (
    products: Product[] | undefined,
    categories: Category[] | undefined,
): SplittedProducts => {
    if (!products || !categories) {
        return {};
    }

    return products.reduce(
        (acc, product) => {
            const category = categories.find(c => c.id === product.category_id);
            if (!category) return acc;

            if (!acc[category.name]) {
                acc[category.name] = [];
            }

            acc[category.name].push(product);

            return acc;
        },
        {} as Record<Category['name'], Product[]>,
    );
};

export type ProductWithCategory = Product & { category: Category };

export const mapProductsAndCategories = (
    products: Product[] | undefined,
    categories: Category[] | undefined,
    sorted: boolean = false,
): ProductWithCategory[] => {
    if (!products || !categories) {
        return [];
    }

    const mapped = products.map(product => {
        const category = categories.find(c => c.id === product.category_id);
        if (!category) {
            // should never happen
            throw new Error(
                `Category not found for product with id ${product.id}`,
            );
        }

        return {
            ...product,
            category,
        };
    });

    if (!sorted) {
        return mapped;
    }

    return mapped.sort((a, b) => {
        const aCategory = a.category.name;
        const bCategory = b.category.name;

        if (aCategory < bCategory) {
            return -1;
        }

        if (aCategory > bCategory) {
            return 1;
        }

        return 0;
    });
};

export enum SortBy {
    PRICE_ASC = 'PRICE_ASC',
    PRICE_DESC = 'PRICE_DESC',
    RELEVANCE = 'RELEVANCE',
}

export const sortProducts = <T = Product[] | SearchedProducts>(
    products: T,
    sortBy: SortBy = SortBy.RELEVANCE,
): T => {
    if (sortBy === SortBy.RELEVANCE) {
        return products;
    }

    const algorithm = (a: Product, b: Product): number => {
        switch (sortBy) {
            case SortBy.PRICE_ASC:
                return a.price_per_unit - b.price_per_unit;
            case SortBy.PRICE_DESC:
                return b.price_per_unit - a.price_per_unit;
            default:
                throw new Error('Invalid sort by value');
        }
    };

    if (
        typeof products === 'object' &&
        'score' in (products as SearchedProducts)[0]
    ) {
        // Important: Use .toSorted() instead of .sort(). .sort() does not make a copy!!!!!!
        return (products as SearchedProducts).toSorted((a, b) =>
            algorithm(a.product, b.product),
        ) as T;
    }

    return (products as Product[]).sort(algorithm) as T;
};

const defaultLocale = 'de-AT';

const useBrowserLocale = false;

export const formatMoney = (amount: number): string => {
    // first, if browser, get the locale from the browser
    let locale = defaultLocale;

    if (typeof window !== 'undefined' && useBrowserLocale) {
        locale = window.navigator.language;
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
};

export const getCurrencySymbol = (): string =>
    new Intl.NumberFormat(defaultLocale, {
        style: 'currency',
        currency,
    })
        .format(0)
        .replace(/[0-9\s.,]/g, '');
