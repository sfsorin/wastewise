import { useState, useEffect } from 'react';

/**
 * Hook pentru a folosi localStorage cu React
 * @param key Cheia pentru localStorage
 * @param initialValue Valoarea inițială dacă nu există nimic în localStorage
 * @returns [storedValue, setValue] - Valoarea stocată și o funcție pentru a o actualiza
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // Funcție pentru a obține valoarea inițială
  const readValue = (): T => {
    // Verificăm dacă suntem în browser
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Încercăm să obținem valoarea din localStorage
      const item = window.localStorage.getItem(key);
      // Parsăm valoarea sau returnăm valoarea inițială
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Eroare la citirea din localStorage pentru cheia "${key}":`, error);
      return initialValue;
    }
  };

  // State pentru a stoca valoarea
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Funcție pentru a actualiza valoarea în state și localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitem ca value să fie o funcție pentru a fi compatibil cu useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Salvăm în state
      setStoredValue(valueToStore);

      // Salvăm în localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Asigurăm-ne că console.warn este apelat întotdeauna
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(`Eroare la scrierea în localStorage pentru cheia "${key}":`, error);
      }
    }
  };

  // Sincronizăm cu localStorage când cheia se schimbă
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
