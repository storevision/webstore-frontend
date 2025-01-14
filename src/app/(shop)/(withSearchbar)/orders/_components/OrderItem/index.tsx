'use client';

import type { FC } from 'react';
import { useMemo } from 'react';

import moment from 'moment';

import type { GetOrdersResponse } from '@/app/_api/orders';

import type { ExtractSuccessData } from '@/utils/api';
import { formatMoney } from '@/utils/helpers';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export interface OrderItemProps {
    order: ExtractSuccessData<GetOrdersResponse>[number];
}

const OrderItem: FC<OrderItemProps> = ({ order }) => {
    const formattedTime = useMemo(
        () => moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a'),
        [order.created_at],
    );

    return (
        <ListItem key={order.id} sx={{ padding: 2 }} data-testid="order-item">
            <ListItemText
                primary={`Order #${order.id}`}
                secondary={`Ordered on ${formattedTime}`}
            />
            <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="h6">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    items
                </Typography>
                <Typography variant="h6">
                    Total:{' '}
                    {formatMoney(
                        order.items.reduce(
                            (acc, item) =>
                                acc + item.price_per_unit * item.quantity,
                            0,
                        ),
                    )}
                </Typography>
            </Box>
        </ListItem>
    );
};

export default OrderItem;
