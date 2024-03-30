import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    // Parse stored value if it exists, otherwise, use initialState.
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    // Stringify and save the value to localStorage whenever it changes.
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
