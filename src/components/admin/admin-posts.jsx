import Pagination from "@/components/pagination"
import { getAllBlogs } from "../../app/actions/getAllBlogs"
import BlogCards from "./editableBlogCards"
import { config } from "../../app/static/config"
import CategoryFilter from "@/components/category-filter"

export default async function AdminAllPosts({ page, category }) {
    const { posts, count } = await getAllBlogs({ page, category })
    return <section className="flex flex-col p-5 gap-3">
        <h2 className="font-bold text-xl">Manage all Blogs Here</h2>
        <CategoryFilter />
        {count > 0 ? posts.map(post => {
            return <BlogCards key={post.id} post={post} />
        }) :
            <div>No Posts to Show</div>
        }


        <Pagination className="" currPage={page} totalItems={count} perPage={config.perPage} />
    </section>
}