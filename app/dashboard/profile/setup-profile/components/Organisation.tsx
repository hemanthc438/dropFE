'use client'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { saveOrganizationProfile } from '@/app/actions/profile-actions'

interface Answers {
    companyName: string;
    logo: string;
    industry: string;
    companySize: string;
    website: string;
    role: string;
}

const Organisation = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [answers, setAnswers] = useState<Answers>({
        companyName: '',
        logo: '',
        industry: '',
        companySize: '',
        website: '',
        role: '',
    });

    const progressBarRef = useRef<HTMLDivElement>(null);
    const questionRef = useRef<HTMLDivElement>(null);

    const questions = [
        {
            key: 'companyName' as keyof Answers,
            question: "What's your company name?",
            placeholder: 'Enter your company name',
            type: 'text',
        },
        {
            key: 'logo' as keyof Answers,
            question: 'Add your company logo',
            placeholder: 'https://example.com/logo.png',
            type: 'text',
        },
        {
            key: 'industry' as keyof Answers,
            question: 'What industry are you in?',
            placeholder: 'e.g., Technology, Finance, Healthcare',
            type: 'text',
        },
        {
            key: 'companySize' as keyof Answers,
            question: 'How big is your team?',
            placeholder: 'e.g., 1-10, 11-50, 51-200, 200+',
            type: 'text',
        },
        {
            key: 'website' as keyof Answers,
            question: 'What\'s your company website?',
            placeholder: 'https://yourcompany.com',
            type: 'text',
        },
        {
            key: 'role' as keyof Answers,
            question: 'What\'s your role in the company?',
            placeholder: 'e.g., Founder, Manager, Developer',
            type: 'text',
        },
    ];

    const totalSteps = questions.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    // Animate progress bar
    useEffect(() => {
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                width: `${progress}%`,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }, [progress]);

    // Animate question transitions
    useEffect(() => {
        if (questionRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(questionRef.current,
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
            );
        }
    }, [currentStep]);

    const handleChange = (value: string) => {
        const currentQuestion = questions[currentStep];
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.key]: value
        }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        if (!session?.user?.id) {
            alert('Please sign in to continue');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await saveOrganizationProfile(session.user.id, answers);

            if (result.success) {
                router.push('/dashboard/profile');
            } else {
                alert(result.error || 'Failed to save profile');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('An error occurred while saving your profile');
            setIsSubmitting(false);
        }
    };

    const currentQuestion = questions[currentStep];
    const currentValue = answers[currentQuestion.key];
    const isLastStep = currentStep === totalSteps - 1;
    const canProceed = currentValue.trim() !== '';

    return (
        <div className='min-h-[80vh] w-full max-w-2xl mx-auto px-6 py-12 flex flex-col'>
            {/* Progress Bar */}
            <div className='mb-12'>
                <div className='flex justify-between items-center mb-3'>
                    <span className='text-sm font-medium text-gray-400 font-orbitron'>
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span className='text-sm font-medium text-gray-400 font-orbitron'>
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className='h-2 bg-white/10 rounded-full overflow-hidden'>
                    <div
                        ref={progressBarRef}
                        className='h-full bg-[#4E2A4F]'
                        style={{ width: '0%' }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className='flex-1 flex flex-col justify-center'>
                <div ref={questionRef} className='space-y-8'>
                    {/* Question */}
                    <div>
                        <h2 className='text-4xl md:text-5xl font-black mb-4 text-white font-foldit'>
                            {currentQuestion.question}
                        </h2>
                        <p className='text-gray-400 font-orbitron font-light'>
                            Help us understand your organization better
                        </p>
                    </div>

                    {/* Input Field */}
                    <input
                        type={currentQuestion.type}
                        value={currentValue}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        className='w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                                 focus:bg-white/10 focus:border-[#6B3A6E] focus:outline-none
                                 text-lg transition-all duration-200 text-white font-orbitron'
                        autoFocus
                    />
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className='flex items-center justify-between gap-4 mt-12'>
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className='px-6 py-3 rounded-xl font-medium transition-all duration-200
                             disabled:opacity-0 disabled:pointer-events-none
                             hover:bg-white/10 hover:scale-105 active:scale-95 font-orbitron text-white'
                >
                    ← Back
                </button>

                {/* Next/Submit Button */}
                <button
                    onClick={isLastStep ? handleSubmit : handleNext}
                    disabled={!canProceed || isSubmitting}
                    className='px-8 py-3 rounded-xl font-semibold text-white
                             bg-[#4E2A4F] hover:bg-[#6B3A6E]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300
                             hover:scale-105 active:scale-95 font-orbitron'
                >
                    {isSubmitting ? 'Saving...' : isLastStep ? 'Complete Setup' : 'Next →'}
                </button>
            </div>

            {/* Skip Option */}
            <div className='text-center mt-6'>
                <button
                    onClick={() => handleChange('')}
                    className='text-sm text-gray-500 hover:text-gray-400 transition-colors font-orbitron font-light'
                >
                    Skip this question
                </button>
            </div>
        </div>
    );
};

export default Organisation;