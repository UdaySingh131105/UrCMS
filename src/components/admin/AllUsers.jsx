import Image from "next/image";
import Link from "next/link";

export async function FetchAllUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export default async function AdminAllUsers() {
    const users = await FetchAllUsers();
    return <section className="p-8 flex flex-col gap-4">
            {users.map((user, id) => {
                return <Link
                href={`/user/${user.username}`}
                    key={`${user.username}_${id}`}
                    className="flex gap-3 bg-gray-600/10 px-3 py-4 rounded"
                >
                    <Image
                        src={user.image}
                        width={70}
                        height={70}
                        className="size-20"
                    />
                    <div className="flex flex-col w-full space-y-1">
                        <h2 className="font-bold text-lg">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>
                </Link>
            })}
    </section>
}