import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await getAuthSession();
    if (!session || !session.user) return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })

    const body = await request.json();
    const { title, slug, excerpt, category, keywords, metaDescription, status, ogImage, content } = body;

    if (!title || !content || !slug || !category || !session.user.id) {
        return NextResponse.json({ message: "Missing Fields" }, { status: 402 })
    }

    const postStatus = status || "DRAFT";
    try {
        let categoryCheck = await prisma.category.findUnique({
            where: { slug: category }
        })

        if (!categoryCheck) {
            categoryCheck = await prisma.category.create({
                data: {
                    title: category.charAt(0).toUpperCase() + category.slice(1),
                    slug: category
                }
            })
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                thumbnail: ogImage || null,
                desc: metaDescription || null,
                keywords: keywords ? keywords.split(",").map(k => k.trim()).filter(k => k.length > 0) : [],
                excerpt,
                authorId: session.user.id,
                catslug: categoryCheck.slug,
                status: postStatus,
            },
        })
        return NextResponse.json(newPost, { message: "ok" }, { status: 201 })
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Could Not Save Post" }, { status: 500 })
    }
}