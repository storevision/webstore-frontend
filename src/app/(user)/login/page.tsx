import type { Metadata, NextPage } from 'next';

import AuthPage from '@/components/common/AuthPage';
import LoginComponents from '@/components/common/LoginComponents';

import { pageName } from '@/constants';

export const metadata: Metadata = {
    title: 'Login',
};

const LoginPage: NextPage = () => (
    <AuthPage title={`Login to ${pageName}`}>
        <LoginComponents />
    </AuthPage>
);

export default LoginPage;
