"use server";

import prisma from "@/lib/prisma";

export async function getLandingStats() {
    try {
        // Get total number of users
        const totalUsers = await prisma.user.count();

        // Get total number of emails sent (with status SENT)
        const totalEmailsSent = await prisma.emailLog.count({
            where: {
                status: "SENT",
            },
        });

        return {
            totalUsers,
            totalEmailsSent,
        };
    } catch (error) {
        console.error("Error fetching landing stats:", error);
        // Return fallback values
        return {
            totalUsers: 0,
            totalEmailsSent: 0,
        };
    }
}
