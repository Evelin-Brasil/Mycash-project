// Animation constants and configurations
export const ANIMATION_DURATIONS = {
    fast: 200,
    normal: 300,
    slow: 400,
    verySlow: 800,
    progressBar: 1000,
} as const;

export const ANIMATION_EASINGS = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const STAGGER_DELAYS = {
    card: 50,
    categoryCard: 80,
    donut: 100,
} as const;

// Framer Motion variants
export const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: ANIMATION_DURATIONS.fast / 1000 } },
    exit: { opacity: 0, transition: { duration: ANIMATION_DURATIONS.fast / 1000 } },
};

export const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: ANIMATION_DURATIONS.normal / 1000,
            ease: ANIMATION_EASINGS.easeOut,
        }
    },
};

export const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: ANIMATION_DURATIONS.slow / 1000,
            ease: ANIMATION_EASINGS.easeOut,
        }
    },
};

export const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 250 / 1000,
            ease: ANIMATION_EASINGS.easeOut,
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: ANIMATION_DURATIONS.fast / 1000,
        }
    },
};

export const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 0.5,
        transition: { duration: ANIMATION_DURATIONS.fast / 1000 }
    },
    exit: {
        opacity: 0,
        transition: { duration: ANIMATION_DURATIONS.fast / 1000 }
    },
};

export const slideUpMobileVariants = {
    hidden: { y: '100%' },
    visible: {
        y: 0,
        transition: {
            duration: ANIMATION_DURATIONS.normal / 1000,
            ease: ANIMATION_EASINGS.easeOut,
        }
    },
    exit: {
        y: '100%',
        transition: {
            duration: ANIMATION_DURATIONS.normal / 1000,
            ease: ANIMATION_EASINGS.easeIn,
        }
    },
};

export const toastVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: ANIMATION_DURATIONS.normal / 1000,
            ease: ANIMATION_EASINGS.easeOut,
        }
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: {
            duration: 250 / 1000,
        }
    },
};

// Stagger container variants
export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: STAGGER_DELAYS.card / 1000,
        },
    },
};

export const staggerCategoryContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: STAGGER_DELAYS.categoryCard / 1000,
        },
    },
};

export const staggerDonutContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: STAGGER_DELAYS.donut / 1000,
        },
    },
};

// View transition variants
export const viewTransitionVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: ANIMATION_DURATIONS.fast / 1000,
            delay: 0.1, // Slight delay after previous view fades out
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: ANIMATION_DURATIONS.fast / 1000,
        }
    },
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation duration based on user preference
export const getAnimationDuration = (duration: number) => {
    return prefersReducedMotion() ? 0 : duration;
};
