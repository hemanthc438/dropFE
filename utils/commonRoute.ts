"use server";

import prisma from "@/lib/prisma";

export async function getUserDetails(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            personalProfile: true,
            organizationProfile: true,
        },
    });
    return user;
}