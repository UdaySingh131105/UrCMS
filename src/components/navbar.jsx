import { CloudLightning } from "lucide-react";
import Link from "next/link";
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuthSession } from "@/lib/auth";
import SignOut from "./sign-out";

export default async function NavBar() {
    const session = await getAuthSession();
    const testUser = {
        name: "John Doe",
        username: "johnDoe",
        email: "johnDoe@gmail.com",
    }
    // console.log(session, "session");
    // console.log(session.user, "session user");
    // console.log(session.user.image, "session user image url");
    return (
        <div className="w-full flex justify-between px-8">
            <Link href={'/'} className="flex items-center space-x-2">
                <CloudLightning />
                <span className="font-extrabold">GeekCMS</span>
            </Link>

            {session ? (<>
                <ModalComponet user={session.user} />
             </>
            )
            : (
                <Link href={'/signin'}>
                Sign In
            </Link>
            )}
        </div>
    )
}

const ModalComponet = ({user}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image className="rounded-full border border-[greenyellow]" src={user.image} width={40} height={40}></Image>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Hi, {user.name}!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href={`/profile/${user.username}`}>Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><SignOut /></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 