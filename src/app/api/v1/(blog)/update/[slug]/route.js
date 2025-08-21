import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { isAdmin } from "@/utils/isAdmin";

export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        const { slug } = params;

        if (!session) {
            return NextResponse.json(
                { message: "Invalid session, please login again" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, excerpt, keywords, metaDescription, status, ogImage, content } = body;

        if (!title || !content || !slug) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Find the post
        const post = await prisma.post.findUnique({
            where: { slug },
            include: { author: true },
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Authorization check (author or admin)
        const isAuthor = post.authorId === session.user.id;
        const admin = isAdmin(session);

        if (!isAuthor && !admin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        // Update post
        const updatedPost = await prisma.post.update({
            where: { slug },
            data: {
                title,
                excerpt,
                keywords: keywords ? keywords.split(",").map((kw) => kw.trim()) : [],
                desc: metaDescription,
                status,
                thumbnail: ogImage || post.thumbnail,
                content,
            },
        });

        revalidateTag(slug);

        return NextResponse.json(
            { message: "Post updated successfully", post: updatedPost },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function GET(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        const { slug } = params;

        if (!session) {
            return NextResponse.json(
                { message: "Invalid session, please login again" },
                { status: 401 }
            );
        }

        // Find the post
        const post = await prisma.post.findUnique({
            where: { slug },
            include: { author: true },
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Authorization check
        const isAuthor = post.authorId === session.user.id;
        const admin = isAdmin(session);

        if (!isAuthor && !admin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        return NextResponse.json({ post }, { status: 200 });

    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
