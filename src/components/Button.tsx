
import React from 'react';
import { hapticFeedback } from '../utils/haptics';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'safety';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseStyles = "text-lg font-bold py-4 px-8 rounded-full transition-all active:scale-95 shadow-lg active:shadow-inner focus:ring-4 focus:ring-cyan-500/20";
  
  const variants = {
    primary: "bg-[#00A8C5] text-white hover:bg-[#008AA3] shadow-cyan-500/20",
    secondary: "bg-white text-[#1A3B4A] border border-cyan-100 hover:bg-cyan-50",
    safety: "bg-[#FF6600] text-white hover:bg-[#E65C00] shadow-orange-500/20"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    hapticFeedback.light();
    if (onClick) onClick(e);
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
