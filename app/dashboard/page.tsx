

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const user = session.user;

    // Fetch user's projects and stats
    const projects = await prisma.project.findMany({
        where: {
            userId: user.id,
        },
        include: {
            apiKeys: true,
            emailLogs: {
                where: {
                    status: "SENT",
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Calculate stats
    const totalProjects = projects.length;
    const totalApiCalls = projects.reduce((sum, p) => sum + p.emailLogs.length, 0);
    const totalEmails = totalApiCalls;
    const successRate = totalApiCalls > 0 ? 100 : 100; // Can be refined with failed emails count

    return (
        <DashboardClient
            user={user}
            stats={{
                totalProjects,
                totalApiCalls,
                successRate,
            }}
        />
    );
}