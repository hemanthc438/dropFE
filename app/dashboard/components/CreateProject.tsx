"use client";

import { createProject } from "@/app/actions/project";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CreateProjectProps {
    open: boolean;
    onClose: () => void;
}

const CreateProject = ({ open, onClose }: CreateProjectProps) => {
    const router = useRouter();
    const [newApiKey, setNewApiKey] = useState("");
    const [projectId, setProjectId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Reset state when modal closes
    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setNewApiKey("");
                setProjectId("");
            }, 300); // Wait for animation to complete
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const result = await createProject(formData);

            if (result.success && result.apiKey && result.project) {
                setNewApiKey(result.apiKey);
                setProjectId(result.project.id);
            } else {
                alert(result.error || "Failed to create project");
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while creating the project");
            setIsLoading(false);
        }
    };

    const handleViewProject = () => {
        onClose();
        router.push(`/dashboard/projects/${projectId}`);
    };

    const handleClose = () => {
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg mx-4">
                <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    {newApiKey ? (
                        // Success State
                        <div className="p-8 space-y-6">
                            {/* Success Icon */}
                            <div className="flex justify-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Success Message */}
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-white">
                                    Project Created!
                                </h3>
                                <p className="text-gray-400">
                                    Your project has been created successfully. Here's your API key:
                                </p>
                            </div>

                            {/* API Key Display */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    API Key (Keep this secure!)
                                </label>
                                <div className="bg-black border border-emerald-500/20 rounded-lg p-4">
                                    <code className="text-emerald-400 font-mono text-sm break-all">
                                        {newApiKey}
                                    </code>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Save this key now. You can view it again in your project settings.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleViewProject}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                >
                                    View Project
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Form State
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200">
                                    Create New Project
                                </h2>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Project Name */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Project Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    placeholder="My Awesome App"
                                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Description (optional)
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={3}
                                    placeholder="What is this project for?"
                                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        "Create Project"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={isLoading}
                                    className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateProject;