'use client';
import Link from 'next/link';
import React from 'react'

const Header = () => {
    const links = {
        home: '/dashboard',
        templates: '/dashboard/templates',
        profile: '/dashboard/profile',
    }
    return (
        <div className='flex justify-between items-center p-4'>
            <div className='flex items-center gap-4'>
                <Link href={links.home}>Home</Link>
                <Link href={links.templates}>Templates</Link>
                <Link href={links.profile}>Profile</Link>
            </div>
        </div>
    )
}

export default Header