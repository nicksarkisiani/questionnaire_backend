import * as bcrypt from 'bcryptjs';

export const encodePassword = (rawPassword: string) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
}