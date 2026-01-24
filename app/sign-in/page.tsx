"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import GoogleAuth from "../components/GoogleAuth";
import Link from "next/link";

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        const res = await signIn.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });

        if (res.error) {
            setError(res.error.message || "Something went wrong.");
        } else {
            router.push("/dashboard");
        }
    }

    return (
        <main className="relative overflow-hidden bg-black text-white min-h-screen flex items-center justify-center">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

            <div className="relative z-10 w-full max-w-md mx-auto p-6">
                {/* Card */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <h1 className="text-4xl font-black mb-2 font-foldit text-white">Sign In</h1>
                    <p className="text-gray-400 mb-8 font-orbitron font-light">Welcome back to DropFE</p>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <p className="text-red-400 text-sm font-orbitron">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 font-orbitron text-gray-400">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/20 outline-none transition-all font-orbitron"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 font-orbitron text-gray-400">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/20 outline-none transition-all font-orbitron"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#4E2A4F] text-white font-bold rounded-xl px-4 py-3 hover:bg-[#6B3A6E] transition-all duration-300 hover:scale-105 font-orbitron"
                        >
                            Sign In
                        </button>
                    </form>

                    <GoogleAuth />

                    <p className="text-center text-gray-400 mt-6 font-orbitron font-light">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="text-[#8B5A8E] hover:text-purple-300 transition-colors font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}