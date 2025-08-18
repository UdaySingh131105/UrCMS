"use client"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

export default function Editor({onSave}) {
    const { register, handleSubmit } = useForm();
    const [content, setContent] = useState("")
    const [ogImage, setOgImage] = useState("");
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],         // Headers
            ["bold", "italic", "underline", "strike"], // Formatting
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            ["link", "image"],                      // Links & Images
            ["code-block"],                         // Code Block
            ["clean"],                              // Clear Formatting
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "image",
        "code-block",
    ];
    const handleForm = (data) => {
        // console.log('data', data);
        const generatedSlug = slugify(data.title);
        onSave({...data, slug: generatedSlug, ogImage, content})
    }
    return <section>
        <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
            <input {...register('title')} placeholder="Enter the Post Title" className="font-bold bg-zinc-700 px-3 py-2 rounded-sm w-full outline-none" type="text" />
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                theme="snow"
            />

            <input {...register('excerpt')} placeholder="Enter a excerpt" className="font-bold bg-zinc-700 px-3 py-2 rounded-sm w-full outline-none" type="text" />
            <input {...register('category')} placeholder="Enter a category" className="font-bold bg-zinc-700 px-3 py-2 rounded-sm w-full outline-none" type="text" />
            <h2 className="text-xl">SEO Data</h2>
            <ImageUpload returnImage={setOgImage} />
            <input {...register('keywords')} placeholder="Enter the keywords" className="font-bold bg-zinc-700 px-3 py-2 rounded-sm w-full outline-none" type="text" />
            <input {...register('metaDescription')} placeholder="Enter Meta description" className="font-bold bg-zinc-700 px-3 py-2 rounded-sm w-full outline-none" type="text" />
            <div className="flex items-center justify-start gap-2">
                <select
                    {...register('status')}
                    className="font-bold bg-zinc-700 px-2 py-1 rounded-sm outline-none"
                >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Publish</option>
                </select>
                <button className="bg-zinc-800 px-2 py-1 rounded cursor-pointer text-center">Save</button>
            </div>
        </form>
    </section>
}