'use server';
import {signOut} from "@/auth/auth";

export const signOutFunc = async () => {
    try {
        return await signOut({redirect: false});
    }catch (e) {
        console.error("Ошибка выхода", e);
        throw e;
    }
}