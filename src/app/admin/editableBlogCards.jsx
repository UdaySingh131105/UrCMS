"use client";
import { Button } from "@/components/ui/button";
import DateFormat from "@/utils/dateFormat";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogCards({post}) {
    const [postStatus, setPostStatus] = useState(post.status);
    const router = useRouter();

    const handleDelete = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (res.ok) {
            setPostStatus('DELETED')
            router.refresh()
        }
    }

    const convertToDraft = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, status:'DRAFT'})
        })

        if (res.ok) {
            setPostStatus('DRAFT')
            router.refresh()
        }
    }

    const publishPost = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, status:'PUBLISHED'})
        })

        if (res.ok) {
            setPostStatus('PUBLISHED')
            router.refresh()
        }
    }

    return <section className="flex">
        <div className="bg-gray-500/20 border rounded p-4 w-full flex flex-col sm:flex-row md:flex-row justify-between">
            <div className="">
                <h3 className="text-lg font-bold text-gray-400">{post.title}</h3>
                <p className="text-sm text-gray-300">{post.excerpt.substring(0, 100)}...</p>
                <span className="text-xs text-gray-600">{DateFormat(new Date(post.createdAt))}</span>
            </div>
            <div className="flex items-center justify-start gap-3">
                {postStatus === "PUBLISHED" ? <Button variant="outline" onClick={() => {convertToDraft(post.id)}}>Convert to Draft</Button> : <Button onClick={() => {publishPost(post.id)}}>Publish</Button>}
                {postStatus == "PUBLISHED" && <Button onClick={() => {router.push(`/blog/${post.slug}`)}}>View</Button>}
                <Trash className="cursor-pointer" onClick={() => {handleDelete(post.id)}} />
            </div>
        </div>
    </section>
}