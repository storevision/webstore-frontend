'use client';

import { useRouter } from 'next/navigation';

import type { FC } from 'react';
import React, { useCallback, useEffect, useState } from 'react';

import BaseModal from '@/components/common/BaseModal';

import { useProductsStore } from '@/providers/productsStoreProvider';
import { useUserStore } from '@/providers/userStoreProvider';

import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const EditProductReviewModal: FC = () => {
    const editReviewDialogOpen = useProductsStore(
        store => store.editReviewDialogOpen,
    );
    const closeEditReviewDialog = useProductsStore(
        store => store.closeEditReviewDialog,
    );
    const editReview = useProductsStore(store => store.editReview);
    const deleteReview = useProductsStore(store => store.deleteReview);

    const user = useUserStore(store => store.user);

    const [rating, setRating] = useState<number | null>(null);

    const [review, setReview] = useState<string>('');

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (editReviewDialogOpen) {
            setRating(editReviewDialogOpen.rating);
            setReview(editReviewDialogOpen.comment);
        }
    }, [editReviewDialogOpen]);

    const handleSendReview = useCallback(
        async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
            event.preventDefault();

            if (editReviewDialogOpen === null) {
                return;
            }

            if (rating === null) {
                setError('Please select a rating');
                return;
            }

            const response = await editReview({
                rating,
                comment: review,
                product_id: editReviewDialogOpen.productId,
            });

            if (!response.success) {
                setError(response.error ?? 'An error occurred');
            } else {
                router.refresh();
            }
        },
        [rating, review, editReviewDialogOpen, editReview, router],
    );

    const handleDeleteReview = useCallback(async () => {
        if (editReviewDialogOpen === null) {
            return;
        }

        const response = await deleteReview(editReviewDialogOpen.productId);

        if (!response.success) {
            setError(response.error ?? 'An error occurred');
        } else {
            router.refresh();
        }
    }, [editReviewDialogOpen, deleteReview, router]);

    return (
        <BaseModal
            open={editReviewDialogOpen !== null}
            onClose={closeEditReviewDialog}
            title="Edit your review"
        >
            {editReviewDialogOpen ? (
                <>
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
                                justifyContent="space-between"
                                gap={1}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    gap={1}
                                    alignItems="center"
                                >
                                    <Avatar
                                        src={
                                            user?.picture_data_url ?? undefined
                                        }
                                        sx={{
                                            boxShadow: theme =>
                                                theme.shadows[1],
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
                                            defaultValue={
                                                editReviewDialogOpen.rating
                                            }
                                            value={rating}
                                            onChange={(_, newValue) =>
                                                setRating(newValue)
                                            }
                                            size="large"
                                        />
                                    </Box>
                                </Box>
                                <Tooltip title="Delete review" arrow>
                                    <IconButton
                                        onClick={handleDeleteReview}
                                        data-testid="delete-review"
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <TextField
                                label="Review"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                required
                                value={review}
                                onChange={event =>
                                    setReview(event.target.value)
                                }
                                slotProps={{
                                    htmlInput: {
                                        'data-testid': 'edit-review-input',
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
                                    data-testid="edit-review-error"
                                >
                                    {error}
                                </FormHelperText>
                            ) : null}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                data-testid="edit-review-submit"
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </>
            ) : null}
        </BaseModal>
    );
};

export default EditProductReviewModal;
