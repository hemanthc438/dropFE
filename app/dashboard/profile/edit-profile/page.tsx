'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { savePersonalProfile, saveOrganizationProfile } from '@/app/actions/profile-actions'
import { getUserDetails } from '@/utils/commonRoute'

interface PersonalAnswers {
    fullname: string;
    profileImage: string;
    designation: string;
    bio: string;
}

interface OrganizationAnswers {
    companyName: string;
    logo: string;
    industry: string;
    companySize: string;
    website: string;
    role: string;
}

export default function EditProfile() {
    const router = useRouter();
    const { data: session } = useSession();
    const [accountType, setAccountType] = useState<'PERSONAL' | 'ORGANIZATION' | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [personalAnswers, setPersonalAnswers] = useState<PersonalAnswers>({
        fullname: '',
        profileImage: '',
        designation: '',
        bio: '',
    });

    const [organizationAnswers, setOrganizationAnswers] = useState<OrganizationAnswers>({
        companyName: '',
        logo: '',
        industry: '',
        companySize: '',
        website: '',
        role: '',
    });

    // Load existing profile data
    useEffect(() => {
        const loadProfile = async () => {
            if (!session?.user?.id) return;

            const userData = await getUserDetails(session.user.id);

            if (userData?.accountType === 'PERSONAL' && userData.personalProfile) {
                setAccountType('PERSONAL');
                setPersonalAnswers({
                    fullname: userData.personalProfile.fullName || '',
                    profileImage: userData.personalProfile.profileImage || '',
                    designation: userData.personalProfile.designation || '',
                    bio: userData.personalProfile.bio || '',
                });
            } else if (userData?.accountType === 'ORGANIZATION' && userData.organizationProfile) {
                setAccountType('ORGANIZATION');
                setOrganizationAnswers({
                    companyName: userData.organizationProfile.companyName || '',
                    logo: userData.organizationProfile.logo || '',
                    industry: userData.organizationProfile.industry || '',
                    companySize: userData.organizationProfile.companySize || '',
                    website: userData.organizationProfile.website || '',
                    role: userData.organizationProfile.role || '',
                });
            }

            setLoading(false);
        };

        loadProfile();
    }, [session]);

    const handlePersonalSubmit = async () => {
        if (!session?.user?.id) return;

        setIsSubmitting(true);
        try {
            const result = await savePersonalProfile(session.user.id, personalAnswers);

            if (result.success) {
                router.push('/dashboard/profile');
            } else {
                alert(result.error || 'Failed to update profile');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating your profile');
            setIsSubmitting(false);
        }
    };

    const handleOrganizationSubmit = async () => {
        if (!session?.user?.id) return;

        setIsSubmitting(true);
        try {
            const result = await saveOrganizationProfile(session.user.id, organizationAnswers);

            if (result.success) {
                router.push('/dashboard/profile');
            } else {
                alert(result.error || 'Failed to update profile');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating your profile');
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#6B3A6E] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!accountType) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-lg font-orbitron text-gray-400">No profile found. Please complete setup first.</p>
            </div>
        );
    }

    return (
        <div className='relative overflow-hidden bg-black text-white min-h-screen'>
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

            <div className='relative z-10 w-full max-w-4xl mx-auto px-6 py-12'>
                <div className="mb-8">
                    <h1 className="text-4xl font-black font-foldit text-white mb-2">
                        Edit Profile
                    </h1>
                    <p className="text-gray-400 font-orbitron font-light">Update your profile information</p>
                </div>

                {accountType === 'PERSONAL' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                value={personalAnswers.fullname}
                                onChange={(e) => setPersonalAnswers({ ...personalAnswers, fullname: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Profile Image URL
                            </label>
                            <input
                                type="text"
                                value={personalAnswers.profileImage}
                                onChange={(e) => setPersonalAnswers({ ...personalAnswers, profileImage: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Designation
                            </label>
                            <input
                                type="text"
                                value={personalAnswers.designation}
                                onChange={(e) => setPersonalAnswers({ ...personalAnswers, designation: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Bio
                            </label>
                            <textarea
                                value={personalAnswers.bio}
                                onChange={(e) => setPersonalAnswers({ ...personalAnswers, bio: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 resize-none min-h-[150px] text-white font-orbitron'
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => router.back()}
                                className='px-8 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 transition-all duration-200 font-orbitron border border-white/10'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePersonalSubmit}
                                disabled={!personalAnswers.fullname || isSubmitting}
                                className='px-8 py-3 rounded-xl font-semibold text-white
                                         bg-[#4E2A4F] hover:bg-[#6B3A6E]
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         transition-all duration-300 hover:scale-105 font-orbitron'
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}

                {accountType === 'ORGANIZATION' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                value={organizationAnswers.companyName}
                                onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, companyName: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Company Logo URL
                            </label>
                            <input
                                type="text"
                                value={organizationAnswers.logo}
                                onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, logo: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Industry
                            </label>
                            <input
                                type="text"
                                value={organizationAnswers.industry}
                                onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, industry: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Company Size
                            </label>
                            <input
                                type="text"
                                value={organizationAnswers.companySize}
                                onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, companySize: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Website
                            </label>
                            <input
                                type="text"
                                value={organizationAnswers.website}
                                onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, website: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">
                                Your Role
                            </label>
                            <input
                                type="text"
                                value={organizationAnswers.role}
                                onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, role: e.target.value })}
                                className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                         focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                         text-lg transition-all duration-200 text-white font-orbitron'
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => router.back()}
                                className='px-8 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 transition-all duration-200 font-orbitron border border-white/10'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOrganizationSubmit}
                                disabled={!organizationAnswers.companyName || isSubmitting}
                                className='px-8 py-3 rounded-xl font-semibold text-white
                                         bg-[#4E2A4F] hover:bg-[#6B3A6E]
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         transition-all duration-300 hover:scale-105 font-orbitron'
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
