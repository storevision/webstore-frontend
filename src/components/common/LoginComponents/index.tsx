'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { FC } from 'react';
import React, { useState } from 'react';

import { StyledForm } from '@/components/common/AuthPage';

import { validateEmail } from '@/utils/validate';

import { homeLink, userPages } from '@/constants/navigation';
import { useUserStore } from '@/providers/UserStoreProvider';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

const LoginComponents: FC = () => {
    const router = useRouter();
    const params = useSearchParams();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const doLogin = useUserStore(store => store.doLogin);

    const query = params.size ? `?${params.toString()}` : '';

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
            if (typeof response === 'undefined' || !response.success) {
                console.error('Login error:', response?.error);
                setError(response?.error ?? 'An error occurred.');
                return;
            }

            setError('');

            if (params.has('redirect')) {
                router.push(params.get('redirect') ?? homeLink);
                return;
            }

            router.push(homeLink);
        } catch (err) {
            if (err) {
                console.error('Login error:', err);
            }
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit} data-testid="login-form">
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
                slotProps={{
                    htmlInput: {
                        'data-testid': 'email-input',
                    },
                }}
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
                slotProps={{
                    htmlInput: {
                        'data-testid': 'password-input',
                    },
                }}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={e => setKeepLoggedIn(e.target.checked)}
                        checked={keepLoggedIn}
                        data-testid="keep-logged-in-checkbox"
                    />
                }
                label="Keep me logged in"
            />
            {error ? (
                <FormHelperText error data-testid="error-message">
                    {error}
                </FormHelperText>
            ) : null}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 8 }}
                endIcon={loading ? <CircularProgress size={20} /> : null}
                disabled={loading}
                data-testid="login-button"
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
                onClick={() => router.push(`${userPages.register}${query}`)}
                data-testid="register-button"
            >
                Register Now
            </Button>
        </StyledForm>
    );
};

export default LoginComponents;
