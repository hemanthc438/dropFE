"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return {
            error: "Unauthorized"
        }
    }

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    if (!name || typeof name !== "string") {
        return { error: "Project name is required" };
    }
    try {
        const project = await prisma.project.create({
            data: {
                name,
                description,
                userId: session.user.id,
                apiKeys: {
                    create: {
                        key: `sk_${nanoid(32)}`,
                    },
                },
            },
            include: {
                apiKeys: true,
            },
        })
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/projects");
        return { success: true, project, apiKey: project.apiKeys[0].key };
    } catch (error) {
        console.error(error);
        return { error: "Failed to create project" };
    }
}