'use client'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { savePersonalProfile } from '@/app/actions/profile-actions'

interface Answers {
    fullname: string;
    profileImage: string;
    designation: string;
    bio: string;
}

const Personal = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [answers, setAnswers] = useState<Answers>({
        fullname: '',
        profileImage: '',
        designation: '',
        bio: '',
    });

    const progressBarRef = useRef<HTMLDivElement>(null);
    const questionRef = useRef<HTMLDivElement>(null);

    const questions = [
        {
            key: 'fullname' as keyof Answers,
            question: "What's your full name?",
            placeholder: 'Enter your full name',
            type: 'text',
        },
        {
            key: 'profileImage' as keyof Answers,
            question: 'Add a profile picture URL',
            placeholder: 'https://example.com/image.jpg',
            type: 'text',
        },
        {
            key: 'designation' as keyof Answers,
            question: 'What do you do?',
            placeholder: 'e.g., Software Engineer, Designer, Student',
            type: 'text',
        },
        {
            key: 'bio' as keyof Answers,
            question: 'Tell us about yourself',
            placeholder: 'Share a bit about who you are...',
            type: 'textarea',
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
            const result = await savePersonalProfile(session.user.id, answers);

            if (result.success) {
                // Redirect to profile page after successful save
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
                    <span className='text-sm font-medium text-foreground/60'>
                        Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span className='text-sm font-medium text-foreground/60'>
                        {Math.round(progress)}%
                    </span>
                </div>
                <div className='h-2 bg-foreground/10 rounded-full overflow-hidden'>
                    <div
                        ref={progressBarRef}
                        className='h-full bg-gradient-to-r from-blue-500 to-purple-600'
                        style={{ width: '0%' }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className='flex-1 flex flex-col justify-center'>
                <div ref={questionRef} className='space-y-8'>
                    {/* Question */}
                    <div>
                        <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>
                            {currentQuestion.question}
                        </h2>
                        <p className='text-foreground/60'>
                            Answer honestly to personalize your experience
                        </p>
                    </div>

                    {/* Input Field */}
                    {currentQuestion.type === 'textarea' ? (
                        <textarea
                            value={currentValue}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder={currentQuestion.placeholder}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                         focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                         text-lg transition-all duration-200 resize-none min-h-[150px]'
                            autoFocus
                        />
                    ) : (
                        <input
                            type={currentQuestion.type}
                            value={currentValue}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder={currentQuestion.placeholder}
                            className='w-full px-6 py-4 bg-foreground/5 border-2 border-foreground/10 rounded-2xl
                                         focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                         text-lg transition-all duration-200'
                            autoFocus
                        />
                    )}
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
                             hover:bg-foreground/10 hover:scale-105 active:scale-95'
                >
                    ← Back
                </button>

                {/* Next/Submit Button */}
                <button
                    onClick={isLastStep ? handleSubmit : handleNext}
                    disabled={!canProceed || isSubmitting}
                    className='px-8 py-3 rounded-xl font-semibold text-white
                             bg-gradient-to-r from-blue-500 to-purple-600
                             hover:from-blue-600 hover:to-purple-700
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 shadow-lg shadow-blue-500/25
                             hover:scale-105 active:scale-95'
                >
                    {isSubmitting ? 'Saving...' : isLastStep ? 'Complete Setup' : 'Next →'}
                </button>
            </div>

            {/* Skip Option */}
            <div className='text-center mt-6'>
                <button
                    onClick={() => handleChange('')}
                    className='text-sm text-foreground/40 hover:text-foreground/60 transition-colors'
                >
                    Skip this question
                </button>
            </div>
        </div >
    );
};

export default Personal;