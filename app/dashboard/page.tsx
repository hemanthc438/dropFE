// "use client";

// import { useSession, signOut } from "@/lib/auth-client";

// export default function DashboardPage() {
//     const { data: session } = useSession();

//     if (!session) {
//         return (
//             <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
//                 <p>Loading...</p>
//             </main>
//         );
//     }

//     const { user } = session;

//     return (
//         <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
//             <h1 className="text-2xl font-bold">Dashboard</h1>
//             <p>Welcome, {user.name || "User"}!</p>
//             <p>Email: {user.email}</p>
//             <button
//                 onClick={() => signOut()}
//                 className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
//             >
//                 Sign Out
//             </button>
//         </main>
//     );
// }

"use client";

import { useSession, signOut } from "@/lib/auth-client";

export default function DashboardPage() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400">Loading your workspace...</p>
                </div>
            </main>
        );
    }

    const { user } = session;

    return (
        <main className="relative overflow-hidden bg-black text-white min-h-screen">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200">
                                    Welcome back
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400">
                                {user.name || "User"} • {user.email}
                            </p>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="group px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105">
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
                        <span className="text-sm text-gray-300">All systems operational</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "Total Projects", value: "0", icon: "📁", color: "from-purple-500 to-pink-500" },
                        { label: "API Calls", value: "0", icon: "⚡", color: "from-cyan-500 to-blue-500" },
                        { label: "Success Rate", value: "100%", icon: "✓", color: "from-emerald-500 to-green-500" }
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`text-3xl p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-10`}>
                                    {stat.icon}
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "New Project", desc: "Create a new project", icon: "➕" },
                            { title: "API Keys", desc: "Manage your keys", icon: "🔑" },
                            { title: "Documentation", desc: "View the docs", icon: "📚" },
                            { title: "Support", desc: "Get help", icon: "💬" }
                        ].map((action, i) => (
                            <button
                                key={i}
                                className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 text-left">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{action.icon}</div>
                                <h3 className="font-semibold mb-1">{action.title}</h3>
                                <p className="text-sm text-gray-400">{action.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                        <div className="text-4xl mb-4">🎉</div>
                        <p className="text-gray-400 mb-2">No activity yet</p>
                        <p className="text-sm text-gray-500">Start by creating your first project</p>
                    </div>
                </div>
            </div>
        </main>
    );
}