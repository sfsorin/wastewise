import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, formatPhoneNumber, truncateText } from './formatters';

describe('Formatter Utilities', () => {
  describe('formatCurrency', () => {
    it('should format currency with default RON', () => {
      expect(formatCurrency(1234.56)).toBe('1.234,56 RON');
      expect(formatCurrency(0)).toBe('0,00 RON');
      expect(formatCurrency(1000000)).toBe('1.000.000,00 RON');
    });

    it('should format currency with custom currency', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('1.234,56 EUR');
      expect(formatCurrency(1234.56, 'USD')).toBe('1.234,56 USD');
    });

    it('should always show 2 decimal places', () => {
      expect(formatCurrency(1234)).toBe('1.234,00 RON');
      expect(formatCurrency(1234.5)).toBe('1.234,50 RON');
    });
  });

  describe('formatDate', () => {
    it('should format date without time', () => {
      const date = new Date(2023, 0, 15); // 15 ianuarie 2023
      expect(formatDate(date)).toBe('15.01.2023');
    });

    it('should format date with time', () => {
      const date = new Date(2023, 0, 15, 14, 30); // 15 ianuarie 2023, 14:30
      expect(formatDate(date, true)).toBe('15.01.2023, 14:30');
    });

    it('should handle string dates', () => {
      expect(formatDate('2023-01-15')).toBe('15.01.2023');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format valid phone numbers', () => {
      expect(formatPhoneNumber('0722123456')).toBe('0722 123 456');
      expect(formatPhoneNumber('0722 123 456')).toBe('0722 123 456');
      expect(formatPhoneNumber('0722-123-456')).toBe('0722 123 456');
    });

    it('should return original string for invalid phone numbers', () => {
      expect(formatPhoneNumber('072212345')).toBe('072212345'); // prea scurt
      expect(formatPhoneNumber('07221234567')).toBe('07221234567'); // prea lung
      expect(formatPhoneNumber('abcdefghij')).toBe('abcdefghij'); // nu e număr
    });
  });

  describe('truncateText', () => {
    it('should truncate text that exceeds max length', () => {
      expect(truncateText('Acesta este un text lung', 10)).toBe('Acesta est...');
      expect(truncateText('Acesta este un text lung', 5)).toBe('Acest...');
    });

    it('should not truncate text that is shorter than max length', () => {
      expect(truncateText('Scurt', 10)).toBe('Scurt');
      expect(truncateText('Exact 10', 10)).toBe('Exact 10');
    });

    it('should use custom suffix when provided', () => {
      expect(truncateText('Acesta este un text lung', 10, ' (mai mult)')).toBe(
        'Acesta est (mai mult)',
      );
      expect(truncateText('Acesta este un text lung', 5, '...')).toBe('Acest...');
    });
  });
});
