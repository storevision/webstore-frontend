import type { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getUser } from '@/app/_api/users';

import AuthPage from '@/components/common/AuthPage';
import LoginComponents from '@/components/common/LoginComponents';

import { pageName } from '@/constants';
import { homeLink } from '@/constants/navigation';

export const metadata: Metadata = {
    title: 'Login',
};

const LoginPage: NextPage = async () => {
    const userResponse = await getUser();
    const user = userResponse?.success ? userResponse.data : undefined;

    if (typeof user !== 'undefined') {
        redirect(homeLink);
    }

    return (
        <AuthPage title={`Login to ${pageName}`}>
            <LoginComponents />
        </AuthPage>
    );
};

export default LoginPage;
