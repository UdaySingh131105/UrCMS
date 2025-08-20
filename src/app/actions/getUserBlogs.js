import { prisma } from "@/lib/prisma";
import { config } from "../static/config"

export async function getUserBlogs({page, category, userId}) {
    const postsToShow = config.perPage;

    const query = {
        take: postsToShow,
        skip: postsToShow * (page - 1),
        where: {
            ...(category && {
                catslug: {
                    equals: category,
                    mode: 'insensitive',
                },
                authorId: userId
            })
        },
        orderBy: {
            createdAt: 'desc'
        }
    }


    const [posts, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({
            where: {
                ...(category && {
                    catslug: category
                }),
                authorId: userId
            }
        })
    ])
    return {posts, count}
}