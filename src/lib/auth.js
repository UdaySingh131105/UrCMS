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
        },
        warn(code) {
            console.warn("NEXTAUTH WARN:", code)
        },
        debug(code, metadata) {
            console.debug("NEXTAUTH DEBUG:", code, metadata)
        },
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
            // if (account) {
            //     token.id = profile.id;
            //     token.name = profile.name || profile.login;
            //     token.email = profile.email || null;
            //     token.image = profile.avatar_url || null;
            //     token.username = profile.login || null;
            //     token.role = "USER";
            // }
            // if (token.email) {
            //     const dbUser = await prisma.user.findUnique({
            //         where: {
            //             email: token.email,
            //         },
            //         select: {
            //             id: true,
            //             name: true,
            //             email: true,
            //             image: true,
            //             username: true,
            //             role: true,
            //         }
            //     })
            //     if (dbUser) {
            //         token.id = dbUser.id;
            //         token.name = dbUser.name;
            //         token.email = dbUser.email;
            //         token.image = dbUser.image;
            //         token.username = dbUser.username;
            //         token.role = dbUser.role;
            //     } else {
            //         const newUser = await prisma.user.create({
            //             data: {
            //                 name: token.name,
            //                 email: token.email,
            //                 image: token.image,
            //                 username: token.username || token.email.split('@')[0],
            //                 role: token.role || 'USER',
            //             }
            //         })
            //         token.id = newUser.id;
            //         token.name = newUser.name;
            //         token.email = newUser.email;
            //         token.image = newUser.image;
            //         token.username = newUser.username;
            //         token.role = newUser.role;
            //     }
            //     return token;
            // }
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