'use client'

import { useCursor } from "@/context/CursorProvider"
import gsap from "gsap"
import { useEffect, useRef } from "react"

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const cursor = useCursor()

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current!, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'bounce.out'
            })
        }
        window.addEventListener('mousemove', moveCursor)
        return () => {
            window.removeEventListener('mousemove', moveCursor)
        }
    }, [])
    return (
        <div ref={cursorRef} className="fixed -top-2 -left-2 z-[9999]
                 w-4 h-4 bg-black rounded-full
                 pointer-events-none">

        </div>
    )
}

export default CustomCursor;