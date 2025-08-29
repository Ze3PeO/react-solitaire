import { useState, useEffect } from "react";
import { LocalStorageKey } from "@/lib/constants";

function getStorageValue<T>(
    key: (typeof LocalStorageKey)[keyof typeof LocalStorageKey],
    defaultValue: T,
): T {
    const item = localStorage.getItem(key);

    if (item === null) return defaultValue;

    try {
        const parsedItem = JSON.parse(item);

        return parsedItem;
    } catch {
        return item as T;
    }
}

export const useLocalStorage = <T>(
    key: (typeof LocalStorageKey)[keyof typeof LocalStorageKey],
    defaultValue: T,
) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
