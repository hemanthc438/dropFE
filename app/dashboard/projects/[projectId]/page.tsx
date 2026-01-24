import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { CopyButton } from "@/app/components/copy-button";
import { ApiKeyDisplay } from "@/app/components/api-key-display";

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const { projectId } = await params;

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
            userId: session.user.id,
        },
        include: {
            apiKeys: true,
            emailLogs: {
                orderBy: { createdAt: "desc" },
                take: 10,
            },
        },
    });

    if (!project) {
        notFound();
    }

    // Get the most recent active key or undefined
    const activeKey = project.apiKeys.find((k) => !k.revoked);
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/v1/send`;

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
                                {project.name}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-[#6B3A6E]/20">
                                {project.apiKeys.filter(k => !k.revoked).length} Active Key{project.apiKeys.filter(k => !k.revoked).length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* API Integration Section */}
                <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        API Integration
                    </h2>
                    <p className="text-gray-400 mb-6 text-sm">
                        Use the following credentials to send emails from your application.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Endpoint URL</label>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 bg-gray-900 text-emerald-400 px-4 py-3 rounded-lg font-mono text-sm break-all border border-gray-800">
                                    {apiUrl}
                                </code>
                                <CopyButton text={apiUrl} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Your API Key</label>
                            {activeKey ? (
                                <ApiKeyDisplay apiKey={activeKey.key} />
                            ) : (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300 text-sm">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <span>No active keys found. Please generate a new one from your project settings.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Example Usage (cURL)</label>
                            <div className="relative group/code">
                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed border border-gray-800">
                                    {`curl -X POST ${apiUrl} \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${activeKey ? 'sk_...' : 'YOUR_API_KEY'}" \\
  -d '{
    "to": "user@example.com",
    "subject": "Hello from Dropfe",
    "text": "This is a test email sent via Dropfe API",
    "html": "<h1>This is a test email</h1><p>Sent via Dropfe API</p>"
  }'`}
                                </pre>
                                <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                    <CopyButton
                                        text={`curl -X POST ${apiUrl} \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${activeKey ? activeKey.key : 'YOUR_API_KEY'}" \\
  -d '{
    "to": "user@example.com",
    "subject": "Hello from Dropfe",
    "text": "This is a test email sent via Dropfe API",
    "html": "<h1>This is a test email</h1><p>Sent via Dropfe API</p>"
  }'`}
                                        className="bg-gray-800/90 border-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Log */}
                <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        Recent Activity
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 uppercase border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Recipient</th>
                                    <th className="px-6 py-3">Subject</th>
                                    <th className="px-6 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.emailLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 rounded-full bg-white/5">
                                                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 font-medium">No emails sent yet</p>
                                                    <p className="text-gray-500 text-xs mt-1">Start sending emails using your API key</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    project.emailLogs.map((log) => (
                                        <tr
                                            key={log.id}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${log.status === "SENT"
                                                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                                                    : "bg-red-500/10 text-red-300 border border-red-500/20"
                                                    }`}>
                                                    {log.status === "SENT" ? (
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    )}
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-white">
                                                {log.to}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 truncate max-w-xs">
                                                {log.subject}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {new Date(log.createdAt).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}
