'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { FC } from 'react';
import { useState } from 'react';

import type { GetCartItemsResponse } from '@/app/_api/cart';

import type { ExtractSuccessData } from '@/utils/api';
import { formatMoney } from '@/utils/helpers';

import { productPage } from '@/constants/navigation';
import { useCartStore } from '@/providers/CartStoreProvider';

import AddIcon from '@mui/icons-material/Add';
import TrashIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import RemoveIcon from '@mui/icons-material/Remove';
import { lighten, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export interface CartItemProps {
    initialData: ExtractSuccessData<GetCartItemsResponse>[number];
}

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 8,
    backgroundColor: lighten(theme.palette.primary.light, 0.9),
    display: 'flex',
    flexDirection: 'row',
}));

const CartItem: FC<CartItemProps> = ({ initialData }) => {
    const router = useRouter();

    // not happy with this but it will work
    const [gotDeleted, setGotDeleted] = useState<boolean>(false);

    const cartItemData = useCartStore(store =>
        store.cartItems?.find(
            item => item.product.id === initialData.product.id,
        ),
    );
    const data = cartItemData || initialData;

    const addProduct = useCartStore(store => store.addProductToCart);

    const removeProduct = useCartStore(store => store.removeProductFromCart);

    const handleAdd = async (): Promise<void> => {
        if (data.product.stock <= data.quantity) {
            return;
        }

        await addProduct(data.product.id, 1);

        router.refresh();
    };

    const handleRemove = async (): Promise<void> => {
        await removeProduct(data.product.id, 1);

        router.refresh();

        if (data.quantity === 1) {
            setGotDeleted(true);
        }
    };

    const handleDelete = async (): Promise<void> => {
        await removeProduct(data.product.id, data.quantity);

        setGotDeleted(true);
        router.refresh();
    };

    if (gotDeleted) {
        return null;
    }

    return (
        <StyledCard elevation={2} data-testid={`cart-item-${data.product.id}`}>
            <CardMedia sx={{ minWidth: 140 }} title={data.product.name}>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Image
                        src={data.product.image_url}
                        alt={data.product.name}
                        placeholder="blur"
                        blurDataURL={`data:image/jpeg;base64,${data.product.blurred_image}`}
                        sizes="(max-width: 600px) 100vw, 600px"
                        fill
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </CardMedia>
            <Box>
                <CardContent>
                    <Typography variant="h5" noWrap>
                        {data.product.name}
                    </Typography>
                    <Typography variant="body1" noWrap>
                        {data.product.description}
                    </Typography>
                    <Typography variant="h6">
                        {formatMoney(data.product.price_per_unit)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box
                        display="flex"
                        alignItems="center"
                        bgcolor="white.main"
                        borderRadius={4}
                        paddingX={1}
                        paddingY={0.5}
                        gap={1}
                    >
                        <IconButton size="small" onClick={handleRemove}>
                            {data.quantity > 1 ? <RemoveIcon /> : <TrashIcon />}
                        </IconButton>
                        <Typography>{data.quantity}</Typography>
                        <IconButton size="small" onClick={handleAdd}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Button
                        startIcon={<TrashIcon />}
                        size="small"
                        onClick={handleDelete}
                        color="error"
                    >
                        Delete
                    </Button>
                    <Button
                        startIcon={<InfoIcon />}
                        size="small"
                        onClick={() =>
                            router.push(
                                productPage(data.product.id, data.product.name),
                            )
                        }
                    >
                        Details
                    </Button>
                </CardActions>
            </Box>
        </StyledCard>
    );
};

export default CartItem;
