import * as EmailValidator from 'email-validator';

export const validateEmail = (email: string): boolean =>
    EmailValidator.validate(email);
