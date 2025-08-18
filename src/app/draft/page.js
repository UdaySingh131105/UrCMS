"use client"
import Editor from "@/components/Editor";

export default function DraftPage() {
    const savePost = async ({ title, slug, excerpt, category, keywords, metaDescription, status, ogImage, content }) => {
        // BACKEND CALL
        // console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ title, slug, excerpt, category, keywords, metaDescription, status, ogImage, content })
        })

        // console.log(res, " res");

        if(!res.ok) throw Error("Post Saving Failed")
    }
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
            <Editor onSave={savePost} />
        </div>
    )
}