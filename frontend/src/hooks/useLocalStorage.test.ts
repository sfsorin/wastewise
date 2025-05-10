import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  const key = 'test-key';
  const initialValue = { name: 'Test', value: 42 };
  
  // Curățăm localStorage înainte de fiecare test
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });
  
  it('should use the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    
    expect(result.current[0]).toEqual(initialValue);
  });
  
  it('should update the value in localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    
    const newValue = { name: 'Updated', value: 100 };
    
    act(() => {
      result.current[1](newValue);
    });
    
    // Verificăm că state-ul s-a actualizat
    expect(result.current[0]).toEqual(newValue);
    
    // Verificăm că localStorage s-a actualizat
    const storedValue = JSON.parse(window.localStorage.getItem(key) || '');
    expect(storedValue).toEqual(newValue);
  });
  
  it('should retrieve the value from localStorage if it exists', () => {
    // Setăm o valoare în localStorage
    const existingValue = { name: 'Existing', value: 200 };
    window.localStorage.setItem(key, JSON.stringify(existingValue));
    
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    
    // Ar trebui să folosească valoarea din localStorage, nu initialValue
    expect(result.current[0]).toEqual(existingValue);
  });
  
  it('should accept a function to update the value', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    
    act(() => {
      result.current[1]((prev) => ({ ...prev, value: prev.value + 10 }));
    });
    
    // Verificăm că state-ul s-a actualizat corect
    expect(result.current[0]).toEqual({ name: 'Test', value: 52 });
    
    // Verificăm că localStorage s-a actualizat
    const storedValue = JSON.parse(window.localStorage.getItem(key) || '');
    expect(storedValue).toEqual({ name: 'Test', value: 52 });
  });
  
  it('should handle localStorage errors gracefully', () => {
    // Mock pentru a simula o eroare la setItem
    const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    
    act(() => {
      result.current[1]({ name: 'Error Test', value: 500 });
    });
    
    // State-ul ar trebui să se actualizeze chiar dacă localStorage aruncă eroare
    expect(result.current[0]).toEqual({ name: 'Error Test', value: 500 });
    
    // Ar trebui să avem un avertisment în consolă
    expect(mockConsoleWarn).toHaveBeenCalled();
    
    // Curățăm mock-urile
    mockSetItem.mockRestore();
    mockConsoleWarn.mockRestore();
  });
});
