import type { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

import moment from 'moment/moment';

import { getOrders } from '@/app/_api/orders';
import OrderItem from '@/app/(shop)/(withSearchbar)/orders/_components/OrderItem';

import { userPages } from '@/constants/navigation';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
    title: 'Orders',
};

const OrdersPage: NextPage = async () => {
    const ordersResponse = await getOrders();
    const orders = ordersResponse?.success ? ordersResponse.data : undefined;

    if (typeof orders === 'undefined') {
        redirect(`${userPages.login}?redirect=${userPages.orders}`);
    }

    return (
        <Box>
            <Typography variant="h1" mb={2}>
                Previous Orders
            </Typography>
            <Box mb={2}>
                <Paper elevation={0} sx={{ borderRadius: 4 }}>
                    <List disablePadding>
                        {orders.map(order => (
                            <OrderItem key={order.id} order={order} />
                        ))}
                        {orders.length === 0 ? (
                            <ListItem>
                                <ListItemText primary="No orders found" />
                            </ListItem>
                        ) : null}
                    </List>
                </Paper>
            </Box>
        </Box>
    );
};

export default OrdersPage;
