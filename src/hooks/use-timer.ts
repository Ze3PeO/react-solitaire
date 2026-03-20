import { useState, useCallback } from "react";

export function useTimer(initialElapsedTime = 0) {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(initialElapsedTime);

    const start = useCallback(() => {
        if (startTime) return;

        setStartTime(Date.now() - elapsedTime);
    }, [elapsedTime, startTime]);

    const stop = useCallback(() => {
        if (!startTime) return;

        setElapsedTime(Date.now() - startTime);
        setStartTime(null);
    }, [startTime]);

    const restart = useCallback(() => {
        setStartTime(null);
        setElapsedTime(0);
    }, []);

    return { startTime, elapsedTime, start, stop, restart };
}
