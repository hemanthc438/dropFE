"use client";

import { signOut } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateProject from "./components/CreateProject";
import { useCursor } from "@/context/CursorProvider";

interface DashboardClientProps {
    user: {
        id: string;
        name: string | null;
        email: string;
    };
    stats: {
        totalProjects: number;
        totalApiCalls: number;
        successRate: number;
    };
}

export default function DashboardClient({ user, stats }: DashboardClientProps) {
    const router = useRouter();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { cursor, setCursor } = useCursor();

    const handleMouseEnter = () => {
        setCursor({ variant: 'hover' });
    };

    const handleMouseLeave = () => {
        setCursor({ variant: 'default' });
    };

    return (
        <>
            <CreateProject open={showCreateModal} onClose={() => setShowCreateModal(false)} />

            <main className="relative overflow-hidden text-white min-h-screen bg-black">
                {/* Animated background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                    {/* Header Section */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black mb-2 font-foldit text-white">
                                    Welcome back
                                </h1>
                                <p className="text-xl text-gray-400 font-orbitron font-light">
                                    {user.name || "User"} • {user.email}
                                </p>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="group px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 font-orbitron">
                                <span className="flex items-center gap-2">
                                    <span>Sign Out</span>
                                    <span className="transition-transform group-hover:translate-x-1">→</span>
                                </span>
                            </button>
                        </div>

                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm text-gray-300 font-orbitron">All systems operational</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { label: "Total Projects", value: stats.totalProjects.toString(), text: "PROJECTS" },
                            { label: "Emails Sent", value: stats.totalApiCalls.toString(), text: "SENT" },
                            { label: "Success Rate", value: `${stats.successRate}%`, text: "SUCCESS" }
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/20 hover:scale-105">
                                <div className="text-sm font-bold font-orbitron text-[#8B5A8E] mb-4">{stat.text}</div>
                                <div className="text-4xl font-black font-foldit text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 text-sm font-orbitron">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-black mb-6 font-foldit text-white">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <button
                                onClick={() => setShowCreateModal(true)}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 text-left">
                                <div className="w-10 h-10 bg-[#4E2A4F] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-white font-bold text-lg">+</span>
                                </div>
                                <h3 className="font-bold mb-1 font-audiowide text-white">New Project</h3>
                                <p className="text-sm text-gray-400 font-orbitron font-light">Create a new project</p>
                            </button>
                            <button
                                onClick={() => router.push("/dashboard/projects")}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 text-left">
                                <div className="w-10 h-10 bg-[#4E2A4F] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-white font-bold text-lg">→</span>
                                </div>
                                <h3 className="font-bold mb-1 font-audiowide text-white">View Projects</h3>
                                <p className="text-sm text-gray-400 font-orbitron font-light">See all your projects</p>
                            </button>
                            <button
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 text-left">
                                <div className="w-10 h-10 bg-[#4E2A4F] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-white font-bold text-lg">?</span>
                                </div>
                                <h3 className="font-bold mb-1 font-audiowide text-white">Documentation</h3>
                                <p className="text-sm text-gray-400 font-orbitron font-light">View the docs</p>
                            </button>
                            <button
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 text-left">
                                <div className="w-10 h-10 bg-[#4E2A4F] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-white font-bold text-lg">!</span>
                                </div>
                                <h3 className="font-bold mb-1 font-audiowide text-white">Support</h3>
                                <p className="text-sm text-gray-400 font-orbitron font-light">Get help</p>
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <h2 className="text-3xl font-black mb-6 font-foldit text-white">Recent Activity</h2>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                            <div className="w-16 h-16 bg-[#4E2A4F] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                <span className="text-white font-bold text-2xl">!</span>
                            </div>
                            <p className="text-gray-400 mb-2 font-orbitron">
                                {stats.totalProjects === 0
                                    ? "No activity yet"
                                    : `You have ${stats.totalProjects} project${stats.totalProjects !== 1 ? 's' : ''}`
                                }
                            </p>
                            <p className="text-sm text-gray-500 font-orbitron font-light">
                                {stats.totalProjects === 0
                                    ? "Start by creating your first project"
                                    : "View all projects to see details"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
