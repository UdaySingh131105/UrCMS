import { getUser } from "@/app/actions/getUser";
import DateFormat from "@/utils/dateFormat";
import { Calendar, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SingleUserProfile({ params }) {
  const { username } = params;
  const user = await getUser(username);
  if (!user) notFound();
  return <section className="p-4 flex flex-col gap-2">
    <UserProfile user={user} />
    <UserPosts user={user} />
  </section>
}

const UserProfile = ({ user }) => {
  return <div className="flex flex-col justify-center items-center gap-2">
    <Image className="rounded-md" src={user.image} alt={`${user.name}`} height={200} width={200} />
    <h1 className="text-2xl font-bold text-gray-400">{user.name}</h1>
    <p className="text-gray-600"><b>Email:</b> {user.email}</p>
    <p className="text-gray-600"><b>Username:</b> @{user.username}</p>
    <p className="text-gray-600"><b>Joined On:</b> {DateFormat(user.createdAt)}</p>
  </div>
}

const UserPosts = ({ user }) => {
  const posts = user.posts;
  if (posts.length < 1) return <h2 className="font-bold text-xl">No Post Found</h2>
  return <section className="mt-3 justify-center items-center">
    <h2 className="text-xl font-semibold text-center text-gray-400">User Posts</h2>
    {posts.map((post, id) => {
      return <div href={`/blog/${post.slug}`} key={`${post.slug}_${id}`} className="bg-gray-700/10 p-3 flex m-2 gap-2">
        <div className="relative h-44 w-64">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2">
              <Link href={`/blog/${post.slug}`}><h3 className="font-bold text-xl text-gray-400 hover:text-gray-200 transition-all delay-75">{post.title}</h3></Link>
              <p className="text-sm text-gray-400">{post.excerpt.substring(0, 500)}...</p>
            </div>
            <div>
              <Link href={`/draft/${post.slug}`} ><Edit /></Link>
            </div>
          </div>

          <p className="flex text-xs text-gray-500 items-center">
            <Calendar className="size-5" />{DateFormat(post.createdAt)}
          </p>
        </div>
      </div>
    })}

  </section>
}