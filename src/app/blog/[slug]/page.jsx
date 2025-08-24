import DateFormat from '@/utils/dateFormat';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import '@/styles/blogContent.css'
import { notFound } from 'next/navigation';
import Link from 'next/link';

const getBlog = async (slug) => {
    const blog = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/${slug}`, {
        cache: "no-store"
    });
    if (blog.status == 404) {
        notFound();
    }

    const body = await blog.json();
    return body;
}


export async function generateMetadata({ params }) {
    const res = await getBlog(params.slug);
    return {
        title: res.title,
        description: res.excerpt,
        openGraph: {
            images: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${res.title}`,
        },

    }
}

export default async function BlogPage({ params }) {
    const { slug } = params;
    const blog = await getBlog(slug);
    return (
        <section className="min-h-screen bg-[#0f1117] text-gray-200 py-10">
            <div className="container mx-auto flex flex-col items-center justify-center px-4">

                {/* Thumbnail */}
                <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                    <Image
                        src={blog?.thumbnail || "/thumbnails/dreams.png"}
                        alt={blog.title || "Page Title"}
                        width={600}
                        height={400}
                        className="rounded border shadow-lg object-cover"
                    />
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white mb-4">
                    {blog.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-col items-center space-y-4 mb-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={18} />
                        <p>{DateFormat(new Date(blog.createdAt))}</p>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Category:</span>
                        <span className="px-3 py-1 bg-gray-800 text-xs font-medium border border-gray-600 rounded-lg">
                            {blog.catslug}
                        </span>
                    </div>

                    {/* Tags */}
                    {blog?.keywords?.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-gray-400">Tags:</span>
                            {blog.keywords.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-xs font-medium bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-700 transition"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div
                    className="blogContent prose prose-invert prose-sm md:prose-lg prose-h1:text-2xl prose-h2:text-xl prose-p:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-3xl text-justify w-90vw"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <Link href={`/user/${blog.author.username}`} className="flex items-center gap-3 mt-8 text-gray-400">
                    <Image src={blog.author.image} alt={blog.author.name} width={40} height={40} className="rounded-full" />
                    <span className="font-medium">{blog.author.name}</span>
                </Link>
            </div>
        </section>
    );
}
