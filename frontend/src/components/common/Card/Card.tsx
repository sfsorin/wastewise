import React, { type ReactNode } from 'react';

interface CardProps {
  /**
   * Conținutul cardului
   */
  children: ReactNode;
  /**
   * Titlul cardului (opțional)
   */
  title?: string;
  /**
   * Clasa CSS personalizată
   */
  className?: string;
  /**
   * Dacă cardul are umbră
   */
  withShadow?: boolean;
  /**
   * Dacă cardul are border
   */
  withBorder?: boolean;
  /**
   * Padding-ul cardului
   */
  padding?: 'none' | 'small' | 'medium' | 'large';
}

/**
 * Componenta Card pentru afișarea conținutului într-un container stilizat
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  withShadow = true,
  withBorder = false,
  padding = 'medium',
}) => {
  // Clase pentru umbră
  const shadowClasses = withShadow ? 'shadow-md' : '';

  // Clase pentru border
  const borderClasses = withBorder ? 'border border-gray-200' : '';

  // Clase pentru padding
  const paddingClasses = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };

  // Combinarea tuturor claselor
  const cardClasses = `bg-white rounded-lg ${shadowClasses} ${borderClasses} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={cardClasses}>
      {title && (
        <div className="mb-4 pb-2 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
