import {prisma} from "@/utils/prisma";
import {User} from "@/generated/prisma";

export const getUserFromDb = async (email: string) =>  {
    return prisma.user.findUnique({
        where: {email},
    }) as Promise<User | null>;
}