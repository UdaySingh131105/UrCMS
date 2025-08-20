import Pagination from "@/components/pagination"
import { getAllBlogs } from "../actions/getAllBlogs"
import BlogCards from "./editableBlogCards"
import { config } from "../static/config"
import CategoryFilter from "@/components/category-filter"
import { getUserBlogs } from "../actions/getUserBlogs"

export default async function UserAllPosts({page = 1, category, user}) {
    const {posts, count} = await getUserBlogs({page, category, user: user.id})
    return <section className="flex flex-col p-5 gap-3">
        <h2 className="font-bold text-xl">Manage all Blogs Here</h2>
        <CategoryFilter  />
        {count > 0 ? posts.map(post => {
           return <BlogCards key={post.id} post={post} />
        }) :
        <div>No Posts to Show</div>
        }
        

        <Pagination className="fixed bottom-10 left-1/2 right-1/2" currPage={page} totalItems={count} perPage={config.perPage} />
    </section>
}