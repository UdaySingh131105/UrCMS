import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
        return NextResponse.json({ message: "Query is blank" }, { status: 404 })
    }

    const posts = await prisma.post.findMany({
        where: {
            status: "PUBLISHED",
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { content: { contains: query, mode: "insensitive" } },
            ],
        },
        include: {
            author: {
                select: {
                    name: true,
                    id: true,
                    image: true,
                },
            },
        },
    })

    if (!posts || posts.length === 0) {
        return NextResponse.json({ message: "No Post with the query found" }, { status: 404 })
    }

    return NextResponse.json(posts, { status: 200 })
}
