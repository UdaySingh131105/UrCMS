import Image from "next/image";
import Link from "next/link";

/**
 * {
    id: '68a21c3794ba3591ad199c3c',
    title: 'react vs nextjs',
    slug: 'react-vs-nextjs',
    content: '<p>demo content for react vs nextjs</p>',
    thumbnail: 'https://res.cloudinary.com/geekcms/image/upload/v1755454195/fobmuinzqjybmexn8amt.png',
    desc: 'find you development framework',
    keywords: [],
    excerpt: 'demo excerpt',
    authorId: '68a0d76d360752ba53d684ae',
    catslug: 'Coding',
    createdAt: '2025-08-17T18:15:19.923Z',
    status: 'PUBLISHED'
  }
 * @returns 
 */

const fetchAllBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get`, {
        cache: "no-store"
    });
    // console.log(res, " response from the post");
    const data = await res.json();
    // console.log(data, " data");
    return data;
}

export default async function Blogs() {
    const blogData = await fetchAllBlogs();
    return (
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {
                blogData.map((blog, index) => {
                    return (
                        <BlogCard title={blog.title} excerpt={blog.excerpt} image={blog.thumbnail} link={blog.slug} />
                    )
                })
            }
        </section>
    )
}

const BlogCard = ({ title, excerpt, image, link }) => {
    return (
        <div className="bg-gray-700/15 rounded-lg p-4 hover:bg-gray-400/25 transition-all duration-300 delay-75 shadow-lg gap-2">
            <Image src={image} className="w-full rounded" alt="Blog Thumbnail" width={300} height={200} />
            <h2 className="text-gray-300 font-bold text-2xl">{title}</h2>
            <p className="text-sm text-gray-500">{excerpt}</p>
            <Link href={`/blog/${link}`} className="bg-zinc-500 text-xs rounded px-2 py-1 mt-2 inline-block" >Read More</ Link>
        </div>
    )
}