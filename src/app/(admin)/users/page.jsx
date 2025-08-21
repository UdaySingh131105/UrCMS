import AdminAllUsers from "@/components/admin/AllUsers";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/utils/isAdmin";
import { getServerSession } from "next-auth"

export default async function AllUsers() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <section className="w-full h-screen flex justify-center items-center">
            <p>
                User Not Authenticated Yet!
            </p>
        </section>
    }
    const admin = await isAdmin(session)
    if (!admin) {
        return <section className="w-full h-screen flex justify-center items-center">
            <p>
                User Not Authorized
            </p>
        </section>
    }
    return <AdminAllUsers />
}