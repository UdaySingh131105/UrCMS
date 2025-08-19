import { prisma } from "@/lib/prisma";

const ADMIN_EMAILS = ["admin@example.com", "udaysingh131105@gmail.com"]; // predefined admin emails

/**
 * Checks if the current session user is an admin.
 * @returns {boolean} true if admin, false otherwise
 */
export async function isAdmin(session) {
    if (!session || !session.user?.email) return false;

    // 1. Check predefined emails
    if (ADMIN_EMAILS.includes(session.user.email)) {
        return true;
    }

    // 2. Check role from DB
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true },
    });

    return user?.role === "ADMIN";
}
