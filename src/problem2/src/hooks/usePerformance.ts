import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
    renderTime: number;
    mountTime: number;
    updateCount: number;
}

export const usePerformance = (componentName: string) => {
    const mountTime = useRef<number>(Date.now());
    const updateCount = useRef<number>(0);
    const renderStartTime = useRef<number>(Date.now());

    useEffect(() => {
        const renderTime = Date.now() - renderStartTime.current;
        updateCount.current += 1;

        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Performance] ${componentName}:`, {
                renderTime: `${renderTime}ms`,
                updateCount: updateCount.current,
                totalTime: `${Date.now() - mountTime.current}ms`,
            });
        }

        // Reset render start time for next render
        renderStartTime.current = Date.now();
    });

    return {
        renderTime: Date.now() - renderStartTime.current,
        mountTime: Date.now() - mountTime.current,
        updateCount: updateCount.current,
    };
}; 