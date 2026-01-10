"use client";

import { signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GoogleAuth from "./components/GoogleAuth";
import Image from "next/image";
import ParallaxAnimation from "./components/Parallax";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <main className="flex items-center justify-center h-screen bg-neutral-950 text-white">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="relative bg-neutral-950 text-white h-[200vh]">

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/sign-up")}
          className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200">
          Sign Up
        </button>
        <button
          onClick={() => router.push("/sign-in")}
          className="border border-white text-white font-medium px-6 py-2 rounded-md hover:bg-neutral-800">
          Sign In
        </button>
        <GoogleAuth />
      </div>
    </main>
  );
}