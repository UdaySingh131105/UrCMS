import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/utils/isAdmin"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 })
        }

        const getPost = await prisma.post.findUnique({
            where: { id },
        })

        if (!getPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 })
        }

        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        }

        const admin = isAdmin(session)
        const isAuthor = getPost.authorId === session.user.id

        if (admin || isAuthor) {
            // If you want to "soft delete", update status instead:
            // const deletedPost = await prisma.post.update({
            //     where: { id },
            //     data: { status: "DELETED" },
            // })

            // Hard delete:
            await prisma.post.delete({
                where: { id },
            })

            return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })
        }

        return NextResponse.json({ message: "Unauthorized User" }, { status: 403 })
    } catch (err) {
        console.error("Error deleting post:", err)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
