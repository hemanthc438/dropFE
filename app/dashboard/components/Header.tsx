'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const Header = ({ user }: { user: any }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = {
        home: '/dashboard',
        templates: '/dashboard/templates',
        profile: '/dashboard/profile',
    }

    return (
        <div className='flex flex-col md:flex-row justify-between items-center p-4 md:p-6 border-b border-white/10 bg-black/50 backdrop-blur-sm'>
            <div className='flex justify-between items-center w-full md:w-auto'>
                {/* User Info - Mobile */}
                <div className='flex md:hidden items-center gap-3'>
                    {user.image && (
                        <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="h-8 w-8 rounded-full border-2 border-white/20"
                        />
                    )}
                    <p className='font-orbitron font-medium text-white text-sm truncate'>{user.name}</p>
                </div>

                {/* Hamburger Menu */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className='md:hidden text-white p-2'
                >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        {mobileMenuOpen ? (
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        ) : (
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex w-full gap-8 items-center'>
                <Image src="/dropfe-logo.svg" alt="DropFE Logo" width={50} height={50} className='w-10 h-10 object-contain' />
                <Link
                    href={links.home}
                    className='font-orbitron font-medium text-white hover:text-[#8B5A8E] transition-colors duration-200'
                >
                    Home
                </Link>
                <Link
                    href={links.templates}
                    className='font-orbitron font-medium text-white hover:text-[#8B5A8E] transition-colors duration-200'
                >
                    Templates
                </Link>
                <Link
                    href={links.profile}
                    className='font-orbitron font-medium text-white hover:text-[#8B5A8E] transition-colors duration-200'
                >
                    Profile
                </Link>
            </div>

            {/* Desktop User Info */}
            <div className='hidden md:flex items-center gap-3'>
                {user.image && (
                    <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-10 w-10 rounded-full border-2 border-white/20"
                    />
                )}
                <p className='font-orbitron font-medium text-white'>{user.name}</p>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className='md:hidden w-full pt-4 flex flex-col gap-4 border-t border-white/10 mt-4'>
                    <Link
                        href={links.home}
                        className='font-orbitron font-medium text-white hover:text-[#8B5A8E] transition-colors duration-200 py-2'
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href={links.templates}
                        className='font-orbitron font-medium text-white hover:text-[#8B5A8E] transition-colors duration-200 py-2'
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Templates
                    </Link>
                    <Link
                        href={links.profile}
                        className='font-orbitron font-medium text-white hover:text-[#8B5A8E] transition-colors duration-200 py-2'
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Profile
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Header