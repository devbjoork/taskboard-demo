import { useEffect, useState } from 'react';

export function useLocalStorage(name: string) {
  const [item, setItem] = useState<string>('');

  const updateItem = (value: string) => {
    localStorage.setItem(name, value);
    setItem(value);
  };

  useEffect(() => {
    const itemValue = localStorage.getItem(name);
    if (itemValue) setItem(itemValue);
  }, [item, name]);

  return { item, updateItem };
}
