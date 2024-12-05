import type { FC } from 'react';

import AuthPage from '@/components/common/AuthPage';
import RegisterComponents from '@/components/common/RegisterComponents';

import { pageName } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register',
};

const RegisterPage: FC = () => (
    <AuthPage title={`Register for ${pageName}`}>
        <RegisterComponents />
    </AuthPage>
);

export default RegisterPage;
