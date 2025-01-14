import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getUserSettings } from '@/app/_api/users';
import UserAddresses from '@/app/(shop)/(withSearchbar)/profile/_components/UserAddresses';

import { userPages } from '@/constants/navigation';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ProfilePage: NextPage = async () => {
    const userSettingsResponse = await getUserSettings();
    const userSettings = userSettingsResponse?.success
        ? userSettingsResponse.data
        : undefined;

    if (!userSettings) {
        redirect(`${userPages.login}?redirect=${userPages.profile}`);
    }

    return (
        <Box>
            <Typography variant="h1" mb={2}>
                Profile Page
            </Typography>
            <Box mb={2}>
                <Paper elevation={0} sx={{ padding: 2, borderRadius: 4 }}>
                    <Typography variant="h4" mb={1}>
                        Addresses
                    </Typography>
                    <UserAddresses />
                </Paper>
            </Box>
        </Box>
    );
};

export default ProfilePage;
