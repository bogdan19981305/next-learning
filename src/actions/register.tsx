'use server'

import {IFormDataRegister} from "@/types/form-data";
import {prisma} from "@/utils/prisma";
import {saltAndHashPassword} from "@/utils/password";

export async function registerUser(formData: IFormDataRegister) {
    const {email,password, passwordConfirm } = formData;
    try {

        if(password !== passwordConfirm) {
            throw new Error('Пароли не совпадают');
        }
        const pwHash = await saltAndHashPassword(password);

        const userIsContains = await prisma.user.findUnique({
            where: {email},
        });

        if(userIsContains) {
            throw new Error('Пользователь с таким емейлом уже существует');
        }

        const user = await prisma.user.create({
            data: {email,password: pwHash},
        });

        console.log('User registered:', user);
        return user;
    } catch (error) {
        console.error('Error registering user:', error);
        if(error instanceof Error) {
            throw new Error(error?.message || 'Ошибка при регистрации пользователя');
        }
        throw new Error('Ошибка при регистрации пользователя');
    }

}