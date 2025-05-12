import React from 'react';
import type { ReactNode } from 'react';

interface ResponsiveContainerProps {
  /**
   * Conținutul containerului
   */
  children: ReactNode;
  /**
   * Clasa CSS personalizată
   */
  className?: string;
}

/**
 * Componenta ResponsiveContainer demonstrează utilizarea container queries
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`@container ${className}`}>
      <div className="@xs:p-2 @sm:p-4 @md:p-6 @lg:p-8 @xl:p-10">
        <div className="@xs:text-sm @sm:text-base @md:text-lg @lg:text-xl @xl:text-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveContainer;
