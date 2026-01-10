"use client";

import { useSession, signOut } from "@/lib/auth-client";

export default function DashboardPage() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
                <p>Loading...</p>
            </main>
        );
    }

    const { user } = session;

    return (
        <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome, {user.name || "User"}!</p>
            <p>Email: {user.email}</p>
            <button
                onClick={() => signOut()}
                className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
            >
                Sign Out
            </button>
        </main>
    );
}