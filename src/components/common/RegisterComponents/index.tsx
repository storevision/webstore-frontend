'use client';

import { useRouter } from 'next/navigation';

import type { FC } from 'react';
import React, { useState } from 'react';

import { StyledForm } from '@/components/common/AuthPage';

import { validateEmail } from '@/utils/validate';

import { homeLink, userPages } from '@/constants/navigation';
import { useUserStore } from '@/providers/userStoreProvider';

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

        if (!email || !password || !name || !repeatPassword) {
            setError('Please fill out all fields.');
            return;
        }

        const emailValid = validateEmail(email);

        if (!emailValid) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        if (password !== repeatPassword) {
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
            if (!response.success) {
                console.error('Login error:', response.error);
                setGenericError(response.error);
                return;
            }

            setError('');
            setGenericError('');

            router.push(homeLink);
        } catch (err) {
            console.error('Login error:', err);
            setGenericError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

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
                error={!!passwordError}
                helperText={passwordError}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton
                                onClick={() =>
                                    setShowRepeatPassword(prev => !prev)
                                }
                                onMouseDown={e => e.preventDefault()}
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
                onClick={() => router.push(userPages.login)}
                disabled={loading}
            >
                Login here
            </Button>
        </StyledForm>
    );
};

export default RegisterComponents;
