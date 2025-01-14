'use client';

import { useRouter } from 'next/navigation';

import type { FC } from 'react';
import { useState } from 'react';

import { useUserStore } from '@/providers/UserStoreProvider';

import TrashIcon from '@mui/icons-material/Delete';
import { alpha, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const AddressBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: alpha(theme.palette.primary.light, 0.2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}));

const UserAddresses: FC = () => {
    const userAddresses = useUserStore(store => store.userSettings?.addresses);
    const currentSettings = useUserStore(store => store.userSettings);
    const updateUserSettings = useUserStore(store => store.updateUserSettings);
    const getUserSettings = useUserStore(store => store.fetchUserSettings);

    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    const [newName, setNewName] = useState<string>('');
    const [newAddress, setNewAddress] = useState<string>('');
    const [newCity, setNewCity] = useState<string>('');
    const [newState, setNewState] = useState<string>('');
    const [newPostalCode, setNewPostalCode] = useState<string>('');
    const [newCountry, setNewCountry] = useState<string>('');

    const handleResetForm = (): void => {
        setNewName('');
        setNewAddress('');
        setNewCity('');
        setNewState('');
        setNewPostalCode('');
        setNewCountry('');
    };

    const handleSaveAddress = async (): Promise<void> => {
        setError(null);

        if (!currentSettings) {
            setError('An unknown error occurred');
            return;
        }

        const result = await updateUserSettings({
            ...currentSettings,
            addresses: [
                ...(currentSettings?.addresses || []),
                {
                    name: newName,
                    address: newAddress,
                    city: newCity,
                    state: newState,
                    postal_code: newPostalCode,
                    country: newCountry,
                },
            ],
        });

        if (!result || !result.success) {
            setError(result?.error ?? 'An unknown error occurred');
            return;
        }

        handleResetForm();
        await getUserSettings();
        router.refresh();
    };

    const handleDeleteAddress = async (index: number): Promise<void> => {
        setError(null);

        if (!currentSettings) {
            setError('An unknown error occurred');
            return;
        }

        const result = await updateUserSettings({
            ...currentSettings,
            addresses:
                currentSettings?.addresses?.filter((_, i) => i !== index) || [],
        });

        if (!result || !result.success) {
            setError(result?.error ?? 'An unknown error occurred');
            return;
        }
        await getUserSettings();
        router.refresh();
    };

    return (
        <Box>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Box display="flex" flexDirection="column" gap={1}>
                    {userAddresses?.map((address, index, { length }) => (
                        <AddressBox key={`user-address-${index}`}>
                            <Box>
                                <Typography variant="h6">
                                    {address.name}
                                </Typography>
                                <Typography>{address.address}</Typography>
                                <Typography>
                                    {address.postal_code} {address.city},{' '}
                                    {address.state}
                                </Typography>
                                <Typography>{address.country}</Typography>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap={1}
                                justifyContent={
                                    index === 0 ? 'space-between' : 'flex-end'
                                }
                            >
                                {index === 0 ? (
                                    <Typography
                                        variant="h6"
                                        color="primary.dark"
                                    >
                                        Main Address
                                    </Typography>
                                ) : null}
                                {length <= 1 ? null : (
                                    <Button
                                        startIcon={<TrashIcon />}
                                        color="error"
                                        variant="contained"
                                        onClick={() =>
                                            handleDeleteAddress(index)
                                        }
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        </AddressBox>
                    ))}
                    {userAddresses?.length ? null : (
                        <AddressBox>
                            <Typography>No addresses found</Typography>
                        </AddressBox>
                    )}
                </Box>
            </Paper>
            <Paper
                elevation={3}
                sx={{ padding: 2, marginTop: 2, borderRadius: 2 }}
            >
                <Typography variant="h6" mb={1}>
                    Add a new address
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                    <TextField
                        label="Name"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        type="text"
                    />
                    <TextField
                        label="Address"
                        value={newAddress}
                        onChange={e => setNewAddress(e.target.value)}
                        type="text"
                    />
                    <TextField
                        label="City"
                        value={newCity}
                        onChange={e => setNewCity(e.target.value)}
                        type="text"
                    />
                    <TextField
                        label="State"
                        value={newState}
                        onChange={e => setNewState(e.target.value)}
                        type="text"
                    />
                    <TextField
                        label="Postal Code"
                        value={newPostalCode}
                        onChange={e => setNewPostalCode(e.target.value)}
                        type="text"
                    />
                    <TextField
                        label="Country"
                        value={newCountry}
                        onChange={e => setNewCountry(e.target.value)}
                        type="text"
                    />
                    <Button onClick={handleSaveAddress} variant="contained">
                        Save Address
                    </Button>
                    {error ? (
                        <Typography color="error">{error}</Typography>
                    ) : null}
                </Box>
            </Paper>
        </Box>
    );
};

export default UserAddresses;
