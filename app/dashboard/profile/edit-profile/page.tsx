'use client'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { savePersonalProfile, saveOrganizationProfile, getPersonalProfile, getOrganizationProfile } from '@/app/actions/profile-actions'
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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading profile...</p>
            </div>
        );
    }

    if (!accountType) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">No profile found. Please complete setup first.</p>
            </div>
        );
    }

    return (
        <div className='min-h-screen w-full max-w-4xl mx-auto px-6 py-12'>
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
                    Edit Profile
                </h1>
                <p className="text-foreground/60">Update your profile information</p>
            </div>

            {accountType === 'PERSONAL' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={personalAnswers.fullname}
                            onChange={(e) => setPersonalAnswers({ ...personalAnswers, fullname: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Profile Image URL
                        </label>
                        <input
                            type="text"
                            value={personalAnswers.profileImage}
                            onChange={(e) => setPersonalAnswers({ ...personalAnswers, profileImage: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Designation
                        </label>
                        <input
                            type="text"
                            value={personalAnswers.designation}
                            onChange={(e) => setPersonalAnswers({ ...personalAnswers, designation: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Bio
                        </label>
                        <textarea
                            value={personalAnswers.bio}
                            onChange={(e) => setPersonalAnswers({ ...personalAnswers, bio: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                     text-lg transition-all duration-200 resize-none min-h-[150px]'
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => router.back()}
                            className='px-8 py-3 rounded-xl font-medium bg-foreground/10 hover:bg-foreground/20 transition-all duration-200'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePersonalSubmit}
                            disabled={!personalAnswers.fullname || isSubmitting}
                            className='px-8 py-3 rounded-xl font-semibold text-white
                                     bg-gradient-to-r from-blue-500 to-purple-600
                                     hover:from-blue-600 hover:to-purple-700
                                     disabled:opacity-50 disabled:cursor-not-allowed
                                     transition-all duration-200 shadow-lg shadow-blue-500/25'
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}

            {accountType === 'ORGANIZATION' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            value={organizationAnswers.companyName}
                            onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, companyName: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Company Logo URL
                        </label>
                        <input
                            type="text"
                            value={organizationAnswers.logo}
                            onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, logo: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Industry
                        </label>
                        <input
                            type="text"
                            value={organizationAnswers.industry}
                            onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, industry: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Company Size
                        </label>
                        <input
                            type="text"
                            value={organizationAnswers.companySize}
                            onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, companySize: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Website
                        </label>
                        <input
                            type="text"
                            value={organizationAnswers.website}
                            onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, website: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Your Role
                        </label>
                        <input
                            type="text"
                            value={organizationAnswers.role}
                            onChange={(e) => setOrganizationAnswers({ ...organizationAnswers, role: e.target.value })}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                     focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20
                                     text-lg transition-all duration-200'
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => router.back()}
                            className='px-8 py-3 rounded-xl font-medium bg-foreground/10 hover:bg-foreground/20 transition-all duration-200'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleOrganizationSubmit}
                            disabled={!organizationAnswers.companyName || isSubmitting}
                            className='px-8 py-3 rounded-xl font-semibold text-white
                                     bg-gradient-to-r from-green-500 to-emerald-600
                                     hover:from-green-600 hover:to-emerald-700
                                     disabled:opacity-50 disabled:cursor-not-allowed
                                     transition-all duration-200 shadow-lg shadow-green-500/25'
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
