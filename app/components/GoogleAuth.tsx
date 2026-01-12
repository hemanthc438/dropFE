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
        <img onClick={handleGoogleSignIn} src="https://i.pinimg.com/474x/db/5a/82/db5a82352bae4af8495ac4a0416ee885.jpg" alt="Google" width={32} height={32} className='' />
        // <button onClick={handleGoogleSignIn}>GoogleAuth</button>
    )
}

export default GoogleAuth   