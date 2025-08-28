import { useState, useEffect, useCallback, useRef } from "react";

export function useTimer() {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const startTimeRef = useRef<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(() => {
        if (!isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;

            intervalRef.current = setInterval(() => {
                if (!startTimeRef.current) return;

                setElapsedTime(Date.now() - startTimeRef.current);
            }, 100);

            setIsRunning(true);
        }
    }, [isRunning, elapsedTime]);

    const stop = useCallback(() => {
        if (!isRunning) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setIsRunning(false);
    }, [isRunning]);

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
