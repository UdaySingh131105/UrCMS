import { getAuthSession } from "@/lib/auth"
import { notFound, redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getAuthSession();
    if (!session) {
        return redirect('/signin');
    }
    return (
        <section className="w-full h-screen flex flex-col items-center justify-center text-lg">
            Welcome Back! {session.user.name}!
        </section>
    )
}