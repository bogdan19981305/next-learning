'use server'

import {IFormDataRegister} from "@/types/form-data";
import {prisma} from "@/utils/prisma";

export async function registerUser(formData: IFormDataRegister) {
    const {email,password } = formData;
    try {
        const user = await prisma.user.create({
            data: {email,password},
        });

        console.log('User registered:', user);
        return user;
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Ошибка регистрации');
    }

}