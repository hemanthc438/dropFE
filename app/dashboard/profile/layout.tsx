"use client";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { getUserDetails } from "@/utils/commonRoute";
import { useRouter, usePathname } from "next/navigation";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;
    const getUser = async () => {
        if (!user?.id) return;
        const userData = await getUserDetails(user?.id);
        console.log(userData);
        if (!userData?.accountType) {
            router.push('/dashboard/profile/setup-profile');
        }
    }
    useEffect(() => {
        if (!user?.id) return;
        console.log(pathname);
        if (pathname === '/dashboard/profile/setup-profile') return;
        getUser();
    }, [user, pathname])
    return (
        <>
            {children}
        </>
    );
}