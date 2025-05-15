/**
 * Funcții helper pentru diverse operații comune
 */

/**
 * Generează un ID unic
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Întârzie execuția unei funcții
 * @param ms Milisecunde de întârziere
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Grupează un array de obiecte după o proprietate
 * @param array Array-ul de obiecte
 * @param key Cheia după care se face gruparea
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
};

/**
 * Sortează un array de obiecte după o proprietate
 * @param array Array-ul de obiecte
 * @param key Cheia după care se face sortarea
 * @param direction Direcția sortării (asc sau desc)
 */
export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Filtrează un array de obiecte după o condiție
 * @param array Array-ul de obiecte
 * @param predicate Funcția de filtrare
 */
export const filterBy = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.filter(predicate);
};

/**
 * Paginează un array
 * @param array Array-ul de paginat
 * @param page Numărul paginii (începe de la 1)
 * @param pageSize Dimensiunea paginii
 */
export const paginate = <T>(array: T[], page: number, pageSize: number): T[] => {
  const startIndex = (page - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
};

/**
 * Verifică dacă două obiecte sunt egale
 * @param obj1 Primul obiect
 * @param obj2 Al doilea obiect
 */
export const areObjectsEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  // Acum știm că ambele sunt obiecte, le putem converti în siguranță
  const object1 = obj1 as Record<string, unknown>;
  const object2 = obj2 as Record<string, unknown>;

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
      if (!areObjectsEqual(object1[key], object2[key])) return false;
    } else if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

/**
 * Creează o copie profundă a unui obiect
 * @param obj Obiectul de copiat
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
};

/**
 * Elimină proprietățile undefined dintr-un obiect
 * @param obj Obiectul de curățat
 */
export const removeUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Transformă un obiect în parametri de query string
 * @param params Obiectul cu parametri
 */
export const toQueryString = (params: Record<string, unknown>): string => {
  const cleanParams = removeUndefined(params);
  const searchParams = new URLSearchParams();

  for (const key in cleanParams) {
    const value = cleanParams[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          searchParams.append(`${key}[]`, String(item));
        });
      } else if (typeof value === 'object') {
        searchParams.append(key, JSON.stringify(value));
      } else {
        searchParams.append(key, String(value));
      }
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Transformă un query string în obiect
 * @param queryString Query string-ul de transformat
 */
export const fromQueryString = (queryString: string): Record<string, unknown> => {
  const params: Record<string, unknown> = {};
  const searchParams = new URLSearchParams(
    queryString.startsWith('?') ? queryString.substring(1) : queryString,
  );

  searchParams.forEach((value, key) => {
    const keyWithoutBrackets = key.replace(/\[\]$/, '');

    if (key.endsWith('[]')) {
      if (!params[keyWithoutBrackets]) {
        params[keyWithoutBrackets] = [];
      }
      params[keyWithoutBrackets].push(value);
    } else {
      try {
        // Încercăm să parsăm ca JSON
        params[key] = JSON.parse(value);
      } catch {
        // Dacă nu e JSON, folosim valoarea ca string
        params[key] = value;
      }
    }
  });

  return params;
};

export default {
  generateId,
  delay,
  groupBy,
  sortBy,
  filterBy,
  paginate,
  areObjectsEqual,
  deepClone,
  removeUndefined,
  toQueryString,
  fromQueryString,
};
