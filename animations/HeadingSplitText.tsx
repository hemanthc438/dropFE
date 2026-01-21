'use client'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(SplitText)

type HeadingSplitTextProps = {
    text: string,
    className?: string,
}
const HeadingSplitText = ({ text, className }: HeadingSplitTextProps) => {
    const textRef = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        const splitText = SplitText.create(textRef.current!, { type: "chars" })
        gsap.from(splitText.chars, {
            opacity: 0,
            y: "random(100,-100)",
            stagger: 0.05,
            ease: "power3.out",
            duration: 1,
        })
    }, {})
    return <div ref={textRef} className={className}>{text}</div>
}

export default HeadingSplitText