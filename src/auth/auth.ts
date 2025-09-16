import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {prisma} from "@/utils/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {LoginSchema} from "@/schema/login.schema";
import * as Yup from "yup";
import {getUserFromDb} from "@/utils/user";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            id: "credentials",
            credentials: {
                email: { label: "Емейл", type: "email" },
                password: { label: "Пароль", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = await LoginSchema.validate(credentials, { abortEarly: false });

                    const user = await getUserFromDb(email);

                    if (!user || !user.password) {
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        return null;
                    }

                    return { id: String(user.id), email: user.email, name: user.name ?? undefined };
                } catch (error) {
                    if (error instanceof Yup.ValidationError) {
                        throw new Error(error.message);
                    }
                    throw error;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 3600
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    }
});

export const { GET, POST } = handlers;