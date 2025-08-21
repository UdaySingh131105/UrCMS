import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { slug } = params;
    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
            status: 'PUBLISHED'
        },
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                    username: true,
                }
            }
        }
    })
    

    if(!post) {
        return NextResponse.json({message: "Post Not Found"}, {status: 404})
    }

    // console.log(post, " post from prisma");
    return NextResponse.json(post, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}