import bcrypt from "bcryptjs";

export const saltAndHashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
}

