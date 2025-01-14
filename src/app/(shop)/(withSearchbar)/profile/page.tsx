import type { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getUserSettings } from '@/app/_api/users';
import UserAddresses from '@/app/(shop)/(withSearchbar)/profile/_components/UserAddresses';

import { userPages } from '@/constants/navigation';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
    title: 'Profile',
};

export interface ProfilePageProps {
    searchParams: Promise<{
        hasAddresses?: boolean;
    }>;
}

const ProfilePage: NextPage<ProfilePageProps> = async ({ searchParams }) => {
    const userSettingsResponse = await getUserSettings();
    const userSettings = userSettingsResponse?.success
        ? userSettingsResponse.data
        : undefined;

    if (!userSettings) {
        redirect(`${userPages.login}?redirect=${userPages.profile}`);
    }

    const { hasAddresses } = await searchParams;

    return (
        <Box>
            <Typography variant="h1" mb={2}>
                Profile Page
            </Typography>
            {hasAddresses ? (
                <Box
                    bgcolor="error.main"
                    color="error.contrastText"
                    p={2}
                    mb={2}
                    borderRadius={4}
                >
                    You need to add an address to checkout!
                </Box>
            ) : null}
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
