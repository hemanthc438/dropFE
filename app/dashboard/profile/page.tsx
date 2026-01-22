"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/utils/commonRoute";
import Link from "next/link";

export default function Profile() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [profileData, setProfileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/sign-in");
        }
    }, [isPending, session, router]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (session?.user?.id) {
                const data = await getUserDetails(session.user.id);
                setProfileData(data);
                setLoading(false);
            }
        };
        fetchProfile();
    }, [session]);

    if (isPending || loading)
        return <p className="text-center mt-8">Loading...</p>;
    if (!session?.user)
        return <p className="text-center mt-8">Redirecting...</p>;

    const { user } = session;
    const isPersonal = profileData?.accountType === 'PERSONAL';
    const isOrganization = profileData?.accountType === 'ORGANIZATION';

    return (
        <main className="max-w-4xl min-h-screen flex items-center flex-col mx-auto p-6 space-y-6">
            {/* Profile Header */}
            <div className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Profile
                    </h1>
                    <Link
                        href="/dashboard/profile/edit-profile"
                        className="px-6 py-2 rounded-xl font-medium bg-foreground/10 hover:bg-foreground/20 transition-all duration-200"
                    >
                        Edit Profile
                    </Link>
                </div>

                {/* Profile Data */}
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-foreground/60">Email</p>
                        <p className="text-lg font-medium">{user.email}</p>
                    </div>

                    {isPersonal && profileData.personalProfile && (
                        <>
                            <div>
                                <p className="text-sm text-foreground/60">Full Name</p>
                                <p className="text-lg font-medium">{profileData.personalProfile.fullName}</p>
                            </div>
                            {profileData.personalProfile.designation && (
                                <div>
                                    <p className="text-sm text-foreground/60">Designation</p>
                                    <p className="text-lg font-medium">{profileData.personalProfile.designation}</p>
                                </div>
                            )}
                            {profileData.personalProfile.bio && (
                                <div>
                                    <p className="text-sm text-foreground/60">Bio</p>
                                    <p className="text-lg">{profileData.personalProfile.bio}</p>
                                </div>
                            )}
                            {profileData.personalProfile.profileImage && (
                                <div>
                                    <p className="text-sm text-foreground/60 mb-2">Profile Image</p>
                                    <img
                                        src={profileData.personalProfile.profileImage}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-foreground/20"
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {isOrganization && profileData.organizationProfile && (
                        <>
                            <div>
                                <p className="text-sm text-foreground/60">Company Name</p>
                                <p className="text-lg font-medium">{profileData.organizationProfile.companyName}</p>
                            </div>
                            {profileData.organizationProfile.role && (
                                <div>
                                    <p className="text-sm text-foreground/60">Role</p>
                                    <p className="text-lg font-medium">{profileData.organizationProfile.role}</p>
                                </div>
                            )}
                            {profileData.organizationProfile.industry && (
                                <div>
                                    <p className="text-sm text-foreground/60">Industry</p>
                                    <p className="text-lg">{profileData.organizationProfile.industry}</p>
                                </div>
                            )}
                            {profileData.organizationProfile.companySize && (
                                <div>
                                    <p className="text-sm text-foreground/60">Company Size</p>
                                    <p className="text-lg">{profileData.organizationProfile.companySize}</p>
                                </div>
                            )}
                            {profileData.organizationProfile.website && (
                                <div>
                                    <p className="text-sm text-foreground/60">Website</p>
                                    <a
                                        href={profileData.organizationProfile.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg text-blue-500 hover:text-blue-400"
                                    >
                                        {profileData.organizationProfile.website}
                                    </a>
                                </div>
                            )}
                            {profileData.organizationProfile.logo && (
                                <div>
                                    <p className="text-sm text-foreground/60 mb-2">Company Logo</p>
                                    <img
                                        src={profileData.organizationProfile.logo}
                                        alt="Company Logo"
                                        className="w-24 h-24 rounded-lg object-cover border-2 border-foreground/20"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Sign Out Button */}
            <button
                onClick={() => signOut()}
                className="w-full max-w-md bg-red-500/10 text-red-500 border border-red-500/30 font-medium rounded-xl px-6 py-3 hover:bg-red-500/20 transition-all duration-200"
            >
                Sign Out
            </button>
        </main>
    );
}