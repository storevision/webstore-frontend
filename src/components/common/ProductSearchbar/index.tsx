'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { FC } from 'react';
import React, { useMemo, useState } from 'react';

import type { Product } from '@/types';

import { mapProductsAndCategories } from '@/utils/helpers';

import { productPage, searchPage } from '@/constants/navigation';
import { useProductsStore } from '@/providers/productsStoreProvider';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { darken, lighten, styled, useTheme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
}));

const GroupItems = styled('ul')(({ theme }) => ({
    padding: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
}));

export interface ProductSearchbarProps {
    zIndex?: number | false;
    fullWidth?: boolean;
    disableSpacing?: boolean;
}

const ProductSearchbar: FC<ProductSearchbarProps> = ({
    zIndex,
    fullWidth,
    disableSpacing,
}) => {
    const theme = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams();
    const products = useProductsStore(store => store.products);

    const initialValue = searchParams.get('q') || '';

    const [inputValue, setInputValue] = useState<string>(initialValue);

    const categories = useProductsStore(store => store.categories);

    const categorizedProducts = useMemo(
        () => mapProductsAndCategories(products, categories, true),
        [products, categories],
    );

    const handleNavigateToProduct = (product: Product): void => {
        const { id, name } = product;
        router.push(productPage(id, name));
    };

    const handleNavigateToSearch = (searchString: string): void => {
        router.push(searchPage(searchString));
    };

    return (
        <Autocomplete
            inputValue={inputValue}
            fullWidth={fullWidth}
            size="small"
            slotProps={{
                popper: {
                    sx: {
                        zIndex:
                            zIndex === false
                                ? undefined
                                : (zIndex ?? theme.zIndex.appBar - 1),
                    },
                },
            }}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            freeSolo
            options={categorizedProducts}
            groupBy={option => option.category.name}
            getOptionLabel={option =>
                typeof option === 'string' ? option : option.name
            }
            renderGroup={params => (
                <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                </li>
            )}
            renderOption={({ key, ...optionProps }, option) => (
                <Box key={key} component="li" {...optionProps}>
                    {option.name}
                    <ArrowForwardIcon sx={{ ml: 'auto' }} />
                </Box>
            )}
            onChange={(_, val) => {
                if (val && typeof val === 'object') {
                    handleNavigateToProduct(val);
                } else if (typeof val === 'string') {
                    handleNavigateToSearch(val);
                }
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Search through our products"
                    sx={{
                        marginTop: disableSpacing ? 0 : theme.spacing(1),
                        marginBottom: disableSpacing ? 0 : theme.spacing(2),
                        backgroundColor: 'transparent',
                        '& .MuiFilledInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            '&:hover': {
                                backgroundColor: darken(
                                    theme.palette.background.paper,
                                    0.05,
                                ),
                            },
                            '&.Mui-focused': {
                                backgroundColor: darken(
                                    theme.palette.background.paper,
                                    0.1,
                                ),
                            },
                        },
                    }}
                />
            )}
        />
    );
};

export default ProductSearchbar;
