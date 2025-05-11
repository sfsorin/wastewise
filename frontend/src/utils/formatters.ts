/**
 * Formatează o sumă de bani în format românesc
 * @param amount Suma de formatat
 * @param currency Moneda (implicit RON)
 * @returns String formatat (ex: "1.234,56 RON")
 */
export const formatCurrency = (amount: number, currency = 'RON'): string => {
  return new Intl.NumberFormat('ro-RO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + ` ${currency}`;
};

/**
 * Formatează o dată în format românesc
 * @param date Data de formatat
 * @param includeTime Dacă să includă și ora
 * @returns String formatat (ex: "01.01.2023" sau "01.01.2023, 12:30")
 */
export const formatDate = (date: Date | string, includeTime = false): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return new Intl.DateTimeFormat('ro-RO', options).format(dateObj);
};

/**
 * Formatează un număr de telefon românesc
 * @param phone Numărul de telefon
 * @returns String formatat (ex: "0722 123 456")
 */
export const formatPhoneNumber = (phone: string): string => {
  // Eliminăm toate caracterele non-numerice
  const cleaned = phone.replace(/\D/g, '');
  
  // Verificăm dacă numărul are lungimea corectă
  if (cleaned.length !== 10) {
    return phone; // Returnăm numărul original dacă nu are 10 cifre
  }
  
  // Formatăm numărul: 0722 123 456
  return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
};

/**
 * Truncheză un text la o lungime maximă
 * @param text Textul de truncheat
 * @param maxLength Lungimea maximă
 * @param suffix Sufixul de adăugat (implicit "...")
 * @returns Textul truncheat
 */
export const truncateText = (text: string, maxLength: number, suffix = '...'): string => {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength) + suffix;
};
