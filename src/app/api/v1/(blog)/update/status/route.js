import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/utils/isAdmin"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH(request) {
    const { id, status } = await request.json()

    if (!['DRAFT', 'PUBLISHED', 'ARCHIVED', 'DELETED'].includes(status)) {
        return NextResponse.json({ message: "Invalid Post Status" }, { status: 400 })
    }

    const getPost = await prisma.post.findUnique({
        where: {
            id,
        },
    })
    const session = await getServerSession(authOptions)
    const admin = isAdmin(session);
    const isAuthor = getPost.authorId == session.user.id


    if (admin || isAuthor) {
        const updatedPost = await prisma.post.update({
            where: {
                id,
            },
            data: {
                status
            }
        })
        return NextResponse.json(updatedPost, { status: 200 })
    }

    return NextResponse.json({ message: "Unauthorized User" }, { status: 400 })
}