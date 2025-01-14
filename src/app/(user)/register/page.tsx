import type { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getUser } from '@/app/_api/users';

import AuthPage from '@/components/common/AuthPage';
import RegisterComponents from '@/components/common/RegisterComponents';

import { pageName } from '@/constants';
import { homeLink } from '@/constants/navigation';

export const metadata: Metadata = {
    title: 'Register',
};

const RegisterPage: NextPage = async () => {
    const userResponse = await getUser();
    const user = userResponse?.success ? userResponse.data : undefined;

    if (typeof user !== 'undefined') {
        redirect(homeLink);
    }

    return (
        <AuthPage title={`Register for ${pageName}`}>
            <RegisterComponents />
        </AuthPage>
    );
};

export default RegisterPage;
