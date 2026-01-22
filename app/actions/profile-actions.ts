"use server";

import prisma from "@/lib/prisma";
import { AccountType } from "@/app/generated/prisma/enums";

interface PersonalProfileData {
    fullname: string;
    profileImage: string;
    designation: string;
    bio: string;
}

interface OrganizationProfileData {
    companyName: string;
    logo: string;
    industry: string;
    companySize: string;
    website: string;
    role: string;
}

export async function savePersonalProfile(
    userId: string,
    data: PersonalProfileData
) {
    try {
        // First, update the user's accountType
        await prisma.user.update({
            where: { id: userId },
            data: { accountType: AccountType.PERSONAL },
        });

        // Then create or update the personal profile
        const profile = await prisma.personalProfile.upsert({
            where: { userId },
            update: {
                fullName: data.fullname,
                profileImage: data.profileImage || null,
                designation: data.designation || null,
                bio: data.bio || null,
            },
            create: {
                userId,
                fullName: data.fullname,
                profileImage: data.profileImage || null,
                designation: data.designation || null,
                bio: data.bio || null,
            },
        });

        return { success: true, profile };
    } catch (error) {
        console.error("Error saving personal profile:", error);
        return { success: false, error: "Failed to save profile" };
    }
}

export async function saveOrganizationProfile(
    userId: string,
    data: OrganizationProfileData
) {
    try {
        // First, update the user's accountType
        await prisma.user.update({
            where: { id: userId },
            data: { accountType: AccountType.ORGANIZATION },
        });

        // Then create or update the organization profile
        const profile = await prisma.organizationProfile.upsert({
            where: { userId },
            update: {
                companyName: data.companyName,
                logo: data.logo || null,
                industry: data.industry || null,
                companySize: data.companySize || null,
                website: data.website || null,
                role: data.role || null,
            },
            create: {
                userId,
                companyName: data.companyName,
                logo: data.logo || null,
                industry: data.industry || null,
                companySize: data.companySize || null,
                website: data.website || null,
                role: data.role || null,
            },
        });

        return { success: true, profile };
    } catch (error) {
        console.error("Error saving organization profile:", error);
        return { success: false, error: "Failed to save profile" };
    }
}

export async function getPersonalProfile(userId: string) {
    try {
        const profile = await prisma.personalProfile.findUnique({
            where: { userId },
        });
        return profile;
    } catch (error) {
        console.error("Error fetching personal profile:", error);
        return null;
    }
}

export async function getOrganizationProfile(userId: string) {
    try {
        const profile = await prisma.organizationProfile.findUnique({
            where: { userId },
        });
        return profile;
    } catch (error) {
        console.error("Error fetching organization profile:", error);
        return null;
    }
}
