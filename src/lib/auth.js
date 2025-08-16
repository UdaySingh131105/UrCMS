import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
    logger: {
        error(code, metadata) {
            console.error("NEXTAUTH ERROR:", code, metadata)
        }
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image;
                session.user.username = token.username;
                session.user.role = token.role;
            }
            return session
        },
        async jwt({ token, profile, account, user }) {
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: {
                        email: user.email,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        username: true,
                        role: true,
                    }
                })
                if (dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.email = dbUser.email;
                    token.image = dbUser.image;
                    token.username = dbUser.username;
                    token.role = dbUser.role;
                } else {
                    const newUser = await prisma.user.create({
                        data: {
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            username: `user_${Date.now()}`
                        }
                    })
                    token.id = newUser.id;
                }
            }
            return token;
        },
        redirect() {
            return "/dashboard";
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions);