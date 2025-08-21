import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getUser(username) {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            image: true,
            role: true,
            createdAt: true,
            posts: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    status: true,
                    createdAt: true,
                    excerpt: true,
                    thumbnail: true,
                },
            },
        },
    });

    if(!user) {
        return
    }



    return user;
}