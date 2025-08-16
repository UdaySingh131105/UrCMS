"use client"

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOut() {
    return (
        <>
            <div onClick={() => {signOut({ callbackUrl: '/signin'})}} className="flex items-center gap-3 cursor-pointer">
                <LogOut className="w-4" /> Log Out
            </div>
        </>
    )
}