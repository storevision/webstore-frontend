import type { FC } from 'react';

import AuthPage from '@/components/common/AuthPage';
import LoginComponents from '@/components/common/LoginComponents';

import { pageName } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
};

const LoginPage: FC = () => (
    <AuthPage title={`Login to ${pageName}`}>
        <LoginComponents />
    </AuthPage>
);

export default LoginPage;
