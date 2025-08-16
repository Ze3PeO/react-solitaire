import { useState, useEffect } from "react";
import { LocalStorageKey } from "@/lib/constants";

function getStorageValue<T>(
  key: (typeof LocalStorageKey)[keyof typeof LocalStorageKey],
  defaultValue: T
) {
  const item = localStorage.getItem(key);
  const parsedItem = item ? JSON.parse(item) : null;
  return parsedItem || defaultValue;
}

export const useLocalStorage = <T>(
  key: (typeof LocalStorageKey)[keyof typeof LocalStorageKey],
  defaultValue: T
) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
