import React from 'react';

const NeuronLogo = () => {
  return (
    <div className="w-full h-full relative">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="neuronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <circle 
          cx="100" 
          cy="100" 
          r="10" 
          fill="url(#neuronGradient)"
          className="animate-pulse"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const x = 100 + Math.cos((angle * Math.PI) / 180) * 80;
          const y = 100 + Math.sin((angle * Math.PI) / 180) * 80;
          
          return (
            <g key={angle}>
              <line
                x1="100"
                y1="100"
                x2={x}
                y2={y}
                stroke="url(#neuronGradient)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <circle
                cx={x}
                cy={y}
                r="3"
                fill="#60A5FA"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default NeuronLogo;