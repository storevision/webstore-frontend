'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { FC } from 'react';
import React, { useState } from 'react';

import { StyledForm } from '@/components/common/AuthPage';

import { validateEmail } from '@/utils/validate';

import { homeWithWelcome, userPages } from '@/constants/navigation';
import { useUserStore } from '@/providers/UserStoreProvider';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

const RegisterComponents: FC = () => {
    const router = useRouter();
    const params = useSearchParams();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [genericError, setGenericError] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepeatPassword, setShowRepeatPassword] =
        useState<boolean>(false);

    const doRegister = useUserStore(store => store.doRegister);

    const setError = (error: string): void => {
        setEmailError(error);
        setPasswordError(error);
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        setShowPassword(false);
        setShowRepeatPassword(false);

        const emailText = email.trim();
        const passwordText = password.trim();
        const nameText = name.trim();
        const repeatPasswordText = repeatPassword.trim();

        if (!emailText || !passwordText || !nameText || !repeatPasswordText) {
            setError('Please fill out all fields.');
            return;
        }

        const emailValid = validateEmail(emailText);

        if (!emailValid) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        const isPasswordValid = passwordText.length >= 8;

        if (!isPasswordValid) {
            setPasswordError('Password must be at least 8 characters long.');
            return;
        }

        if (passwordText !== repeatPasswordText) {
            setPasswordError('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);

            const response = await doRegister({
                displayName: name,
                email,
                password,
            });
            if (typeof response === 'undefined' || !response.success) {
                console.error('Register error:', response?.error);
                setGenericError(response?.error ?? 'An error occurred.');
                return;
            }

            setError('');
            setGenericError('');

            if (params.has('redirect')) {
                const newUrl = params.get('redirect');

                if (newUrl) {
                    const newParams = new URLSearchParams();
                    newParams.append('welcome', '');

                    const paramsString = `?${newParams.toString()}`;
                    router.push(`${newUrl}${paramsString}`);

                    return;
                }
            }

            router.push(homeWithWelcome);
        } catch (err) {
            if (err) {
                console.error('Register error:', err);
            }
            setGenericError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const query = params.size ? `?${params.toString()}` : '';

    return (
        <StyledForm onSubmit={handleSubmit} data-testid="register-form">
            <TextField
                fullWidth
                variant="filled"
                label="Name"
                value={name}
                autoComplete="name"
                onChange={e => {
                    setName(e.target.value);
                    setError('');
                }}
                required
                slotProps={{
                    htmlInput: {
                        'data-testid': 'display-name-input',
                    },
                }}
            />
            <TextField
                fullWidth
                variant="filled"
                label="E-Mail Address"
                type="email"
                value={email}
                autoComplete="email"
                onChange={e => {
                    setEmail(e.target.value);
                    setError('');
                }}
                required
                error={!!emailError}
                helperText={emailError}
                slotProps={{
                    htmlInput: {
                        'data-testid': 'email-input',
                    },
                    formHelperText: {
                        'data-testid': 'email-error',
                    },
                }}
            />
            <TextField
                fullWidth
                variant="filled"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                autoComplete="new-password"
                onChange={e => {
                    setPassword(e.target.value);
                    setError('');
                }}
                required
                error={!!passwordError}
                helperText={passwordError}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton
                                onClick={() => setShowPassword(prev => !prev)}
                                onMouseDown={e => e.preventDefault()}
                                tabIndex={0}
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </IconButton>
                        ),
                    },
                    htmlInput: {
                        'data-testid': 'password-input',
                    },
                    formHelperText: {
                        'data-testid': 'password-error',
                    },
                }}
            />
            <TextField
                fullWidth
                variant="filled"
                label="Repeat Password"
                type={showRepeatPassword ? 'text' : 'password'}
                value={repeatPassword}
                onChange={e => {
                    setRepeatPassword(e.target.value);
                    setError('');
                }}
                onPaste={e => e.preventDefault()}
                required
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton
                                onClick={() =>
                                    setShowRepeatPassword(prev => !prev)
                                }
                                onMouseDown={e => e.preventDefault()}
                                tabIndex={0}
                            >
                                {showRepeatPassword ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </IconButton>
                        ),
                    },
                    htmlInput: {
                        'data-testid': 'password-confirmation-input',
                    },
                }}
            />
            {genericError ? (
                <FormHelperText error data-testid="generic-error-message">
                    {genericError}
                </FormHelperText>
            ) : null}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 8 }}
                endIcon={loading ? <CircularProgress size={20} /> : null}
                disabled={loading}
                data-testid="register-button"
            >
                Register
            </Button>
            <Divider flexItem style={{ margin: '16px 0' }}>
                Already have an account?
            </Divider>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => router.push(`${userPages.login}${query}`)}
                disabled={loading}
            >
                Login here
            </Button>
        </StyledForm>
    );
};

export default RegisterComponents;
