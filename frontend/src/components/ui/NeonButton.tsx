import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rightIcon?: React.ReactNode;
}

export default function NeonButton({ children, rightIcon, className = '', style, ...props }: NeonButtonProps) {
  return (
    <button
      {...props}
      style={style}
      className={`inline-flex items-center justify-center px-2 py-1 bg-transparent rounded ${className}`}
    >
      <span className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E8FFD0] via-[#C8FF7A] to-[#29C14A] text-black font-semibold px-6 py-3 rounded-full shadow-[0_12px_30px_rgba(56,193,78,0.18)] transform transition-all duration-200 hover:from-[#D6FFD6] hover:via-[#BFF97A] hover:to-[#2FA84B]">
        <span className="leading-none">{children}</span>
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </span>
    </button>
  );
}
