import { useState, useEffect, useCallback, useRef } from "react";

export function useTimer(initialElapsedTime = 0) {
    const [elapsedTime, setElapsedTime] = useState<number>(initialElapsedTime);
    const isRunningRef = useRef<boolean>(false);
    const startTimeRef = useRef<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const delayRef = useRef<number>(1000);

    const start = useCallback(() => {
        if (!isRunningRef.current) {
            startTimeRef.current = Date.now() - elapsedTime;

            intervalRef.current = setInterval(() => {
                if (!startTimeRef.current) return;

                setElapsedTime(Date.now() - startTimeRef.current);
            }, delayRef.current);

            isRunningRef.current = true;
        }
    }, [elapsedTime]);

    const stop = useCallback(() => {
        if (!isRunningRef.current) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        isRunningRef.current = false;
    }, []);

    const restart = useCallback(() => {
        stop();
        setElapsedTime(0);
        startTimeRef.current = null;
    }, [stop]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return {
        elapsedTime,
        start,
        stop,
        restart,
    };
}
