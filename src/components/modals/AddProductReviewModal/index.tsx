'use client';

import { useRouter } from 'next/navigation';

import type { FC } from 'react';
import React, { useCallback, useEffect, useState } from 'react';

import BaseModal from '@/components/common/BaseModal';

import { useProductsStore } from '@/providers/productsStoreProvider';
import { useUserStore } from '@/providers/userStoreProvider';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const AddProductReviewModal: FC = () => {
    const reviewDialogOpen = useProductsStore(store => store.reviewDialogOpen);
    const closeReviewDialog = useProductsStore(
        store => store.closeReviewDialog,
    );
    const sendReview = useProductsStore(store => store.sendReview);
    const user = useUserStore(store => store.user);

    const [rating, setRating] = useState<number | null>(null);

    const [review, setReview] = useState<string>('');

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (reviewDialogOpen) {
            setRating(reviewDialogOpen.rating);
            setReview('');
        }
    }, [reviewDialogOpen]);

    const handleSendReview = useCallback(
        async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
            event.preventDefault();

            if (reviewDialogOpen === null) {
                return;
            }

            if (rating === null) {
                setError('Please select a rating');
                return;
            }

            const response = await sendReview({
                rating,
                comment: review,
                product_id: reviewDialogOpen.productId,
            });

            if (!response.success) {
                setError(response.error ?? 'An error occurred');
            } else {
                router.refresh();
            }
        },
        [rating, review, reviewDialogOpen, sendReview, router],
    );

    return (
        <BaseModal
            open={reviewDialogOpen !== null}
            onClose={closeReviewDialog}
            title="Add a review"
        >
            {reviewDialogOpen ? (
                <form onSubmit={handleSendReview}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        p={2}
                        borderRadius={4}
                        bgcolor="background.paper"
                        boxShadow={2}
                    >
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            gap={1}
                        >
                            <Avatar
                                src={user?.picture_data_url ?? undefined}
                                sx={{
                                    boxShadow: theme => theme.shadows[1],
                                }}
                            />
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Typography variant="h6">
                                    {user?.display_name ?? 'Anonymous'}
                                </Typography>
                                <Rating
                                    name="rating"
                                    defaultValue={reviewDialogOpen.rating}
                                    value={rating}
                                    onChange={(_, newValue) =>
                                        setRating(newValue)
                                    }
                                    size="large"
                                />
                            </Box>
                        </Box>
                        <TextField
                            label="Review"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            required
                            value={review}
                            onChange={event => setReview(event.target.value)}
                            slotProps={{
                                htmlInput: {
                                    'data-testid': 'add-review-input',
                                    sx: {
                                        resize: 'vertical',
                                        overflow: 'auto',
                                        maxHeight: 400,
                                        minHeight: 100,
                                    },
                                },
                            }}
                        />
                        {error ? (
                            <FormHelperText
                                error
                                data-testid="add-review-error"
                            >
                                {error}
                            </FormHelperText>
                        ) : null}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            data-testid="add-review-submit"
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            ) : null}
        </BaseModal>
    );
};

export default AddProductReviewModal;
