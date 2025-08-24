import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Icon, Layers, Pencil, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <main>
      <section className="flex h-[50vh] sm:h-[70vh] items-center w-full justify-center">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl m-2">Manage you content with Ease</h1>
            <p className="text-gray-500 max-w-[700px] mx-auto">Streamline your workflow, publish with confidence</p>
          </ div>
          <div className="flex gap-2">
            <Link href="/blogs" className="bg-gray-500 rounded-lg p-2 pt-1 text-black hover:bg-gray-100 transition-all duration-100 delay-75">Learn More</Link>
            <Link href={`/signin`} className="bg-gray-500 rounded-lg px-2 pt-1 text-black hover:bg-gray-100 transition-all duration-100 delay-75">Try it out!</Link>
          </div>
        </div>
      </section>

      <section className="min-h-screen sm:min-h-[50vh] bg-gray-600/10 w-full flex justify-center items-center px-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl">
          <div className="flex flex-col justify-center items-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
            <Pencil size={50} className="text-blue-400" />
            <h3 className="text-xl text-center font-bold text-gray-200">Intuitive Editor</h3>
            <p className="text-gray-400 text-sm text-center">Write, edit, and format your content effortlessly.</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
            <Layers size={50} className="text-green-400" />
            <h3 className="text-xl text-center font-bold text-gray-200">Content Organization</h3>
            <p className="text-gray-400 text-sm text-center">Manage posts, pages, and assets with ease.</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
            <Zap size={50} className="text-yellow-400" />
            <h3 className="text-xl text-center font-bold text-gray-200">Blazing Fast Publishing</h3>
            <p className="text-gray-400 text-sm text-center">Publish content instantly with optimized performance.</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
            <Icons.BlogCustomItem className="w-16 h-16 text-purple-400" />
            <h3 className="text-xl text-center font-bold text-gray-200">Secure & Reliable</h3>
            <p className="text-gray-400 text-sm text-center">Your data stays safe with built-in authentication & protection.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-4 p-4">
        <div className="min-h-[50vh] flex flex-col items-start justify-center gap-3 w-[50vw]">
          <h4 className="font-bold text-2xl">
            Ready to Transform Your Content Management Journey?

          </h4>
          <p className="text-sm text-gray-500">
            Join Thousands of Satisfied GeeksCMS Users Today!
          </p>
          <div className="flex items-center">
            <input className="bg-zinc-800 focus:outline-none rounded-sm px-2 text-sm p-2" placeholder="Enter Your Email"></input>
            <Button variant="outline" className="ml-2" >Submit</ Button>
          </div>
        </div>
      </section>
    </main>
  );
}
