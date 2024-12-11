'use client';

import type { FC } from 'react';
import { useMemo, useState } from 'react';

import type { SearchedProducts } from '@/app/_api/products';

import SearchedProductCard from '@/components/products/SearchedProductCard';

import { SortBy, sortProducts } from '@/utils/helpers';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export interface SearchedProductListProps {
    searchedProducts: SearchedProducts;
    query: string;
}

const SearchedProductList: FC<SearchedProductListProps> = ({
    searchedProducts,
    query,
}) => {
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.RELEVANCE);

    const sorted = useMemo(
        () => sortProducts(searchedProducts, sortBy),
        [searchedProducts, sortBy],
    );

    return (
        <Box>
            <Box
                display="flex"
                mt={1}
                justifyContent="space-between"
                alignItems="center"
                gap={2}
            >
                <Typography variant="h3">
                    Search results for &#34;{query}&#34;
                </Typography>
                <FormControl
                    variant="filled"
                    sx={{ minWidth: { xs: 150, sm: 200 } }}
                >
                    <InputLabel id="sort-by-label">Sort by</InputLabel>
                    <Select
                        value={sortBy}
                        onChange={event =>
                            setSortBy(event.target.value as SortBy)
                        }
                        variant="filled"
                        labelId="sort-by-label"
                    >
                        <MenuItem value={SortBy.PRICE_ASC}>
                            Price ascending
                        </MenuItem>
                        <MenuItem value={SortBy.PRICE_DESC}>
                            Price descending
                        </MenuItem>
                        <MenuItem value={SortBy.RELEVANCE}>Relevance</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <List>
                {sorted.map(searchedProduct => (
                    <SearchedProductCard
                        key={searchedProduct.product.id}
                        searchedProduct={searchedProduct}
                    />
                ))}
            </List>
        </Box>
    );
};

export default SearchedProductList;
