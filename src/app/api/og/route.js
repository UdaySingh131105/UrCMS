// app/api/og/route.ts
import { Icons } from "@/components/Icons";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const font = fetch(new URL("./lato.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer()
);

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const title = (searchParams.get("title").charAt(0).toUpperCase() + searchParams.get("title").slice(1)) || "UrCMS";

        return new ImageResponse(
            (
                <div
                    tw="flex flex-col bg-black text-white px-20 py-[70px] w-full h-full justify-between"
                >
                    <Icons.Feather size={40} />
                    <h1
                        tw="text-[80px] font-bold"
                        style={{
                            textShadow: "0px 2px 2px #000",
                            color: "#fff",
                        }}
                    >
                        {title}
                    </h1>

                    <h2 tw="text-xl text-center">Powered by UrCMS</h2>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: "Lato",
                        data: await font,
                        style: "italic",
                        weight: 400,
                    },
                ],
            }
        );

    } catch (error) {
        console.error(error.message);
        return NextResponse.json(
            { message: "Failed To generate OG Image" },
            { status: 500 }
        );
    }
}
