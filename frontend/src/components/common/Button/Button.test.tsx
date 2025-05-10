import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button label="Test Button" />);
    
    const button = screen.getByText('Test Button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  it('renders with custom props', () => {
    render(
      <Button 
        label="Custom Button" 
        variant="secondary" 
        size="large" 
        type="submit"
        className="custom-class"
      />
    );
    
    const button = screen.getByText('Custom Button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('custom-class');
  });

  it('renders disabled button', () => {
    render(<Button label="Disabled Button" disabled />);
    
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Clickable Button" onClick={handleClick} />);
    
    const button = screen.getByText('Clickable Button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button label="Disabled Button" onClick={handleClick} disabled />);
    
    const button = screen.getByText('Disabled Button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
