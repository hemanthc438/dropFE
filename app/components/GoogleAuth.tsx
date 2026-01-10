"use client";

import { signIn } from '@/lib/auth-client';
import React from 'react'

const GoogleAuth = () => {
    const handleGoogleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };
    return (
        <button onClick={handleGoogleSignIn}>GoogleAuth</button>
    )
}

export default GoogleAuth   