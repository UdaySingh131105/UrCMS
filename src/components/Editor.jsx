"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { z, ZodError } from 'zod'

const schema = z.object({
    title: z.string().min(1, { message: "Title must not be empty" }).min(10, { message: "Title must contain at least 10 characters" }),
    excerpt: z.string().min(10, { message: 'Please add some details in the excerpt' }),
    category: z.string().min(1, {message: 'please add a category'}),
    keywords: z.string().min(2, {message: "Please add keywords for SEO benefits"}),
    metaDescription: z.string().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED'])
})

export default function Editor({ onSave, initialData }) {
    const { register, handleSubmit, setValue } = useForm();
    const [content, setContent] = useState("")
    const [ogImage, setOgImage] = useState("");
    const router = useRouter()

    useEffect(() => {
        if (initialData) {
            setValue('title', initialData.title);
            setContent(initialData.content)
            setValue('excerpt', initialData.excerpt || '');
            setValue('category', initialData.catslug || '');
            setValue('keywords', initialData.keywords.join(', ') || '');
            setValue('metaDescription', initialData.desc || '');
            setValue('status', initialData.status || 'DRAFT');
            setOgImage(initialData.thumbnail);
        }
    }, [initialData])

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
        try {
            const generatedSlug = initialData ? initialData.slug : slugify(data.title);
            onSave({ ...data, slug: generatedSlug, ogImage, content })
            toast({
                title: "Success",
                variant: 'success',
                description: initialData ? "The Blog was updated successfully" : "Blog Post Created Successfully"
            })

            if (data.status === "PUBLISHED") router.push(`/blog/${generatedSlug}`)
        } catch (error) {
            console.error(error.message);
        }
    }
    return <section>
        <form className="space-y-4" onSubmit={handleSubmit(async (data) => {
            try {
                await schema.parseAsync(data)
                handleForm(data);
            } catch (error) {
                if (error instanceof ZodError) {
                    error.issues.forEach(err => {
                        toast({
                            title: 'Error',
                            description: err.message,
                            variant: 'destructive'
                        })
                    });
                }
            }
        })}>
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
            <ImageUpload returnImage={setOgImage} preLoadedImage={ogImage} />
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