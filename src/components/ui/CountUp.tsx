import React, { useEffect, useState } from 'react';

interface CountUpProps {
    value: number;
    duration?: number;
    formatter?: (val: number) => string;
    className?: string;
}

export function CountUp({ value, duration = 800, formatter, className }: CountUpProps) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const startValue = displayValue;
        const endValue = value;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = progress * (endValue - startValue) + startValue;

            setDisplayValue(current);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setDisplayValue(endValue);
            }
        };

        window.requestAnimationFrame(step);
    }, [value, duration]);

    return (
        <span className={className}>
            {formatter ? formatter(displayValue) : Math.floor(displayValue)}
        </span>
    );
}
