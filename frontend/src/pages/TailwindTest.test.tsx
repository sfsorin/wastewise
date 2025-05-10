import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TailwindTest from './TailwindTest';

describe('TailwindTest Component', () => {
  it('renders the component with correct title', () => {
    render(<TailwindTest />);
    expect(screen.getByText('Tailwind CSS Test')).toBeInTheDocument();
  });

  it('displays the Colors tab by default', () => {
    render(<TailwindTest />);
    expect(screen.getByText('Blue Colors')).toBeInTheDocument();
    expect(screen.getByText('Green Colors')).toBeInTheDocument();
    expect(screen.getByText('Yellow Colors')).toBeInTheDocument();
  });
});
