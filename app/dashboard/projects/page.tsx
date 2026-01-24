import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProjectsListPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const user = session.user;

    // Fetch all projects for the user
    const projects = await prisma.project.findMany({
        where: {
            userId: user.id,
        },
        include: {
            apiKeys: {
                where: {
                    revoked: false,
                },
            },
            emailLogs: {
                where: {
                    status: "SENT",
                },
            },
            _count: {
                select: {
                    emailLogs: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="relative overflow-hidden  text-white min-h-screen">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            {/* Navigation Breadcrumb */}
            <nav className="relative z-10 bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                            >
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <span className="text-gray-600">/</span>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200">
                                Projects
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-[#6B3A6E]/20">
                                {projects.length} Project{projects.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {projects.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-3">No Projects Yet</h2>
                        <p className="text-gray-400 mb-8 text-center max-w-md">
                            Get started by creating your first project. You'll receive an API key to start sending emails.
                        </p>
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        >
                            Create Your First Project
                        </Link>
                    </div>
                ) : (
                    // Projects Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/dashboard/projects/${project.id}`}
                                className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:scale-[1.02] hover:shadow-xl"
                            >
                                {/* Project Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-cyan-200 transition-all">
                                            {project.name}
                                        </h3>
                                        {project.description && (
                                            <p className="text-gray-400 text-sm line-clamp-2">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                    <svg className="w-5 h-5 text-gray-500 group-hover:text-[#8B5A8E] transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5">
                                    <div>
                                        <div className="text-2xl font-bold text-cyan-400">
                                            {project.apiKeys.length}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Active Key{project.apiKeys.length !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-[#8B5A8E]">
                                            {project.emailLogs.length}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Email{project.emailLogs.length !== 1 ? 's' : ''} Sent
                                        </div>
                                    </div>
                                </div>

                                {/* Created Date */}
                                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>
                                        Created {new Date(project.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
