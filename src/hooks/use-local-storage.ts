import { useState, useEffect } from "react";
import { LocalStorageKey } from "@/lib/constants";

function getStorageValue<T>(
    key: (typeof LocalStorageKey)[keyof typeof LocalStorageKey],
    defaultValue: T,
): T {
    const item = localStorage.getItem(key);

    if (item === null) return defaultValue;

    try {
        return JSON.parse(item) as T;
    } catch {
        return item as T;
    }
}

export const useLocalStorage = <T>(
    key: (typeof LocalStorageKey)[keyof typeof LocalStorageKey],
    defaultValue: T,
): [T, (value: T) => void] => {
    const [value, setValue] = useState(() =>
        getStorageValue(key, defaultValue),
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
