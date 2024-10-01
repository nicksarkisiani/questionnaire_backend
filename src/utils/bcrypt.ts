import * as bcrypt from 'bcryptjs';

export const encodePassword = (rawPassword: string) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
}

export const comparePassword = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
}