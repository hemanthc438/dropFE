"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxAnimation() {
    useEffect(() => {
        gsap.to(".layer-1", { y: 40, scrub: true });
        gsap.to(".layer-2", { y: 80, scrub: true });
        gsap.to(".layer-3", { y: 140, scrub: true });
        gsap.to(".layer-4", { y: 220, scrub: true });
    }, []); // 👈 runs once

    return null; // no UI, only logic
}
