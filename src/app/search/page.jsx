'use client';
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const fetchPost = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/search?query=${encodeURI(query)}`)
            if (!res.ok) {
                if (res.status === 404) {
                    setError("No Post Found")
                    toast({
                        title: 'Posts not Found',
                        variant: 'destructive'
                    })
                    return
                }
            } else {
                setError("")
            }

            const posts = await res.json();
            setError("")
            setResults(posts)
        } catch (error) {
            toast({
                title: error.message,
                vriant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    })

    useEffect(() => {
        if (query) {
            const timer = setTimeout(() => fetchPost(), 500)
            return () => clearTimeout(timer);
        }
    }, [query])

    return <section className="flex h-screen w-full flex-col p-8 gap-2">
        <Input placeholder='Seach Posts' value={query} onChange={e => setQuery(e.target.value)} type='text' className="px-3 outline-none" />
        {loading && "Loading...."}
        {query &&
            <ul className="flex flex-col gap-2">
                {query && error ?
                    <div>{error}</div> :
                    results.map((post, id) => {
                        return <li key={id} className="bg-gray-500/10 p-2 rounded-sm hover:scale-[1.01] hover:bg-gray-400/10 transition-all delay-150">
                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-gray-400 hover:text-gray-300 transition-colors delay-75">{post.title}</h2>
                                <p className="text-sm text-gray-500">{post.excerpt.substring(0, 50)}...</p>
                                <div className="flex text-xs mt-3 gap-2 text-gray-500">
                                    <p>Written by:</p>
                                    <Image src={post.author.image} alt={post.author.image} height={10} width={15} />
                                    <p>{post.author.name}</p>
                                </div>
                            </Link>
                        </li>
                    })
                }

            </ul>
        }

    </section>
}