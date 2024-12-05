'use client';

import { useRouter } from 'next/navigation';

import type { FC } from 'react';
import React, { useState } from 'react';

import { StyledForm } from '@/components/common/AuthPage';

import { validateEmail } from '@/utils/validate';

import { homeLink, userPages } from '@/constants/navigation';
import { useUserStore } from '@/providers/userStoreProvider';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

const LoginComponents: FC = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const doLogin = useUserStore(store => store.doLogin);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please fill out all fields.');
            return;
        }

        const emailValid = validateEmail(email);

        if (!emailValid) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            setLoading(true);
            const response = await doLogin({ email, password, keepLoggedIn });
            if (!response.success) {
                console.error('Login error:', response.error);
                setError(response.error);
                return;
            }

            setError('');

            router.push(homeLink);
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <TextField
                fullWidth
                variant="filled"
                label="E-Mail Address"
                type="email"
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                    setError('');
                }}
                required
            />
            <TextField
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                    setError('');
                }}
                required
            />
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={e => setKeepLoggedIn(e.target.checked)}
                        checked={keepLoggedIn}
                    />
                }
                label="Keep me logged in"
            />
            {error ? <FormHelperText error>{error}</FormHelperText> : null}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 8 }}
                endIcon={loading ? <CircularProgress size={20} /> : null}
                disabled={loading}
            >
                Login
            </Button>
            <Divider flexItem style={{ margin: '16px 0' }}>
                Don&#39;t have an account?
            </Divider>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={loading}
                onClick={() => router.push(userPages.register)}
            >
                Register Now
            </Button>
        </StyledForm>
    );
};

export default LoginComponents;