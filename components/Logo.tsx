
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40, color = "currentColor" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Book Base */}
        <path
          d="M20 25C20 22.2386 22.2386 20 25 20H75C77.7614 20 80 22.2386 80 25V75C80 77.7614 77.7614 80 75 80H25C22.2386 80 20 77.7614 20 75V25Z"
          fill={color === "currentColor" ? "#F59E0B" : color} // Default amber-500
        />
        {/* Stylized 'K' (Persian 'ک') integrated with book pages */}
        <path
          d="M35 35V65M35 50L55 35M35 55L55 65M65 35V65"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Accent dot or bookmark */}
        <circle cx="70" cy="25" r="5" fill="white" />
      </svg>
      <span className="font-bold text-xl tracking-tight hidden sm:block">کتابینو</span>
    </div>
  );
};

export default Logo;
