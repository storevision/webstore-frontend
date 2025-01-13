'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import moment from 'moment/moment';

import type { GetProductByIdResponse } from '@/app/_api/products';

import type { ExtractSuccessData } from '@/utils/api';

import { useProductsStore } from '@/providers/ProductsStoreProvider';
import { useUserStore } from '@/providers/UserStoreProvider';

import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export interface UserReviewProps {
    review: ExtractSuccessData<GetProductByIdResponse>['reviews'][number];
}

const formatDate = (date: string): string =>
    `${moment(date).fromNow()} (${moment(date).format('MMMM Do YYYY')})`;

const UserReview: FC<UserReviewProps> = ({ review }) => {
    const userId = useUserStore(store => store.user?.id);
    const isFromLoggedInUser = review.user_id === userId;
    const openEditReviewDialog = useProductsStore(
        store => store.openEditReviewDialog,
    );

    const [formattedCreatedAt, setFormattedCreatedAt] = useState<string>(
        formatDate(review.created_at),
    );

    useEffect(() => {
        setFormattedCreatedAt(formatDate(review.created_at));
    }, [review.created_at]);

    const handleEditReview = (): void => {
        openEditReviewDialog({
            productId: review.product_id,
            rating: review.rating,
            comment: review.comment ?? '',
        });
    };

    return (
        <Box display="flex" gap={2} mb={2} flexDirection="row">
            <Box mt={1}>
                {review.user_picture_data_url ? (
                    <Avatar
                        src={review.user_picture_data_url}
                        alt={review.user_display_name}
                        sx={{
                            width: 40,
                            height: 40,
                            padding: 0.5,
                            boxShadow: 2,
                        }}
                    />
                ) : (
                    <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        sx={{ borderRadius: '50%' }}
                    />
                )}
            </Box>
            <Box flex={1}>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap={1}
                    >
                        <Typography variant="h6">
                            {review.user_display_name}
                        </Typography>
                        <Rating value={review.rating} readOnly />
                        {isFromLoggedInUser ? (
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleEditReview()}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        ) : null}
                    </Box>
                    <Typography variant="body2" color="textDisabled">
                        {formattedCreatedAt}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    style={{
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                    }}
                    whiteSpace="pre-line"
                >
                    {review.comment}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserReview;
