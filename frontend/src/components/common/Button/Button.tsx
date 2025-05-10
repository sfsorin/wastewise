import React from 'react';

interface ButtonProps {
  /**
   * Textul afișat pe buton
   */
  label: string;
  /**
   * Funcția apelată la click
   */
  onClick?: () => void;
  /**
   * Tipul butonului
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  /**
   * Dimensiunea butonului
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Dezactivează butonul
   */
  disabled?: boolean;
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
 * Componenta Button pentru acțiuni în interfață
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
}) => {
  // Clase de bază pentru toate variantele
  const baseClasses = 'rounded font-medium focus:outline-none transition-colors';

  // Clase pentru variante
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    text: 'bg-transparent text-blue-600 hover:bg-blue-50',
  };

  // Clase pentru dimensiuni
  const sizeClasses = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  };

  // Clase pentru starea disabled
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  // Combinarea tuturor claselor
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
