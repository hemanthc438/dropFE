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
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#6B3A6E] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    if (!session?.user)
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-gray-400 font-orbitron">Redirecting...</p>
            </div>
        );

    const { user } = session;
    const isPersonal = profileData?.accountType === 'PERSONAL';
    const isOrganization = profileData?.accountType === 'ORGANIZATION';

    return (
        <main className="relative overflow-hidden bg-black text-white min-h-screen">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-6">
                {/* Profile Header */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-black font-foldit text-white">
                            Profile
                        </h1>
                        <Link
                            href="/dashboard/profile/edit-profile"
                            className="px-6 py-3 rounded-xl font-medium bg-[#4E2A4F] hover:bg-[#6B3A6E] transition-all duration-300 hover:scale-105 font-orbitron text-white"
                        >
                            Edit Profile
                        </Link>
                    </div>

                    {/* Profile Data */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-400 mb-1 font-orbitron">Email</p>
                            <p className="text-lg font-medium font-orbitron text-white">{user.email}</p>
                        </div>

                        {isPersonal && profileData.personalProfile && (
                            <>
                                {profileData.personalProfile.profileImage && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2 font-orbitron">Profile Image</p>
                                        <img
                                            src={profileData.personalProfile.profileImage}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-gray-400 mb-1 font-orbitron">Full Name</p>
                                    <p className="text-lg font-medium font-orbitron text-white">{profileData.personalProfile.fullName}</p>
                                </div>
                                {profileData.personalProfile.designation && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1 font-orbitron">Designation</p>
                                        <p className="text-lg font-medium font-orbitron text-white">{profileData.personalProfile.designation}</p>
                                    </div>
                                )}
                                {profileData.personalProfile.bio && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1 font-orbitron">Bio</p>
                                        <p className="text-lg font-orbitron text-white">{profileData.personalProfile.bio}</p>
                                    </div>
                                )}
                            </>
                        )}

                        {isOrganization && profileData.organizationProfile && (
                            <>
                                {profileData.organizationProfile.logo && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2 font-orbitron">Company Logo</p>
                                        <img
                                            src={profileData.organizationProfile.logo}
                                            alt="Company Logo"
                                            className="w-24 h-24 rounded-lg object-cover border-2 border-white/20"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-gray-400 mb-1 font-orbitron">Company Name</p>
                                    <p className="text-lg font-medium font-orbitron text-white">{profileData.organizationProfile.companyName}</p>
                                </div>
                                {profileData.organizationProfile.role && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1 font-orbitron">Role</p>
                                        <p className="text-lg font-medium font-orbitron text-white">{profileData.organizationProfile.role}</p>
                                    </div>
                                )}
                                {profileData.organizationProfile.industry && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1 font-orbitron">Industry</p>
                                        <p className="text-lg font-orbitron text-white">{profileData.organizationProfile.industry}</p>
                                    </div>
                                )}
                                {profileData.organizationProfile.companySize && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1 font-orbitron">Company Size</p>
                                        <p className="text-lg font-orbitron text-white">{profileData.organizationProfile.companySize}</p>
                                    </div>
                                )}
                                {profileData.organizationProfile.website && (
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1 font-orbitron">Website</p>
                                        <a
                                            href={profileData.organizationProfile.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg text-[#8B5A8E] hover:text-purple-300 transition-colors font-orbitron"
                                        >
                                            {profileData.organizationProfile.website}
                                        </a>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Sign Out Button */}
                <button
                    onClick={() => signOut()}
                    className="w-full max-w-md mx-auto block bg-red-500/10 text-red-400 border border-red-500/30 font-medium rounded-xl px-6 py-3 hover:bg-red-500/20 transition-all duration-300 font-orbitron"
                >
                    Sign Out
                </button>
            </div>
        </main>
    );
}