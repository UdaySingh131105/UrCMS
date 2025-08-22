// app/api/og/route.ts
import { Icons } from "@/components/Icons";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "GeekCMS";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
                    color: "white",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    padding: "60px",
                }}
            >
                {/* Left side - Logo */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "25%",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            borderRadius: "20px",
                            padding: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icons.BlogCustomItem size={120} />
                    </div>
                </div>

                {/* Right side - Text */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingLeft: "50px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: 64,
                            fontWeight: "bold",
                            lineHeight: 1.2,
                            margin: 0,
                            textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                        }}
                    >
                        {title}
                    </h1>

                    <p
                        style={{
                            fontSize: 28,
                            marginTop: "20px",
                            opacity: 0.9,
                            fontWeight: "500",
                        }}
                    >
                        Powered by GeekCMS 🚀
                    </p>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
