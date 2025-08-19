"use client"
import Editor from "@/components/Editor";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function UpdatePost({params}) {
    const [post, setPost] = useState()
    const { slug } = params;

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/${slug}`)
            if(!res.ok) {
                if(res.status === 403) {
                    toast({
                        title: 'Error',
                        variant: 'destructive',
                        desciption: 'Unauthorized User'
                    })
                } else {
                    toast({
                        title: 'Error',
                        variant: 'destructive',
                        description: 'Unable to load Post'
                    })
                }
            }
            const post = await res.json();
            setPost(post.post)
        }
        fetchPost()
    }, [slug])

    const savePost = async ({ title, excerpt, category, keywords, metaDescription, status, ogImage, content }) => {
        // BACKEND CALL
        // console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create`);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/${slug}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ title, excerpt, keywords, metaDescription, status, ogImage, content })
        })

        // console.log(res, " res");

        if(!res.ok) throw Error("Post Update Failed")
    }

    if(!post) {
        return <></>
    }
    return (
        
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Update your Post: {post.title}</h1>
            <Editor onSave={savePost} initialData={post} />
        </div>
    )
}