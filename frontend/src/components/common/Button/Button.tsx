import React from 'react';

export interface ButtonProps {
  /**
   * Textul butonului
   */
  label: string;
  /**
   * Tipul butonului
   */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  /**
   * Dimensiunea butonului
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Dezactivează butonul
   */
  disabled?: boolean;
  /**
   * Funcția apelată la click
   */
  onClick?: () => void;
  /**
   * Clasa CSS personalizată
   */
  className?: string;
  /**
   * Tipul butonului HTML
   */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Componenta Button reutilizabilă care folosește clasele Tailwind CSS
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  // Folosim clasele predefinite din index.css
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'md' ? '' : `btn-${size}`;

  // Adăugăm clasa disabled dacă butonul este dezactivat
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Combinăm toate clasele
  const buttonClasses = `${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
    >
      {label}
    </button>
  );
};

export default Button;
