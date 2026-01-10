"use client";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./components/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/sign-in");
        }
    }, [isPending, session, router]);

    if (isPending)
        return <p className="text-center mt-8 text-white">Loading...</p>;
    if (!session?.user)
        return <p className="text-center mt-8 text-white">Redirecting...</p>;

    const { user } = session;
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            {children}
        </div>
    );
}
