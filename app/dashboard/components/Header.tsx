'use client';
import Link from 'next/link';
import React from 'react'

const Header = ({ user }: { user: any }) => {
    const links = {
        home: '/dashboard',
        templates: '/dashboard/templates',
        profile: '/dashboard/profile',
    }
    console.log(user)
    return (
        <div className='flex justify-between items-center p-4'>
            <div className='flex items-center gap-4'>
                <Link href={links.home}>Home</Link>
                <Link href={links.templates}>Templates</Link>
                <Link href={links.profile}>Profile</Link>
            </div>
            <div className='flex items-center gap-2'>
                {user.image && (
                    <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-600"
                    />
                )}
                <p>{user.name}</p>
            </div>
        </div>
    )
}

export default Header