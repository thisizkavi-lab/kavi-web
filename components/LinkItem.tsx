
import React from 'react';

interface LinkItemProps {
  label: string;
  href: string;
}

export const LinkItem: React.FC<LinkItemProps> = ({ label, href }) => {
  return (
    <div className="flex items-center gap-4 mb-2 group">
      <span className="text-gray-400">•</span>
      <a 
        href={href}
        className="inline-block px-1 transition-all duration-75 glitch-hover"
      >
        {label}
      </a>
    </div>
  );
};
