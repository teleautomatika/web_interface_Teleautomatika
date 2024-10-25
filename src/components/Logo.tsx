import React from 'react';

const Logo = () => {
  return (
    <div className="w-full h-full relative">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow)">
          <path
            d="M200 50 L200 100 M180 80 L220 120 M220 80 L180 120
               M160 140 L240 140 M150 160 L170 180 M250 160 L230 180
               M140 200 L260 200 M150 240 L170 220 M250 240 L230 220
               M160 260 L240 260 M180 280 L220 320 M220 280 L180 320
               M200 300 L200 350"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="200" cy="200" r="4" fill="white"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <circle
              key={angle}
              cx={200 + Math.cos((angle * Math.PI) / 180) * 100}
              cy={200 + Math.sin((angle * Math.PI) / 180) * 100}
              r="3"
              fill="white"
            />
          ))}
        </g>
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
    </div>
  );
};

export default Logo;