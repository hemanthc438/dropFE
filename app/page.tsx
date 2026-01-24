"use client";

import { signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LandingHeader from "./components/LandingHeader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getLandingStats } from "./actions/landing-stats";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // State for landing stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmailsSent: 0,
  });

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  // Fetch landing stats
  useEffect(() => {
    const fetchStats = async () => {
      const data = await getLandingStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  useGSAP(() => {
    // Hero section animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(headingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
    })
      .from(subheadingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, "-=0.6")
      .from(ctaRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      }, "-=0.5");

    // Stats cards animation
    const statCards = document.querySelectorAll(".stat-card");
    if (statCards.length > 0) {
      gsap.from(statCards, {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Feature cards animation
    const featureCards = document.querySelectorAll(".feature-card");
    if (featureCards.length > 0) {
      gsap.from(featureCards, {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // CTA section animation
    const ctaSection = document.querySelector(".cta-section");
    if (ctaSection) {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Parallax background effect
    gsap.to(".bg-grid", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 150,
      opacity: 0.3,
    });

  }, []);

  if (isPending) {
    return (
      <main className="flex items-center justify-center h-screen bg-black text-white">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#6B3A6E] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <LandingHeader />
      <main className="relative overflow-hidden bg-black text-white">
        {/* Animated background grid with parallax */}
        <div className="bg-grid absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-10 pb-20">
          <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">

            {/* Main Heading */}
            <div ref={headingRef}>
              <h1 className="text-7xl md:text-9xl font-black font-foldit leading-tight text-white">
                Email Drops
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold font-foldit mt-4 text-white/90">
                Made Simple
              </h2>
            </div>

            {/* Subheading */}
            <p ref={subheadingRef} className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-orbitron font-light">
              Send beautiful emails at scale with our powerful API. Built for developers, designed for everyone.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => router.push("/sign-up")}
                className="px-10 py-5 bg-[#4E2A4F] text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:bg-[#6B3A6E] hover:scale-105 hover:shadow-2xl hover:shadow-[#6B3A6E]/50 w-full sm:w-auto font-orbitron">
                Get Started Free
              </button>

              <button
                onClick={() => router.push("/sign-in")}
                className="px-10 py-5 bg-white/5 border-2 border-white/20 text-white font-bold text-lg rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105 w-full sm:w-auto font-orbitron">
                Sign In
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-2">→</span>
              </button>
            </div>

            {/* Google Sign In */}
            <div className="pt-6">
              <div className="flex items-center gap-4 justify-center mb-6">
                <div className="h-px w-20 bg-white/30" />
                <span className="text-sm text-gray-500 font-orbitron">or continue with</span>
                <div className="h-px w-20 bg-white/30" />
              </div>
              <button
                onClick={async () => {
                  await signIn.social({
                    provider: "google",
                    callbackURL: "/dashboard",
                  });
                }}
                className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 mx-auto">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  width={24}
                  height={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium font-orbitron">Continue with Google</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section relative py-20 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "99.9%", label: "Uptime", text: "UP" },
              {
                number: stats.totalEmailsSent >= 1000000
                  ? `${(stats.totalEmailsSent / 1000000).toFixed(1)}M+`
                  : stats.totalEmailsSent >= 1000
                    ? `${(stats.totalEmailsSent / 1000).toFixed(1)}K+`
                    : stats.totalEmailsSent.toString(),
                label: "Emails Sent",
                text: "SENT"
              },
              {
                number: stats.totalUsers >= 1000
                  ? `${(stats.totalUsers / 1000).toFixed(1)}K+`
                  : stats.totalUsers.toString(),
                label: "Happy Users",
                text: "USERS"
              }
            ].map((stat, i) => (
              <div
                key={i}
                className="stat-card group relative p-8 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:scale-105">
                <div className="text-sm font-bold font-orbitron text-[#8B5A8E] mb-4">{stat.text}</div>
                <div className="text-5xl font-black font-foldit text-white">
                  {stat.number}
                </div>
                <div className="text-gray-400 mt-2 font-orbitron">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black font-foldit mb-4 text-white">
                Why Choose DropFE?
              </h2>
              <p className="text-xl text-gray-400 font-orbitron font-light">Everything you need to power your email infrastructure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Lightning Fast",
                  desc: "Blazing fast email delivery with optimized infrastructure",
                },
                {
                  title: "Secure by Default",
                  desc: "Enterprise-grade security and encryption built-in",
                },
                {
                  title: "Beautiful Templates",
                  desc: "Gorgeous, responsive email templates out of the box",
                },
                {
                  title: "Analytics",
                  desc: "Detailed insights and tracking for every email",
                },
                {
                  title: "API First",
                  desc: "Simple, powerful API that just works",
                },
                {
                  title: "Scalable",
                  desc: "From startup to enterprise, we scale with you",
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="feature-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-2xl overflow-hidden">
                  <div className="relative z-10">

                    <h3 className="text-2xl font-bold mb-3 font-audiowide text-white">{feature.title}</h3>
                    <p className="text-gray-400 font-orbitron font-light">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section relative py-32 px-4">
          <div className="cta-content max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-7xl font-black font-foldit text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 font-orbitron font-light">
              Join thousands of developers building amazing email experiences
            </p>
            <button
              onClick={() => router.push("/sign-up")}
              className="px-12 py-6 bg-[#4E2A4F] text-white font-bold text-xl rounded-2xl transition-all duration-300 hover:bg-[#6B3A6E] hover:scale-105 hover:shadow-2xl hover:shadow-[#6B3A6E]/50 font-orbitron">
              Start Building Free
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-8 px-4">
          <div className="max-w-6xl mx-auto text-center text-gray-500 font-orbitron">
            <p>© 2026 DropFE. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}