import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {prisma} from "@/utils/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {LoginSchema} from "@/schema/login.schema";
import * as Yup from "yup";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'Емейл',
                    type: 'email',
                },
                password: {
                    label: 'Пароль',
                    type: 'password',
                },
            },
            authorize: async (credentials: Partial<Record<"email" | "password", unknown>>) => {
                try {
                    let user = null

                    const { email, password } = await LoginSchema.validate(credentials);

                    // logic to verify if the user exists
                    user = await getUserFromDb(email, pwHash)

                    if (!user) {
                        throw new Error("Invalid credentials.")
                    }

                    return user
                } catch (error) {
                    if (error instanceof Yup.ValidationError) {
                        throw new Error(error.message)
                    }
                }
            },
        }),
    ],
})