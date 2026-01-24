import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import { SplitText } from 'gsap/all'

gsap.registerPlugin(SplitText)

const LandingHeader = () => {
    const titleRef = useRef<HTMLAnchorElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    // Check if mobile on mount
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useGSAP(() => {
        // Skip complex animations on mobile for better performance
        if (isMobile) {
            // Simple fade-in for mobile
            gsap.from("#title-text", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power2.out"
            })
            // gsap.from("#links", {
            //     opacity: 0,
            //     y: 20,
            //     duration: 0.8,
            //     delay: 0.5,
            //     ease: "power2.out"
            // })
            return
        }

        // Desktop animations
        const title = new SplitText("#title-text", {
            type: "chars, words",
        })
        const links = new SplitText("#links", {
            type: "chars, words",
        })
        const tl = gsap.timeline()

        tl.fromTo(title.chars, {
            opacity: 0,
            x: -200,
            duration: 1.5,
            delay: 0.5,
            ease: "power4.out",
            stagger: 0.1,
        }, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            delay: 0.5,
            ease: "power4.out",
            stagger: 0.1,
        })

        // Responsive font size animation
        const finalFontSize = window.innerWidth >= 1024 ? "35px" : "28px"
        tl.to(titleRef.current, {
            fontSize: finalFontSize,
            duration: 1.5,
            delay: 1,
            ease: "power4.out",
        }, 1.5)

        tl.to("#title", {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            duration: 2,
            delay: 1,
            ease: "power4.out",
        }, 1.5)

        tl.to("#header", {
            height: "80px",
            duration: 2,
            delay: 1,
            ease: "expo.out",
        }, 1.5)

        // tl.fromTo(links.words, {
        //     opacity: 0,
        //     y: -200,
        //     duration: 1.5,
        //     delay: 0.5,
        //     ease: "power4.out",
        //     stagger: 0.1,
        // }, {
        //     opacity: 1,
        //     y: 0,
        //     duration: 1.5,
        //     delay: 0.5,
        //     ease: "power4.out",
        //     stagger: 0.1,
        // }, 2.5)
    }, [isMobile])

    return (
        <div
            id="header"
            className='flex flex-col md:flex-row justify-center md:justify-between items-center p-4 md:p-6 h-screen bg-black sticky top-0 z-50 overflow-hidden'
        >
            <div
                id="title"
                className='w-full flex justify-center items-center mb-6 md:mb-0'
            >
                <Link
                    id="title-text"
                    href="/"
                    className='font-foldit font-bold md:text-[300px] text-[80px] w-full text-center leading-tight hover:text-[#8B5A8E] transition-colors'
                    ref={titleRef}
                >
                    DropFE
                </Link>
            </div>
            {/* <div
                id="links"
                className='flex items-center gap-6 md:gap-10 text-white font-orbitron font-regular text-base md:text-sm'
            >
                <Link
                    href="/sign-in"
                    className='hover:text-[#8B5A8E] transition-colors px-4 py-2 rounded-lg hover:bg-white/5'
                >
                    Sign In
                </Link>
                <Link
                    href="/sign-up"
                    className='hover:text-[#8B5A8E] transition-colors px-4 py-2 rounded-lg hover:bg-white/5'
                >
                    Sign Up
                </Link>
            </div> */}
        </div>
    )
}

export default LandingHeader