import { Suspense } from "react";
import AdminAllPosts from "@/components/admin/admin-posts";
import UserAllPosts from "@/components/admin/user-posts";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function AllPosts({ searchParams }) {
    const page = Number(searchParams.page) || 1;
    const category = searchParams.cat;
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const admin = await isAdmin(session);

    return <section>
        {admin ? (
            <AdminAllPosts page={page} category={category} />
        ) : (
            <UserAllPosts page={page} category={category} user={session} />
        )}
    </section>

}
