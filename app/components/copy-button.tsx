"use client";

import { useState } from "react";

interface CopyButtonProps {
    text: string;
    className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`group relative px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 ${className}`}
            title="Copy to clipboard"
        >
            {copied ? (
                <div className="flex items-center gap-2 text-emerald-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">Copied!</span>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Copy</span>
                </div>
            )}
        </button>
    );
}
