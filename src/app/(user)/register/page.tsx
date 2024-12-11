import type { Metadata, NextPage } from 'next';

import AuthPage from '@/components/common/AuthPage';
import RegisterComponents from '@/components/common/RegisterComponents';

import { pageName } from '@/constants';

export const metadata: Metadata = {
    title: 'Register',
};

const RegisterPage: NextPage = () => (
    <AuthPage title={`Register for ${pageName}`}>
        <RegisterComponents />
    </AuthPage>
);

export default RegisterPage;
