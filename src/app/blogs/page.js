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

    if (!res.ok) {
        console.error("Failed to fetch blogs:", res.status, res.statusText);
        return [];
    }

    let data;
    try {
        data = await res.json();
    } catch (err) {
        console.error("Error parsing JSON:", err);
        return [];
    }

    return data;
}


export default async function Blogs() {
    const blogData = await fetchAllBlogs();

    return (
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-4">
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
        <div className="bg-gray-800/30 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            
            {/* Image Section */}
            <div className="relative aspect-[16/9] w-full">
                <Image 
                    src={image} 
                    alt="Blog Thumbnail" 
                    fill 
                    className="object-cover" 
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-200 line-clamp-2">
                    {title}
                </h2>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {excerpt}
                </p>

                <div className="mt-auto pt-4">
                    <Link 
                        href={`/blog/${link}`} 
                        className="inline-block bg-zinc-600 hover:bg-zinc-500 text-white text-xs font-medium rounded-md px-3 py-1 transition-colors"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}
