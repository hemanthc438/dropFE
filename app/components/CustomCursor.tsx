'use client'

import { useCursor } from "@/context/CursorProvider"
import gsap from "gsap"
import { useEffect, useRef } from "react"

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const { cursor } = useCursor()

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current!, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power1.out'
            })
        }
        window.addEventListener('mousemove', moveCursor)
        return () => {
            window.removeEventListener('mousemove', moveCursor)
        }
    }, [])

    // Animate cursor size based on variant
    useEffect(() => {
        if (!cursorRef.current) return

        const isHover = cursor.variant === 'hover'

        gsap.to(cursorRef.current, {
            scale: isHover ? 3 : 1, // 3x larger on hover
            duration: 0.3,
            ease: 'power2.out'
        })
    }, [cursor.variant])

    return (
        <div ref={cursorRef} className="fixed -top-2 -left-2 z-[9999]
                 w-4 h-4 rounded-full
                 bg-white/50 backdrop-blur-sm border border-black/50
                 pointer-events-none">

        </div>
    )
}

export default CustomCursor;