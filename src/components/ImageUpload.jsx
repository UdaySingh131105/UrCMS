"use client"
import { useState } from "react"
// https://res.cloudinary.com/geekcms/image/upload/v1755449647/mxdwwqcowlw7kdtigoyx.jpg

export default function ImageUpload({ returnImage, preLoadedImage }) {
    const [imageUrl, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleImageAsFile = async (e) => {
        const image = e.target.files[0]
        if (!image) return

        console.log("Uploading:", image.name)
        await uploadToCloudinary(image)
    }

    const uploadToCloudinary = async (image) => {
        setLoading(true)

        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "geeks_preset") // 🔹 your preset name
        formData.append("folder", "blog_posts")

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // 🔹 use your cloud name
                {
                    method: "POST",
                    body: formData,
                }
            )

            const data = await res.json()
            if (data.secure_url) {
                setImageUrl(data.secure_url)
                if (returnImage) returnImage(data.secure_url) // pass back to parent (Editor)
                console.log("Uploaded successfully:", data.secure_url)
            } else {
                console.error("Upload error:", data)
            }
        } catch (e) {
            console.error("Cloudinary upload error:", e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="flex flex-col gap-4">
            <label className="bg-blue-900/10 p-2 border-dashed border-gray-700 rounded border-2 inline text-center cursor-pointer">
                {loading ? "Uploading..." : preLoadedImage ? "Update Cover Page" : "Upload Cover Page"}
                <input type="file" onChange={handleImageAsFile} hidden />
            </label>

            {imageUrl || preLoadedImage && (
                <img
                    src={imageUrl || preLoadedImage}
                    alt="Uploaded preview"
                    className="w-40 h-40 object-cover rounded"
                />
            )}
        </section>
    )
}
