"use client";
import { Icons } from "@/components/Icons";
import { toast } from "@/hooks/use-toast";
import { CloudLightning } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const onSignin = () => {
        try {
            setLoading(true);
            toast({
            title: "Signing in...",
            description: "Please wait while we sign you in with GitHub.",
            duration: 5000,
            variant: "loading",
            action: (
                <button
                onClick={() => {
                    toast({
                    title: "Sign-in cancelled",
                    description: "You can try again later.",
                    variant: "destructive"
                    });
                }}
                >
                Cancel
                </button>
                )
            })
            signIn("github")
        } catch (error) {
            console.log("Error during sign-in:", error.message)
            toast({
                title: "Sign-in failed",
                description: "Threre was an error signing you in Please try again later.",
                variant: "destructive",
                action: {
                    label: "Retry",
                    onClick: () => {
                        onSignin();
                    }
                }
            })
        } finally {
            setLoading(false);
        }

    }

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className="w-full sm:w-1/2 md:w-[40%] lg:w-[50%] mx-4 p-4 flex justify-center items-center gap-4 flex-col rounded-lg bg-zinc-500/10">
                <CloudLightning className="size-20 text-gray-400" />
                <p className="text-center text-gray-400">Welcome, by continuing with GeekCMS signin you will be a Geek!</p>
                <button onClick={onSignin} className="hover:bg-gray-300 hover:text-black transition-all delay-75 flex justify-center items-center gap-2 p-2 px-4 font-bold border bg-gray-500/10 rounded-md"><Icons.GithubLogo className="size-7" />{loading ? 'Signing In...' : "Sign In"}</button>
            </div>
        </section>
    )
}