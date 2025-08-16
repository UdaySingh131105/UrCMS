const { PrismaClient } = require("../generated/prisma")

let prisma

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({
        log: ["query", "info", "warn", "error"],
    })
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ["query", "info", "warn", "error"],
        })
    }
    prisma = global.prisma
}

async function main() {
    const testUser = {
        name: "Uday",
        email: "uday134@gmail.com",
        image: null,
        role: "USER",
    }

    const newUser = await prisma.user.create({
        data: {
            name: testUser.name,
            email: testUser.email,
            image: null,
            username: testUser.email
                ? testUser.email.split("@")[0]
                : `user_${Date.now()}`,
            role: "USER",
        },
    })

    console.log("✅ New user created:", newUser)
}

main()
    .catch((e) => {
        console.error("❌ Error:", e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
