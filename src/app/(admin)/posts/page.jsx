import AdminAllPosts from "@/app/admin/admin-posts";
import UserAllPosts from "@/app/admin/user-posts";
import { authOptions } from "@/lib/auth"
import { isAdmin } from "@/utils/isAdmin";
import { getServerSession } from "next-auth"

export default async function AllPosts({ searchParams}) {
    const page = searchParams.page || 1;
    const category = searchParams.cat || null;
    const session = await getServerSession(authOptions);

    const admin = await isAdmin(session);
    if(!admin) {
        return <UserAllPosts page={page} category={category} user={session} />
    }
    return <div>
        <AdminAllPosts page={page} category={category} />
    </div>
}