'use server';

import {signIn} from "@/auth/auth";
import {AuthError} from "next-auth";

export const signInWithCredentials = async (email: string, password: string) => {
    try {
        return await signIn('credentials', {email, password, redirect: false});
    } catch (e) {
        if (e instanceof AuthError) {
            if (e.type === "CredentialsSignin") {
                return { ok: false, message: "Неверный email или пароль" };
            }
            return { ok: false, message: e.message || "Ошибка авторизации" };
        }
        return { ok: false, message: "Неизвестная ошибка авторизации" };
    }
};