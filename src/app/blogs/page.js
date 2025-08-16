import Image from "next/image";
import Link from "next/link";

const blogConfig = [
    {
        title: "React vs Next.js",
        description: "A comprehensive comparison between React and Next.js, exploring their features, preformance, and use cases.",
        image: "/thumbnails/react-vs-next.png",
        link: "/react-vs-next"
    },
    {
        title: "Dream Big",
        description: "A comprehensive comparison between React and Next.js, exploring their features, preformance, and use cases.",
        image: "/thumbnails/dreams.png",
        link: "/dream-big"
    },
    {
        title: "Dreams of a Developer",
        description: "Get a job as a developer, work on exciting projects, and make a difference in the tech world.",
        image: "/thumbnails/become-backend-developer.png",
        link: "/react-vs-next"
    }
]

export default function Blogs() {
    return (
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {
                blogConfig.map((blog, index) => {
                    return (
                        <BlogCard title={blog.title} description={blog.description} image={blog.image} link={blog.link} />
                    )
                })
            }
        </section>
    )
}

const BlogCard = ({ title, description, image, link }) => {
    return (
        <div className="bg-gray-700/15 rounded-lg p-4 hover:bg-gray-400/25 transition-all duration-300 delay-75 shadow-lg gap-2">
            <Image src={image} className="w-full rounded" alt="Blog Thumbnail" width={300} height={200} />
            <h2 className="text-gray-300 font-bold text-2xl">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
            <Link href={`/blog${link}`} className="bg-zinc-500 text-xs rounded px-2 py-1 mt-2 inline-block" >Read More</ Link>
        </div>
    )
}