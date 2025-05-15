/**
 * Validatori pentru formulare și date de intrare
 */

/**
 * Verifică dacă o valoare este definită (nu este undefined sau null)
 */
export const isDefined = (value: unknown): boolean => value !== undefined && value !== null;

/**
 * Verifică dacă o valoare este goală (string gol, array gol, obiect gol)
 */
export const isEmpty = (value: unknown): boolean => {
  if (!isDefined(value)) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object' && value !== null) return Object.keys(value).length === 0;
  return false;
};

/**
 * Verifică dacă o valoare este un email valid
 */
export const isEmail = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};

/**
 * Verifică dacă o valoare este un număr de telefon valid
 */
export const isPhoneNumber = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;
  const phoneRegex = /^(\+4|0)[0-9]{9}$/;
  return phoneRegex.test(value);
};

/**
 * Verifică dacă o valoare este un CNP valid
 */
export const isCNP = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;
  if (value.length !== 13 || !/^\d+$/.test(value)) return false;

  const cnpControl = '279146358279';
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(value[i]) * parseInt(cnpControl[i]);
  }

  const remainder = sum % 11;
  const controlDigit = remainder === 10 ? 1 : remainder;

  return controlDigit === parseInt(value[12]);
};

/**
 * Verifică dacă o valoare este un CUI valid
 */
export const isCUI = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;

  // Eliminăm prefixul RO dacă există
  const cui = value.replace(/^RO/i, '');

  // Verificăm dacă CUI-ul conține doar cifre
  if (!/^\d+$/.test(cui)) return false;

  // CUI-ul trebuie să aibă între 2 și 10 cifre
  if (cui.length < 2 || cui.length > 10) return false;

  // Calculăm cifra de control
  const controlKey = '753217532';
  let sum = 0;

  for (let i = 0; i < cui.length - 1; i++) {
    sum += parseInt(cui[i]) * parseInt(controlKey[controlKey.length - cui.length + i + 1]);
  }

  let controlDigit = (sum * 10) % 11;
  if (controlDigit === 10) controlDigit = 0;

  return controlDigit === parseInt(cui[cui.length - 1]);
};

/**
 * Verifică dacă o valoare este un cod poștal valid
 */
export const isPostalCode = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;
  return /^\d{6}$/.test(value);
};

/**
 * Verifică dacă o valoare este o dată validă
 */
export const isDate = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

/**
 * Verifică dacă o valoare este un număr valid
 */
export const isNumber = (value: unknown): boolean => {
  if (!isDefined(value)) return false;
  return !isNaN(parseFloat(value as string)) && isFinite(value as number);
};

/**
 * Verifică dacă o valoare este un număr întreg valid
 */
export const isInteger = (value: unknown): boolean => {
  if (!isNumber(value)) return false;
  return Number.isInteger(parseFloat(value as string));
};

/**
 * Verifică dacă o valoare este un număr pozitiv
 */
export const isPositiveNumber = (value: unknown): boolean => {
  if (!isNumber(value)) return false;
  return parseFloat(value as string) > 0;
};

/**
 * Verifică dacă o valoare este un număr între min și max
 */
export const isInRange = (value: unknown, min: number, max: number): boolean => {
  if (!isNumber(value)) return false;
  const num = parseFloat(value as string);
  return num >= min && num <= max;
};

/**
 * Verifică dacă o valoare are lungimea între min și max
 */
export const hasLengthBetween = (value: string, min: number, max: number): boolean => {
  if (!isDefined(value) || typeof value !== 'string') return false;
  return value.length >= min && value.length <= max;
};

/**
 * Verifică dacă o valoare conține doar litere
 */
export const containsOnlyLetters = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;
  return /^[a-zA-ZăĂâÂîÎșȘțȚ\s]+$/.test(value);
};

/**
 * Verifică dacă o valoare conține doar litere și cifre
 */
export const containsOnlyAlphanumeric = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;
  return /^[a-zA-Z0-9ăĂâÂîÎșȘțȚ\s]+$/.test(value);
};

/**
 * Verifică dacă o parolă este suficient de puternică
 * - Minim 8 caractere
 * - Cel puțin o literă mare
 * - Cel puțin o literă mică
 * - Cel puțin o cifră
 * - Cel puțin un caracter special
 */
export const isStrongPassword = (value: string): boolean => {
  if (!isDefined(value) || isEmpty(value)) return false;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

export default {
  isDefined,
  isEmpty,
  isEmail,
  isPhoneNumber,
  isCNP,
  isCUI,
  isPostalCode,
  isDate,
  isNumber,
  isInteger,
  isPositiveNumber,
  isInRange,
  hasLengthBetween,
  containsOnlyLetters,
  containsOnlyAlphanumeric,
  isStrongPassword,
};
