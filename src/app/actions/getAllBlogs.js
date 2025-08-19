import { prisma } from "@/lib/prisma";
import { config } from "../static/config"

export async function getAllBlogs({page, category}) {
    const postsToShow = config.perPage;

    const query = {
        take: postsToShow,
        skip: postsToShow * (page - 1),
        where: {
            ...(category && {
                catslug: {
                    equals: category,
                    mode: 'insensitive',
                }
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
                })
            }
        })
    ])
    return {posts, count}
}