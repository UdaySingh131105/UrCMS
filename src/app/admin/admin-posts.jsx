import { getAllBlogs } from "../actions/getAllBlogs"
import BlogCards from "./editableBlogCards"

export default async function AdminAllPosts({page, category}) {
    const {posts, count} = await getAllBlogs({page, category})
    return <section className="flex flex-col p-5 gap-3">
        <h2 className="font-bold text-xl">Manage all Blogs Here</h2>
        {count}

        {posts.map(post => {
           return <BlogCards key={post.id} post={post} />
        })}
    </section>
}